// DATA
const API_KEY = '67149bb18cdbf8c37b40ab2088b6c8a1';
const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'Content-Type': 'application/json;charset=utf/8',
  },  
  params: {
    'api_key': API_KEY,
  }
});

function likedMoviesList() {
  const item = JSON.parse(localStorage.getItem('liked-movies'));
  let movies;

  if(item) {
    movies = item;
  } else{
    movies = {};
  }

  return movies;
};

function likeMovie(movie){

  const likedMovies =likedMoviesList(); 
  
  if(likedMovies[movie.id]) {
    likedMovies[movie.id] = undefined;
  } else {
    likedMovies[movie.id] = movie;
  }

  if(location.hash == '') {
    homePage();
  }

  localStorage.setItem('liked-movies', JSON.stringify(likedMovies));
  getLikedMovie();
};

// UTILS
const lazyLoader = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    
    if(entry.isIntersecting == true){
      const url = entry.target.getAttribute('data-img')
      entry.target.setAttribute('src', url);
    }

  });
});

const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const slider = document.querySelector('.trendingPreview-movieList')

prev.addEventListener('click', () => {
  slider.scrollLeft -= 600;
});

next.addEventListener('click', () => {
  slider.scrollLeft += 600;
});


function createMovies(movies, container, {lazyLoad = false, clean = true} = {},) {

  if(clean) {
    container.innerHTML = '';
  };

  movies.forEach(movie => {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');

    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title);
    
    movieImg.setAttribute(
      lazyLoad ? 'data-img' : 'src',
      'https://image.tmdb.org/t/p/w300' + movie.poster_path,
      );

      movieImg.addEventListener('click', () => location.hash = '#movie=' + movie.id);
      
      movieImg.addEventListener('error', () => {
        movieImg.setAttribute('src', 'https://images.wondershare.com/recoverit/article/2019/11/common-video-errors-01.jpg')
      });

      const movieBtnLike = document.createElement('button');
      movieBtnLike.classList.add('movie-btn');
      likedMoviesList()[movie.id] && movieBtnLike.classList.add('movie-btn--liked')
      movieBtnLike.addEventListener('click', (e)=> {
        e.stopPropagation();
        movieBtnLike.classList.toggle('movie-btn--liked') 
          likeMovie(movie);
      }, false);

     if(lazyLoad) {
       lazyLoader.observe(movieImg);
     }

      movieContainer.appendChild(movieImg);
      movieContainer.appendChild(movieBtnLike);
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
};

// LLAMADOS A LA API
async function getTrendingMoviesPreview() {
  const { data } = await api('trending/movie/day');
  const movies = data.results;

  createMovies(movies, trendingMoviesPreviewList, true);
};

async function getTrendingMovies(page = 1) {
  const { data } = await api('trending/movie/day', {
    params: {
      page,
    }
  });
  const movies = data.results;
  maxPage = data.total_pages;

  const pageIsNotMax = page < maxPage;

  console.log(data);

  createMovies(movies, genericSection, {
    lazyLoad: true,
    clean: page == 1,
  });

  const btnLoadMore = document.createElement('button');
  btnLoadMore.innerText = 'Ver más';  
  btnLoadMore.addEventListener('click', () => {
    btnLoadMore.style.display = 'none';
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    getTrendingMovies(page + 1);
  });
  btnLoadMore.classList.add('trendingPreview-btn');
  genericSection.appendChild(btnLoadMore);
};

async function getCategoriesPreview() {
  const { data } = await api('genre/movie/list');
  const categories = data.genres;

  createCategories(categories, categoriesPreviewList);
};

async function getMoviesByCategory(id) {
  const { data } = await api('/discover/movie', {
    params: {
      with_genres: id,
    }
  });
  const movies = data.results;
  console.log(data);

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

  const movieImgUrl = 'https://image.tmdb.org/t/p/w500/' + movie.backdrop_path;
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

};

function getLikedMovie() {
  const likedMovies = likedMoviesList();

  const moviesArray = Object.values(likedMovies);

  createMovies(moviesArray, likeMoviesListArticle, {lazyLoad: true, clean: true});
};