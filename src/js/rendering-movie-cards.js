import { getTrending } from './API';
import { searchMovieName } from './API';
import { createGalleryPage } from './create-gallery-page';
import { createPagination } from './pagination';
import colors from './colors';
import refs from './ref';
import { Notify, Loading } from 'notiflix';

Loading.init({
  svgColor: colors.colorAccentSec,
});

Notify.init({
  position: "center-top",
});

const galleryMovie = document.querySelector('.gallery-js');
// showHideLoader(refs.loader);
Loading.standard();
getTrending().then(data => {
  // showHideLoader(refs.loader);
  Loading.remove();
  galleryMovie.insertAdjacentHTML('beforeend', createGalleryPage(data.results));

  const pagination = createPagination(data.total_results, data.total_pages);
  pagination.on('beforeMove', ({ page }) => {
    refs.gallery.innerHTML = '';
    getTrending(page).then(data => {
      refs.gallery.innerHTML = createGalleryPage(data.results);
    });
  });
});

const input = document.querySelector('.search__input');
const btnSearch = document.querySelector('.bx-search');

btnSearch.addEventListener('click', onSearchBtn);
input.addEventListener('keydown', onEnterKeyPress);

function onEnterKeyPress(event) {
  const ENTER_KEY_CODE = 'Enter';
  if (event.code === ENTER_KEY_CODE) {
    onSearchBtn(event);
  }
}

function onSearchBtn(e) {
  e.preventDefault();
  let movie = input.value.trim();

  Loading.standard();
  searchMovieName(movie, 1) // Pasa el parámetro `movie` y establece `page` como 1
    .then(data => {
      Loading.remove();
      if (!data.total_results) {
        setTimeout(() => {
          Notify.failure('Search result not successful');
        }, 300);
        return;
      } else {
        // console.log(data.total_results);
        Notify.info(`Hurrah! We found ${data.total_results} movies! 🎉`);
      }
      console.log(data.results);
      galleryMovie.innerHTML = '';
      galleryMovie.insertAdjacentHTML(
        'beforeend',
        createGalleryPage(data.results)
      );
      const pagination = createPagination(data.total_results, data.total_pages);

      pagination.on('beforeMove', ({ page }) => {
        refs.gallery.innerHTML = '';
        searchMovieName(movie, page).then(data => {
          refs.gallery.innerHTML = createGalleryPage(data.results);
        });
      });
    })
    .catch(error => console.log(error));
}
