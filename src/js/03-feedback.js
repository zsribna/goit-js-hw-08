import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const LOCALSTORAGE_KEY = 'feedback-form-state';

isLocalStorage();

form.addEventListener('input', throttle(onInput, 500));

function onInput() {
  const {
    elements: { email, message },
  } = form;

  localStorage.setItem(
    LOCALSTORAGE_KEY,
    JSON.stringify({ email: email.value, message: message.value })
  );
}

form.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();
  console.log(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)));
  localStorage.removeItem(LOCALSTORAGE_KEY);
  evt.currentTarget.reset();
}

function isLocalStorage() {
  if (!localStorage.getItem(LOCALSTORAGE_KEY)) {
    return;
  }
  const { email, message } = form.elements;
  email.value = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)).email;
  message.value = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)).message;
}
