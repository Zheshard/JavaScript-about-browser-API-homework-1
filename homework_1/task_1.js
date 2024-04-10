
// Вы разрабатываете веб-страницу для отображения расписания занятий в спортивном клубе.
// Каждое занятие имеет название, время проведения,
// максимальное количество участников и текущее количество записанных участников.

// 1. Создайте веб-страницу с заголовком "Расписание занятий" и областью для отображения занятий.

// 2. Загрузите информацию о занятиях из предоставленных JSON-данных.

//     Каждое занятие должно отображаться на странице с указанием:

//     - названия
//     - времени проведения
//     - максимального количества участников
//     - текущего количества записанных участников.

// 3. Пользователь может нажать на кнопку "Записаться" для записи на занятие.
// Если максимальное количество участников уже достигнуто, кнопка "Записаться" становится неактивной.

// 4. После успешной записи пользователя на занятие,
// обновите количество записанных участников и состояние кнопки "Записаться".

// 5. Запись пользователя на занятие можно отменить путем нажатия на кнопку "Отменить запись".
// После отмены записи, обновите количество записанных участников и состояние кнопки.

// 6. Все изменения (запись, отмена записи) должны сохраняться и отображаться в реальном времени на странице.

// 7. При разработке используйте Bootstrap для стилизации элементов.

const initialJSON = '[{"id":1,"title":"Фитнес","time":"14:00","maxNumOfAthletes":10,"currentNumOfAthletes":9},{"id":2,"title":"Пилатес","time":"16:00","maxNumOfAthletes":7,"currentNumOfAthletes":5},{"id":3,"title":"Кроссфит","time":"18:00","maxNumOfAthletes":10,"currentNumOfAthletes":7}]';

let sportsActivities = JSON.parse(initialJSON);
const schedule = document.querySelector('.schedule');

function saveToLocalStorage() {
    localStorage.setItem('sportsActivities', JSON.stringify(sportsActivities));
}

function loadFromLocalStorage() {
    const storedData = localStorage.getItem('sportsActivities');
    if (storedData) {
        sportsActivities = JSON.parse(storedData);
    }
}

loadFromLocalStorage();

function renderSchedule() {
    schedule.innerHTML = '';
    sportsActivities.forEach(event => {
        const sportsActivity = document.createElement('li');
        sportsActivity.innerHTML = `
            <h3>${event.title}</h3>
            <p class="time">Время проведения: ${event.time}</p>
            <p class="currentNum">Записано: ${event.currentNumOfAthletes} участников</p>
            <p class="maxNum">Максимальное число участников: ${event.maxNumOfAthletes}</p>
            <button onclick="register(${event.id})" ${event.currentNumOfAthletes >= event.maxNumOfAthletes
                ? 'disabled' : ''}>Записаться</button>
            <button onclick="cancelRegistration(${event.id})">Отменить запись</button>
        `;
        schedule.appendChild(sportsActivity);
    });
}

function register(eventId) {
    const event = sportsActivities.find(event => event.id === eventId);

    if (event.currentNumOfAthletes < event.maxNumOfAthletes) {
        event.currentNumOfAthletes++;
        saveToLocalStorage();
        renderSchedule();
    }
}

function cancelRegistration(eventId) {
    const event = sportsActivities.find(event => event.id === eventId);

    if (event.currentNumOfAthletes > 0) {
        event.currentNumOfAthletes--;
        saveToLocalStorage();
        renderSchedule();
    }
}

renderSchedule();