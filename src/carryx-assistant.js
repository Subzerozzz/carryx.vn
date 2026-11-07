import { createCarryResponder } from './carryx-answers.js';

const dialog = document.querySelector('#carry-chat');
const launcher = document.querySelector('#carry-launcher');
const messages = document.querySelector('#carry-messages');
const input = document.querySelector('#carry-chat-input');
const respond = createCarryResponder();

function addMessage(text, type, author) {
  const message = document.createElement('p');
  message.className = `carry-message ${type}`;
  const speaker = document.createElement('span');
  speaker.className = 'carry-speaker';
  speaker.textContent = `${author}: `;
  message.append(speaker, text);
  messages.append(message);
}

function send(message) {
  const text = message.trim();
  if (!text) return;
  addMessage(text, 'is-question', 'Bạn');
  addMessage(respond(text), 'is-reply', 'Mầm');
  messages.scrollTop = messages.scrollHeight;
}

launcher.addEventListener('click', () => {
  dialog.showModal();
  document.querySelector('#carry-chat-close').focus();
});
document.querySelector('#carry-chat-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => launcher.focus());
dialog.addEventListener('click', (event) => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
document.querySelector('#carry-chat-form').addEventListener('submit', (event) => {
  event.preventDefault();
  send(input.value);
  input.value = '';
  input.focus();
});
document.querySelectorAll('.carry-prompts button').forEach((button) => {
  button.addEventListener('click', () => send(button.textContent));
});
