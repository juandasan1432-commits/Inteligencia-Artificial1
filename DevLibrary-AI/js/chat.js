const composer = document.querySelector('#compositor');
const input = document.querySelector('#consulta');
const historyLog = document.querySelector('#conversacion');
const statusLine = document.querySelector('#estado-consulta');
const connectionNotice = document.querySelector('#estado-conexion');
const sendButton = composer.querySelector('button[type="submit"]');
const suggestions = [...document.querySelectorAll('button[data-question]')];
const thinkingDelay = 5_000;
const connectionTimeout = 4_000;
const offlineError = {
  title: 'Sin conexión a internet',
  code: 'ERR_INTERNET_DISCONNECTED',
  summary: 'El navegador detectó que el dispositivo está sin internet. Tu consulta quedó en el chat y no se recibió una respuesta HTTP.',
  help: 'Comprueba que el Wi-Fi o los datos móviles estén activos. Cuando recuperes la conexión, pulsa «Volver a intentar».',
};
let previousAnswer;
let activeRequest;

function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text) node.textContent = text;
  if (className) node.className = className;
  return node;
}

function message(author, style) {
  const article = element('article', '', `chat__message chat__message--${style}`);
  article.append(element('small', author));
  return article;
}

function addReferences(article, sources = []) {
  const references = element('ul', '', 'chat__sources');
  for (const [title, url] of sources) {
    if (new URL(url).protocol !== 'https:') continue;
    const link = element('a', title);
    link.href = url;
    const item = element('li');
    item.append(link);
    references.append(item);
  }
  if (references.childElementCount) article.append(references);
}

function addFeedback(response, title, summary, style) {
  const feedback = element('div', '', `status-box status-box--${style}`);
  feedback.append(element('h2', title), element('p', summary));
  response.append(feedback);
  return feedback;
}

function renderAnswer(answer) {
  const response = message('DevLibrary AI · Biblioteca', 'assistant');
  if (answer.kind === 'unanswered') {
    const feedback = addFeedback(response, 'Sin respuesta', answer.summary, 'error');
    const link = element('a', 'Explorar la biblioteca');
    link.href = 'biblioteca.html';
    feedback.append(link);
    return response;
  }
  if (answer.kind === 'clarify') {
    addFeedback(response, 'Aclara tu pregunta', answer.summary, 'neutral');
    addReferences(response, answer.sources);
    return response;
  }
  if (answer.title) response.append(element('h2', answer.title));
  response.append(element('p', answer.summary));
  if (answer.code) {
    const example = element('pre', '', 'code-block');
    example.tabIndex = 0;
    example.append(element('code', answer.code));
    response.append(example);
  }
  if (answer.detail) response.append(element('p', answer.detail));
  addReferences(response, answer.sources);
  return response;
}

function showInHistory(node) {
  const offset = node.getBoundingClientRect().top - historyLog.getBoundingClientRect().top;
  historyLog.scrollTop += offset - 8;
}

function setThinking(thinking) {
  for (const button of [sendButton, ...suggestions, ...historyLog.querySelectorAll('.chat__retry')]) {
    button.disabled = thinking;
  }
}

function clearValidation() {
  statusLine.textContent = '';
  input.removeAttribute('aria-invalid');
}

function renderError(question, error) {
  const response = message('DevLibrary AI · Biblioteca', 'assistant');
  const feedback = addFeedback(response, error.title, error.summary, 'error');
  const detail = element('p');
  detail.append('Código de error ', element('code', error.code));
  if (error.http) detail.append(` · HTTP ${error.http}`);
  feedback.append(detail, element('p', error.help));
  const retry = element('button', 'Volver a intentar', 'chat__retry');
  retry.type = 'button';
  retry.addEventListener('click', () => submitQuestion(question));
  feedback.append(retry);
  return response;
}

