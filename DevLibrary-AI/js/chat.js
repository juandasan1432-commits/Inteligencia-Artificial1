const composer = document.querySelector('#compositor');
const input = document.querySelector('#consulta');
const historyLog = document.querySelector('#conversacion');
const statusLine = document.querySelector('#estado-consulta');
const connectionNotice = document.querySelector('#estado-conexion');
const sendButton = composer.querySelector('button[type="submit"]');
const suggestions = [...document.querySelectorAll('button[data-question]')];
const thinkingDelay = 500;
let previousAnswer;
let pendingTimer;

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

function completeQuestion(question, pending) {
  pendingTimer = undefined;
  let response;
  try {
    const answer = matchQuery(question, previousAnswer);
    response = renderAnswer(answer);
    if (answer.sources) previousAnswer = answer;
  } catch {
    response = message('DevLibrary AI · Biblioteca', 'assistant');
    const feedback = addFeedback(response, 'Error al procesar la consulta', 'Ocurrió un problema al buscar la respuesta.', 'error');
    const retry = element('button', 'Volver a intentar', 'chat__retry');
    retry.type = 'button';
    retry.addEventListener('click', () => submitQuestion(question));
    feedback.append(retry);
  }
  pending.replaceWith(response);
  showInHistory(response);
  setThinking(false);
}

function submitQuestion(question) {
  if (pendingTimer !== undefined) return;
  const user = message('Tú', 'user');
  user.append(element('p', question));
  const pending = element('div', '', 'status-box status-box--loading chat__pending');
  pending.append(element('strong', 'Pensando…'), element('p', 'Buscando una respuesta en la biblioteca.'));
  historyLog.hidden = false;
  historyLog.append(user, pending);
  showInHistory(user);
  clearValidation();
  input.focus({ preventScroll: true });
  setThinking(true);
  pendingTimer = window.setTimeout(() => completeQuestion(question, pending), thinkingDelay);
  const box = composer.getBoundingClientRect();
  if (box.bottom > window.innerHeight || box.top < 0) {
    composer.scrollIntoView({ block: 'nearest' });
  }
}

composer.addEventListener('submit', event => {
  event.preventDefault();
  if (pendingTimer !== undefined) return;
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
  window.clearTimeout(pendingTimer);
  pendingTimer = undefined;
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
    : 'Sin conexión a internet. Puedes seguir consultando las fichas cargadas. Los enlaces externos requieren conexión.';
}

window.addEventListener('online', updateConnection);
window.addEventListener('offline', updateConnection);
updateConnection();
setThinking(false);
