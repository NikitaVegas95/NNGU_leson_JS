// Получаем элементы
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const captionText = document.getElementById('caption');
const thumbnails = document.querySelectorAll('.gallery img');

// Открытие модального окна
thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
        modal.style.display = 'block';
        modalImg.src = thumb.dataset.full;
        captionText.innerHTML = thumb.alt;
    });
});

// Закрытие модального окна
document.querySelector('.close').addEventListener('click', () => {
    modal.style.display = 'none';
});

// Закрытие при клике вне изображения
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});