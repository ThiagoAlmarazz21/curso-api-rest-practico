window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
  console.log({ location });

  location.hash.startsWith('#trends')    ? trendsPage()       :
  location.hash.startsWith('#search=')   ? searchPage()       :
  location.hash.startsWith('#movie=')    ? movieDetailsPage() :
  location.hash.startsWith('#category=') ? categoriesPage()   :
  homePage()
};

function homePage() {
  getTrendingMoviesPreview();
  getCategoriesPreview();
  console.log('HOME!!');
}

function categoriesPage() {
  console.log('CATEGORY!!');
}

function movieDetailsPage() {
  console.log('MOVIES!!');
}

function searchPage() {
  console.log('SEARCH!!');
}

function trendsPage() {
  console.log('TRENDS!!');
}

