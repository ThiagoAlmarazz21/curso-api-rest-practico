const API_KEY = '67149bb18cdbf8c37b40ab2088b6c8a1';
const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'Content-Type': 'application/json;charset=utf/8',
  },  
  params: {
    'api_key': API_KEY,
    // 'language': 'es',
  }
});

// UTILS

function createMovies(movies, container) {
  container.innerHTML = '';

  movies.forEach(movie => {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');
    movieContainer.addEventListener('click', () => location.hash = '#movie=' + movie.id)
    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title);
    movieImg.setAttribute(
      'src',
     'https://image.tmdb.org/t/p/w300' + movie.poster_path,
     );

      movieContainer.appendChild(movieImg);
      container.appendChild(movieContainer);
  });
};

function createCategories(categories, container) {
  container.innerHTML = '';

  categories.forEach(category => {

    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');
    const categoryTitle = document.createElement('h3');
    categoryTitle.classList.add('category-title');
    categoryTitle.setAttribute('id', category.id);
    categoryTitle.addEventListener('click', () => {
      location.hash = `#category=${category.id}-${category.name}`;
    })
    const categoryTitleText = document.createTextNode(category.name)

    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);
    container.appendChild(categoryContainer);
  });
}

// LLAMADOS A LA API
async function getTrendingMoviesPreview() {
  const { data } = await api('trending/movie/day');
  const movies = data.results;

  createMovies(movies, trendingMoviesPreviewList);
};

async function getTrendingMovies() {
  const { data } = await api('trending/movie/day');
  const movies = data.results;

  createMovies(movies, genericSection);
};

async function getRecomendedMovies() {
  const { data } = await api('/movie/top_rated?');
  const recomendedMovies = data.results;
  console.log('data', data);

  createMovies(recomendedMovies, recomendedMoviesSection);
};

async function getCategoriesPreview() {
  const { data } = await api('genre/movie/list');
  const categories = data.genres;

  createCategories(categories, categoriesPreviewList)
};

async function getMoviesByCategory(id) {
  const { data } = await api('/discover/movie', {
    params: {
      with_genres: id,
    }
  });
  const movies = data.results;

  createMovies(movies, genericSection);
};

async function getMoviesBySearch(query) {
  const { data } = await api('/search/movie', {
    params: {
      query,
    },
  });
  const movies = data.results;

  headerCategoryTitle.innerHTML = 'Resultados para: ' + query;

  createMovies(movies, genericSection);
};

async function getMovieById(id) {
  const { data: movie } = await api(`movie/${id}`);

  const movieImgUrl = 'https://image.tmdb.org/t/p/w500/' + movie.poster_path;
  console.log(movieImgUrl);
  headerSection.style.background = `url(${movieImgUrl})`;

  movieDetailTitle.textContent = movie.title;
  movieDetailDescription.textContent = movie.overview;
  movieDetailScore.textContent = movie.vote_average.toFixed(1);

  createCategories(movie.genres, movieDetailCategories);

  getRelatedMoviesById(id);
};

async function getRelatedMoviesById(id) {
  const { data } = await api(`/movie/${id}/similar`);
  const relatedMovies = data.results;

  createMovies(relatedMovies, relatedMovieContainer);

}
