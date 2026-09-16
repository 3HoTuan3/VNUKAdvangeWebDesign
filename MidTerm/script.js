const MOVIES_API_URL = 'https://6a9b87470ad174e139e8b375.mockapi.io/movies';

let movies = [];
let selectedMovieId = null;

class Movie {
    constructor(id, movies_name, description, duration, releaseYear, price, image) {
        this.id = id;
        this.movies_name = movies_name;
        this.description = description;
        this.duration = Number(duration);
        this.releaseYear = Number(releaseYear);
        this.price = Number(price);
        this.image = image;
    }
}

function fetchMovies() {
    return new Promise((resolve, reject) => {
        fetch(MOVIES_API_URL)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`API trả về lỗi HTTP ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                if (!Array.isArray(data)) {
                    throw new Error('Dữ liệu API không đúng định dạng danh sách phim.');
                }
                resolve(data);
            })
            .catch(reject);
    });
}

function renderMovies(movieItems) {
    const movieList = document.getElementById('movie-grid');

    movieList.innerHTML = movieItems.map((item) => {
        const movie = new Movie(
            item.id,
            item.movies_name,
            item.description,
            item.duration,
            item.releaseYear,
            item.price,
            item.image
        );

        return `
            <article class="movie-card${String(movie.id) === String(selectedMovieId) ? ' selected' : ''}" id="movie-${movie.id}">
                <img src="${movie.image}" alt="${movie.movies_name}" class="movie-image">
                <div class="card-content">
                    <h3 class="movie-title">${movie.movies_name}</h3>
                    <div class="movie-meta">${movie.duration} phút | ${movie.releaseYear}</div>
                    <p class="movie-desc">${movie.description}</p>
                    <p class="movie-price">Giá vé: ${movie.price.toLocaleString('vi-VN')} VNĐ</p>
                    <button class="btn-xem-ngay" type="button">Xem Ngay</button>
                </div>
            </article>
        `;
    }).join('');
}

function filterMovies(searchTerm) {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();
    if (!normalizedSearchTerm) {
        return movies;
    }
    return movies.filter((movie) => movie.movies_name.toLowerCase().includes(normalizedSearchTerm));
}

function openMovieModal(movie = null) {
    const movieForm = document.getElementById('movie-form');
    movieForm.reset();
    document.getElementById('modal-title').textContent = movie ? 'Sửa phim' : 'Thêm phim';
    document.getElementById('movie-id').value = movie?.id || '';
    document.getElementById('movie-name').value = movie?.movies_name || '';
    document.getElementById('movie-image').value = movie?.image || '';
    document.getElementById('movie-description').value = movie?.description || '';
    document.getElementById('movie-duration').value = movie?.duration || '';
    document.getElementById('movie-release-year').value = movie?.releaseYear || '';
    document.getElementById('movie-price').value = movie?.price || '';
    document.getElementById('movie-modal').hidden = false;
    document.body.classList.add('modal-open');
    document.getElementById('movie-name').focus();
}

function closeMovieModal() {
    document.getElementById('movie-modal').hidden = true;
    if (document.getElementById('detail-modal').hidden) {
        document.body.classList.remove('modal-open');
    }
}

function openMovieDetails(movie) {
    const details = document.getElementById('movie-details');
    details.innerHTML = `
        <img src="${movie.image}" alt="${movie.movies_name}" class="detail-image">
        <dl>
            <div><dt>ID</dt><dd>${movie.id}</dd></div>
            <div><dt>Tên phim</dt><dd>${movie.movies_name}</dd></div>
            <div><dt>Mô tả</dt><dd>${movie.description}</dd></div>
            <div><dt>Thời lượng</dt><dd>${movie.duration} phút</dd></div>
            <div><dt>Năm phát hành</dt><dd>${movie.releaseYear}</dd></div>
            <div><dt>Giá vé</dt><dd>${Number(movie.price).toLocaleString('vi-VN')} VNĐ</dd></div>
            <div><dt>Hình ảnh</dt><dd>${movie.image}</dd></div>
        </dl>
    `;
    document.getElementById('detail-modal').hidden = false;
    document.body.classList.add('modal-open');
}

function closeMovieDetails() {
    document.getElementById('detail-modal').hidden = true;
    if (document.getElementById('movie-modal').hidden) {
        document.body.classList.remove('modal-open');
    }
}

function getMovieFormData() {
    const formData = new FormData(document.getElementById('movie-form'));

    return {
        movies_name: formData.get('movies_name'),
        description: formData.get('description'),
        duration: Number(formData.get('duration')),
        releaseYear: Number(formData.get('releaseYear')),
        price: Number(formData.get('price')),
        image: formData.get('image')
    };
}

function saveMovie(movieId) {
    const method = movieId ? 'PUT' : 'POST';
    const endpoint = movieId ? `${MOVIES_API_URL}/${movieId}` : MOVIES_API_URL;

    return fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(getMovieFormData())
    }).then((response) => {
        if (!response.ok) {
            throw new Error('Không thể lưu phim.');
        }

        return fetchMovies();
    });
}

function deleteMovie(movieId) {
    if (!movieId) {
        alert('Vui lòng chọn một phim trước khi xóa.');
        return Promise.resolve();
    }

    if (!confirm('Bạn có chắc muốn xóa phim này không?')) {
        return Promise.resolve();
    }

    return fetch(`${MOVIES_API_URL}/${movieId}`, { method: 'DELETE' })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Không thể xóa phim.');
            }

            selectedMovieId = null;
            return fetchMovies();
        });
}

document.getElementById('movie-grid').addEventListener('click', (event) => {
    const selectedText = window.getSelection()?.toString().trim();
    if (selectedText) return;

    const card = event.target.closest('.movie-card');
    if (!card) return;

    if (event.target.closest('.btn-xem-ngay')) {
        const movie = movies.find((item) => String(item.id) === card.id.replace('movie-', ''));
        if (movie) openMovieDetails(movie);
        return;
    }

    selectedMovieId = card.id.replace('movie-', '');
    renderMovies(movies);
});

document.getElementById('movie-search').addEventListener('input', (event) => {
    renderMovies(filterMovies(event.target.value));
});

document.querySelector('.toolbar').addEventListener('click', (event) => {
    const action = event.target.dataset.action;

    if (action === 'add') {
        openMovieModal();
    }

    if (action === 'update') {
        const movie = movies.find((item) => String(item.id) === String(selectedMovieId));
        if (!movie) {
            alert('Vui lòng chọn một phim trước khi sửa.');
            return;
        }

        openMovieModal(movie);
    }

    if (action === 'delete') {
        deleteMovie(selectedMovieId)
            .then((data) => {
                movies = data;
                renderMovies(movies);
            })
            .catch((error) => {
                console.error('Lỗi xóa phim:', error);
                alert('Không thể xóa phim. Vui lòng thử lại.');
            });
    }
});

document.getElementById('close-modal').addEventListener('click', closeMovieModal);
document.querySelector('[data-action="cancel"]').addEventListener('click', closeMovieModal);
document.getElementById('close-detail-modal').addEventListener('click', closeMovieDetails);

document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;

    if (!document.getElementById('detail-modal').hidden) {
        closeMovieDetails();
    } else if (!document.getElementById('movie-modal').hidden) {
        closeMovieModal();
    }
});

document.getElementById('movie-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const movieId = document.getElementById('movie-id').value;

    saveMovie(movieId)
        .then((data) => {
            movies = data;
            selectedMovieId = movieId || null;
            renderMovies(movies);
            closeMovieModal();
        })
        .catch((error) => {
            console.error('Lỗi lưu phim:', error);
            alert('Không thể lưu phim. Vui lòng thử lại.');
        });
});

fetchMovies()
    .then((data) => {
        movies = data;
        renderMovies(movies);
    })
    .catch((error) => {
        console.error('Lỗi khi lấy dữ liệu:', error);
        document.getElementById('movie-grid').innerHTML = '<p>Không thể tải dữ liệu phim.</p>';
    });
