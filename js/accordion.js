document.querySelectorAll('.accordion').forEach((el) => {
    el.addEventListener('click', () => {
        let content = el.nextElementSibling;
        // Находим SVG внутри текущего аккордеона
        let svg = el.querySelector('#svg');

        console.log(content);

        if (content.style.maxHeight) {
            document.querySelectorAll('.content-question').forEach((el) => el.style.maxHeight = null);
            if (svg) svg.classList.remove('svg');
        } else {
            document.querySelectorAll('.content-question').forEach((el) => el.style.maxHeight = null);
            // Удаляем класс у всех SVG
            document.querySelectorAll('#svg').forEach((s) => s.classList.remove('svg'));
            content.style.maxHeight = content.scrollHeight + 'px';
            if (svg) svg.classList.add('svg');
        }
    })
});