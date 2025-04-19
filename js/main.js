// Получаем необходимые элементы DOM
const cardsWrapper = document.getElementById('cards'); // Контейнер для карточек товаров
const cartModal = document.getElementById('cartModal'); // Модальное окно корзины
const cartClose = document.querySelector('.cart-close'); // Кнопка закрытия корзины
const cartItems = document.getElementById('cartItems'); // Контейнер для товаров в корзине
const cartTotalPrice = document.getElementById('cartTotalPrice'); // Элемент с общей суммой
const basketBtn = document.querySelector('.basket'); // Кнопка корзины в шапке
const clearCartBtn = document.getElementById('clearCart'); // Кнопка очистки корзины

// Создаем счетчик товаров для значка корзины
const cartCounter = document.createElement('div');
cartCounter.className = 'cart-count';
cartCounter.textContent = '0';
basketBtn.appendChild(cartCounter);

// Функция форматирования цены (добавляет пробелы для читаемости)
const refactoredPrice = (price) => {
    const priceStr = price.toString()

    if (priceStr.length === 3) return priceStr // Если цена трехзначная, возвращаем как есть
    if (priceStr.length === 4) {
        return priceStr[0] + " " + priceStr.slice(1); // Для 4-значной цены добавляем пробел после первой цифры
    }
    if (priceStr.length === 5) {
        return priceStr.slice(0, 2) + " " + priceStr.slice(2) // Для 5-значной цены добавляем пробел после второй цифры
    }
}

// Функция обновления количества товара
const updateItemQuantity = (index, change) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Получаем текущую корзину из localStorage
    cart[index].quantity += change; // Изменяем количество товара на указанное значение
    
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1); // Если количество стало 0 или меньше, удаляем товар
    }
    
    localStorage.setItem('cart', JSON.stringify(cart)); // Сохраняем обновленную корзину
    updateCartDisplay(); // Обновляем отображение корзины
}

// Функция удаления товара из корзины
const removeFromCart = (index) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Удаляем товар по индексу
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Функция очистки корзины
const clearCart = () => {
    localStorage.setItem('cart', JSON.stringify([])); // Записываем пустой массив в localStorage
    updateCartDisplay();
}

// Функция обновления отображения корзины
const updateCartDisplay = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Обновляем счетчик общего количества товаров
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCounter.textContent = totalQuantity;
    
    // Формируем HTML для каждого товара в корзине
    cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <img src="${item.img}" alt="${item.name}">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">${refactoredPrice(item.price * item.quantity)} ₽</div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateItemQuantity(${index}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateItemQuantity(${index}, 1)">+</button>
                </div>
            </div>
            <button class="delete-item" onclick="removeFromCart(${index})">&times;</button>
        </div>
    `).join('');
    
    // Обновляем общую сумму корзины
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalPrice.textContent = `${refactoredPrice(total)} ₽`;
}

// Функция генерации карточек товаров
const generateCards = (cards) => {
    return cards.map((card, index) => {
        return `
            <div class="section-card recently-bought1">
                <img src='${card.img}' alt="Кросс-боди VERA">
                <h5 class="title-recently-bought">${card.name}</h5>
                <span>${refactoredPrice(card.price)} ₽</span>
                <button id="card-btn" data-id="${card.id}">BUY ${index}</button>
            </div>
        `
    })
}

// Отображаем карточки товаров на странице
cardsWrapper.innerHTML = generateCards(cards).join('')

// Получаем все кнопки "купить"
const cardBtn = document.querySelectorAll('#card-btn');

// Добавляем обработчики для каждой кнопки
cardBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const cardId = e.target.dataset.id; // Получаем ID товара из data-атрибута
        const selectedCard = cards.find(card => card.id.toString() === cardId); // Находим товар по ID
        
        // Получаем текущую корзину из localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Проверяем, есть ли уже такой товар в корзине
        const existingItemIndex = cart.findIndex(item => item.id === selectedCard.id);
        
        if (existingItemIndex !== -1) {
            // Если товар уже есть, увеличиваем его количество
            cart[existingItemIndex].quantity += 1;
        } else {
            // Если товара нет, добавляем его с количеством 1
            selectedCard.quantity = 1;
            cart.push(selectedCard);
        }
        
        // Сохраняем обновленную корзину
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        
        // Показываем уведомление пользователю
        alert('Товар добавлен в корзину!');
    })
})

// Открытие модального окна корзины при клике на значок корзины
basketBtn.addEventListener('click', () => {
    cartModal.style.display = 'block';
    updateCartDisplay();
});

// Закрытие модального окна при клике на крестик
cartClose.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

// Закрытие модального окна при клике вне его области
window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// Обработчик кнопки очистки корзины
clearCartBtn.addEventListener('click', clearCart);

// Инициализация отображения корзины при загрузке страницы
updateCartDisplay();