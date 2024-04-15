// Вашей задачей является создание веб-слайдера для отображения изображений на веб-странице.
// Слайдер должен позволять переключаться между изображениями и отображать их в центре экрана.

// 1. Создайте интерфейс веб-страницы, который включает в себя следующие элементы:

// a. Контейнер для отображения текущего изображения.
// b. Кнопки "Предыдущее изображение" и "Следующее изображение" для переключения между изображениями.
// c. Навигационные точки (индикаторы) для быстрого переключения между изображениями.

// 2. Используйте HTML для создания элементов интерфейса.

// 3. Используйте JavaScript для обработки событий:

// a. При клике на кнопку "Предыдущее изображение" должно отображаться предыдущее изображение.
// b. При клике на кнопку "Следующее изображение" должно отображаться следующее изображение.
// c. При клике на навигационные точки, слайдер должен переключаться к соответствующему изображению.

// 4. Слайдер должен циклически переключаться между изображениями,
// то есть после последнего изображения должно отображаться первое, и наоборот.

// 5. Добавьте стилизацию для слайдера и элементов интерфейса с использованием CSS для улучшения внешнего вида.



const slidesEls = document.querySelectorAll('.slide');
let currentSlide = 0;
const previousBtn = document.getElementById('previous');
const nextBtn = document.getElementById('next');
const dotEls = document.querySelectorAll('.dot');
const controlsEl = document.querySelectorAll('.controls');

dotEls.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        goToSlide(index);
    });
});


previousBtn.addEventListener('click', () => {
    previousSlide()
});

nextBtn.addEventListener('click', () => {
    nextSlide();
});

function nextSlide() {
    goToSlide(currentSlide + 1);
}

function previousSlide() {
    goToSlide(currentSlide - 1);
}

function goToSlide(n) {
    slidesEls[currentSlide].className = 'slide';
    currentSlide = (n + slidesEls.length) % slidesEls.length;
    slidesEls[currentSlide].className = 'slide showing';
    dotEls.forEach((dot, index) => {
        if (index !== currentSlide) {
            dotEls[index].classList.remove('dot_active');
        } else dotEls[currentSlide].classList.add('dot_active');
    });
}
