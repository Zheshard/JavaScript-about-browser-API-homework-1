
const accesKey = "Seg9W775_267bEWroUzJ2dz40WwYRc8i3K1EFp7LRaY";
const photoContainer = document.querySelector('.container');

const fetchPhoto = async () => {
    try {
        const response = await fetch(`https://api.unsplash.com/photos/random?&client_id=${accesKey}`);
        // запрос подгрузки фото по айди для проверки сохранения лайка:
        // const response = await fetch(`https://api.unsplash.com/photos/eabfvYm3YNw?&client_id=${accesKey}`);
        if (!response.ok) {
            throw new Error("Ошибка при загрузке");
        }
        const photos = await response.json();
        return photos;
    } catch (error) {
        throw error;
    } finally {
        isFetching = false;
    }
}

async function run() {
    try {
        const data = await fetchPhoto();
        addPhotoInHTML(data);
    } catch (error) {
        const errorMessage = document.createElement('div');
        errorMessage.textContent = error.message;
        document.querySelector('.container').appendChild(errorMessage);
    }
}

function addPhotoInHTML(data) {
    // Проверяем, был ли этот объект фотографии лайкнут
    const likedPhotos = JSON.parse(localStorage.getItem('likedPhotos')) || [];
    let isLiked = likedPhotos.some(photo => photo.id === data.id);

    photoContainer.innerHTML =
        `<figure class="photo">
            <img src="${data.urls.full}" alt="${data.alt_description}"/>
            <figcaption class="photo__info">
                <p class="photo__likes"><svg class="photo__like ${isLiked ? 'like-on' : ''}"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg> ${data.likes + (isLiked ? 1 : 0)}</p>
                <p>Photographer: ${data.user.first_name ?? ""} ${data.user.last_name ?? ""}</p>
            </figcaption>
        </figure>`;

    const likeEl = document.querySelector('.photo__like');
    likeEl.addEventListener('click', () => {
        if (!isLiked) {
            // Добавляем информацию о лайке в локальное хранилище
            likedPhotos.push({ id: data.id });
            localStorage.setItem('likedPhotos', JSON.stringify(likedPhotos));
            likeEl.classList.add('like-on');
            likeEl.nextSibling.textContent = ` ${data.likes + 1}`;
        } else {
            // Удаляем информацию о лайке из локального хранилища
            const updatedLikedPhotos = likedPhotos.filter(photo => photo.id !== data.id);
            localStorage.setItem('likedPhotos', JSON.stringify(updatedLikedPhotos));
            likeEl.classList.remove('like-on');
            likeEl.nextSibling.textContent = ` ${data.likes}`;
        }
        isLiked = !isLiked; // Инвертируем значение isLiked для возможности отмены лайка
    });
}

run();

