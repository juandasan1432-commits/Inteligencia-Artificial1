const composer = document.querySelector('#compositor');
const input = document.querySelector('#consulta');
const historyLog = document.querySelector('#conversacion');
const statusLine = document.querySelector('#estado-consulta');
const sendButton = composer.querySelector('button[type="submit"]');
let previousAnswer;

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

function addReferences(article, answer) {
  const references = element('ul', '', 'chat__sources');
  for (const [title, url] of answer.sources ?? []) {
    if (new URL(url).protocol !== 'https:') continue;
    const link = element('a', title);
    link.href = url;
    const item = element('li');
    item.append(link);
    references.append(item);
  }
  if (answer.reference) {
    const item = element('li');
    const link = element('a', 'Explorar la biblioteca');
    link.href = 'biblioteca.html';
    item.append(link);
    references.append(item);
  }
  if (references.childElementCount) article.append(references);
}

function submitQuestion(question) {
  const answer = matchQuery(question, previousAnswer);
  if (answer.sources) previousAnswer = answer;

  const user = message('Tú', 'user');
  user.append(element('p', question));
  const response = message('DevLibrary AI · Biblioteca', 'assistant');
  if (answer.title) response.append(element('h2', answer.title));
  response.append(element('p', answer.summary));
  if (answer.code) {
    const example = element('pre', '', 'code-block');
    example.tabIndex = 0;
    example.append(element('code', answer.code));
    response.append(example);
  }
  if (answer.detail) response.append(element('p', answer.detail));
  addReferences(response, answer);

  historyLog.hidden = false;
  historyLog.append(user, response);
  const offset = response.getBoundingClientRect().top - historyLog.getBoundingClientRect().top;
  historyLog.scrollTop += offset - 8;
  statusLine.textContent = '';
  input.focus({ preventScroll: true });
  const box = composer.getBoundingClientRect();
  if (box.bottom > window.innerHeight || box.top < 0) {
    composer.scrollIntoView({ block: 'nearest' });
  }
}

composer.addEventListener('submit', event => {
  event.preventDefault();
  const question = input.value.trim();
  if (!question) {
    statusLine.textContent = 'Escribe una consulta para enviarla.';
    return;
  }
  submitQuestion(question);
  composer.reset();
});

input.addEventListener('keydown', event => {
  if (event.key === 'Enter' && !event.shiftKey && !event.isComposing && event.keyCode !== 229) {
    event.preventDefault();
    composer.requestSubmit();
  }
});

document.querySelectorAll('button[data-question]').forEach(button => {
  button.addEventListener('click', () => submitQuestion(button.dataset.question));
  button.disabled = false;
});

document.querySelector('.sidebar__new').addEventListener('click', event => {
  event.preventDefault();
  historyLog.replaceChildren();
  historyLog.hidden = true;
  previousAnswer = undefined;
  composer.reset();
  statusLine.textContent = '';
  input.focus();
});

sendButton.disabled = false;
