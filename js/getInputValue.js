const emailInput = document.getElementById('emailInput');
const button = document.getElementById('alertButton');

let inputValue = '';

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]{3,}@[^\s@]{2,}\.[^\s@]{2,}$/;
    return emailRegex.test(email);
}

emailInput.addEventListener('input', (event) => {
    inputValue = event.target.value;
})

button.addEventListener('click', () => {
    if (!inputValue) return alert('Вы ничего не ввели')
    if (!validateEmail(inputValue)) return alert('Введите валидный email')
    alert(`Спасибо за подписку! 🎉 ${inputValue}`);
});