async function checkConnection(controller) {
  if (!navigator.onLine) return offlineError;
  // Una copia abierta desde el disco solo dispone del estado de red del navegador.
  if (location.protocol === 'file:') return null;

  const timeout = window.setTimeout(() => controller.abort(), connectionTimeout);
  try {
    const response = await fetch('js/chat.js', {
      method: 'HEAD',
      cache: 'no-store',
      credentials: 'omit',
      redirect: 'error',
      signal: controller.signal,
    });
    if (response.ok) return null;
    return {
      title: 'Error de conexión con el sitio',
      code: 'ERR_HTTP_RESPONSE',
      http: response.status,
      summary: 'El sitio respondió con un estado HTTP de error al comprobar la conexión.',
      help: 'Espera unos instantes y vuelve a intentar la consulta.',
    };
  } catch {
    if (!navigator.onLine) return offlineError;
    return controller.signal.aborted ? {
      title: 'Se agotó el tiempo de conexión',
      code: 'ERR_CONNECTION_TIMEOUT',
      summary: 'El sitio no respondió en cuatro segundos. No se completó tu consulta.',
      help: 'Comprueba la conexión y vuelve a intentar la consulta.',
    } : {
      title: 'No se pudo conectar con el sitio',
      code: 'ERR_NETWORK_UNREACHABLE',
      summary: 'El navegador no recibió una respuesta HTTP. No se completó tu consulta.',
      help: 'Comprueba que puedes abrir otras páginas y vuelve a intentar la consulta.',
    };
  } finally {
    window.clearTimeout(timeout);
  }
}

function stopRequest() {
  if (!activeRequest) return;
  const request = activeRequest;
  activeRequest = undefined;
  window.clearTimeout(request.timer);
  request.controller.abort();
}

function finishRequest(request, response) {
  stopRequest();
  request.pending.replaceWith(response);
  showInHistory(response);
  setThinking(false);
}

async function completeQuestion(request) {
  const connectionError = await checkConnection(request.controller);
  if (request !== activeRequest) return;
  const { question } = request;
  const error = navigator.onLine ? connectionError : offlineError;
  if (error) {
    finishRequest(request, renderError(question, error));
    return;
  }
  let response;
  try {
    const answer = matchQuery(question, previousAnswer);
    response = renderAnswer(answer);
    if (answer.topics) previousAnswer = answer;
  } catch {
    response = renderError(question, {
      title: 'Error al procesar la consulta',
      code: 'ERR_CHAT_SEARCH',
      summary: 'Ocurrió un problema al buscar la respuesta.',
      help: 'Vuelve a intentar la consulta.',
    });
  }
  finishRequest(request, response);
}

function submitQuestion(question) {
  if (activeRequest) return;
  const user = message('Tú', 'user');
  user.append(element('p', question));
  historyLog.hidden = false;
  if (navigator.onLine) {
    const pending = element('div', '', 'status-box status-box--loading chat__pending');
    pending.append(element('strong', 'Pensando…'), element('p', 'Buscando una respuesta en la biblioteca.'));
    historyLog.append(user, pending);
    showInHistory(pending);
    const request = { question, pending, controller: new AbortController() };
    activeRequest = request;
    request.timer = window.setTimeout(() => completeQuestion(request), thinkingDelay);
    setThinking(true);
  } else {
    const response = renderError(question, offlineError);
    historyLog.append(user, response);
    showInHistory(response);
  }
  clearValidation();
  input.focus({ preventScroll: true });
  const box = composer.getBoundingClientRect();
  if (box.bottom > window.innerHeight || box.top < 0) {
    composer.scrollIntoView({ block: 'nearest' });
  }
}

composer.addEventListener('submit', event => {
  event.preventDefault();
  if (activeRequest) return;
  const question = input.value.trim();
  if (!question || question.length > input.maxLength) {
    statusLine.textContent = question
      ? `Escribe una consulta de hasta ${input.maxLength} caracteres.`
      : 'Escribe una consulta para enviarla.';
    input.setAttribute('aria-invalid', 'true');
    input.focus();
    return;
  }
  submitQuestion(question);
  composer.reset();
});

input.addEventListener('input', clearValidation);
input.addEventListener('keydown', event => {
  if (event.key === 'Enter' && !event.shiftKey && !event.isComposing && event.keyCode !== 229) {
    event.preventDefault();
    composer.requestSubmit();
  }
});

suggestions.forEach(button => {
  button.addEventListener('click', () => submitQuestion(button.dataset.question));
});

document.querySelector('.sidebar__new').addEventListener('click', event => {
  event.preventDefault();
  stopRequest();
  historyLog.replaceChildren();
  historyLog.hidden = true;
  previousAnswer = undefined;
  composer.reset();
  clearValidation();
  setThinking(false);
  input.focus();
});

function updateConnection() {
  connectionNotice.textContent = navigator.onLine
    ? ''
    : 'Sin conexión a internet. Restablece la conexión para que el chat pueda responder.';
  if (!navigator.onLine && activeRequest) {
    finishRequest(activeRequest, renderError(activeRequest.question, offlineError));
  }
}

window.addEventListener('online', updateConnection);
window.addEventListener('offline', updateConnection);
updateConnection();
setThinking(false);
