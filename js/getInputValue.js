const emailInput = document.getElementById('emailInput');
const button = document.getElementById('alertButton');

let inputValue = '';

emailInput.addEventListener('input', (event) => {
    inputValue = event.target.value;
})

button.addEventListener('click', () => {
    if (!inputValue) return alert('Вы ничего не ввели')
    alert(`Спасибо за подписку! 🎉 ${inputValue}`);
});

