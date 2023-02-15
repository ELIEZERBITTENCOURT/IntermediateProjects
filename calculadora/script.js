const displayInput = document.querySelector('.display-input');
const buttons = document.querySelectorAll('.buttons button');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.innerText === 'C') {
      displayInput.value = '';
    } else if (button.innerText === '=') {
      displayInput.value = eval(displayInput.value);
    } else {
      displayInput.value += button.innerText;
    }
  });
});
