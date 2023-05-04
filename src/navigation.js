searchFormBtn.addEventListener('click', () => location.hash = '#search=');
trendingBtn.addEventListener('click', () => location.hash = '#trends');
arrowBtn.addEventListener('click', () => location.hash = '#home');

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
  console.log({ location });

  location.hash.startsWith('#trends')    ? trendsPage()       :
  location.hash.startsWith('#search=')   ? searchPage()       :
  location.hash.startsWith('#movie=')    ? movieDetailsPage() :
  location.hash.startsWith('#category=') ? categoriesPage()   :
  homePage();
};

function homePage() {
  console.log('HOME!!');

  headerSection.classList.remove('header-container--long')
  headerSection.style.background = '';
  arrowBtn.classList.add('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerCategoryTitle.classList.add('inactive');
  headerTitle.classList.remove('inactive');
  searchForm.classList.remove('inactive');
  footerSection.classList.remove('inactive');


  trendingPreviewSection.classList.remove('inactive');
  categoriesPreviewSection.classList.remove('inactive');
  genericSection.classList.add('inactive');
  movieDetailSection.classList.add('inactive');


  getTrendingMoviesPreview();
  getCategoriesPreview();
}

function categoriesPage() {
  console.log('CATEGORY!!');

  headerSection.classList.remove('header-container--long')
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerCategoryTitle.classList.remove('inactive');
  headerTitle.classList.add('inactive');
  searchForm.classList.add('inactive');
  footerSection.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');

  getMoviesByCategory()

}

function movieDetailsPage() {

  headerSection.classList.add('header-container--long')
  // headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.add('header-arrow--white');
  headerCategoryTitle.classList.add('inactive');
  headerTitle.classList.add('inactive');
  searchForm.classList.add('inactive');
  footerSection.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.add('inactive');
  movieDetailSection.classList.remove('inactive');

  console.log('MOVIES!!');
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

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');

  console.log('SEARCH!!');
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

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');

  console.log('TRENDS!!');
}

