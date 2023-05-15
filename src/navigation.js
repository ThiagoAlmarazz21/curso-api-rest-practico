let maxPage;

searchFormBtn.addEventListener('click', () => {
  location.hash = `#search=${searchFormInput.value.trim()}`;
});

trendingBtn.addEventListener('click', () => location.hash = '#trends');

arrowBtn.addEventListener('click', () => location.hash = window.history.back());

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
  location.hash.startsWith('#trends')    ? trendsPage()       :
  location.hash.startsWith('#search=')   ? searchPage()       :
  location.hash.startsWith('#movie=')    ? movieDetailsPage() :
  location.hash.startsWith('#category=') ? categoriesPage()   :
  homePage();

  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

function homePage(id) {
  headerSection.classList.remove('header-container--long')
  arrowBtn.classList.add('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerCategoryTitle.classList.add('inactive');
  headerTitle.classList.remove('inactive');
  searchForm.classList.remove('inactive');
  footerSection.classList.remove('inactive')
  trendingPreviewSection.classList.remove('inactive');
  categoriesPreviewSection.classList.remove('inactive');
  genericSection.classList.add('inactive');
  movieDetailSection.classList.add('inactive');
  headerSection.style.background = '';
  likedMoviesSection.classList.remove('inactive')

  getTrendingMoviesPreview();
  getCategoriesPreview();
  getLikedMovie();
}

function categoriesPage() {
  // const top = window.screenTop(0, 0);

  headerSection.classList.remove('header-container--long')
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerCategoryTitle.classList.remove('inactive');
  headerTitle.classList.add('inactive');
  searchForm.classList.add('inactive');
  footerSection.classList.add('inactive');
  likedMoviesSection.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');

  // location.hash.split('=') => ['#category, 'id-name'];
  const [_, categoryData] = location.hash.split('=');
  const [categoryId, categoryName] = categoryData.split('-');

  headerCategoryTitle.innerHTML = categoryName;
  
  getMoviesByCategory(categoryId);

}

function movieDetailsPage() {

  headerSection.classList.add('header-container--long');
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.add('header-arrow--white');
  headerCategoryTitle.classList.add('inactive');
  headerTitle.classList.add('inactive');
  searchForm.classList.add('inactive');
  footerSection.classList.add('inactive');
  likedMoviesSection.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.add('inactive');
  movieDetailSection.classList.remove('inactive');

  const [_, movieId] = location.hash.split('=');
  getMovieById(movieId);
}

function searchPage() {

  headerSection.classList.remove('header-container--long')
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerCategoryTitle.classList.remove('inactive');
  headerTitle.classList.add('inactive');
  searchForm.classList.remove('inactive');
  footerSection.classList.add('inactive');
  likedMoviesSection.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');

  // ['#search', 'buscado']
  const [_, query] = location.hash.split('=');
  getMoviesBySearch(query);
}

function trendsPage() { 

  headerSection.classList.remove('header-container--long')
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerCategoryTitle.classList.remove('inactive');
  headerTitle.classList.add('inactive');
  searchForm.classList.add('inactive');
  footerSection.classList.add('inactive');
  likedMoviesSection.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');

  headerCategoryTitle.innerHTML = 'Tendencias'

  getTrendingMovies();
}

