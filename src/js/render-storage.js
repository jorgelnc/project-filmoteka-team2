import { createLibraryMarkup } from './create-library-markup';
import refs from './ref';
import { watched, queue, getLibStateLocalStorage, setLibStateLocalStorage} from './set-get-local-storage';
import { getArrayofMovies } from './api';
import Notiflix from 'notiflix';
import { notiflixSetup } from './notiflix-setup';
import colors from './colors';

const watchedRef = document.querySelector('[data-id="watched-btn"]');
const queueRef = document.querySelector('[data-id="queue-btn"]');

watchedRef.addEventListener('click', showWatched);
queueRef.addEventListener('click', showQueue);

refs.libraryForEmptyStyle.style.paddingLeft = '105px';

notiflixSetup();
Notiflix.Loading.init({
  svgColor: colors.colorAccentSec,
});

function showWatched() {
  setLibStateLocalStorage('watched');
  refs.libraryForEmptyStyle.style.paddingLeft = '105px';
  if (!watchedRef.classList.contains('')) {
    watchedRef.classList.add('search__button__active');
    watchedRef.disabled = true;
    queueRef.classList.remove('search__button__active');
    queueRef.disabled = false;
  }

  if (!watched.length) {
    refs.libraryForEmptyStyle.style.paddingLeft = '0px';
    refs.library.classList.add('empty__library');
    Notiflix.Report.info(
      'Your Watched library is empty',
      ' Here you will see the movies that you add from home page',
      'Got it!'
    );
    
    refs.library.innerHTML = `
      <p>
        "Your Watched library is empty"
      </p>`;
    return;
  }
  refs.library.classList.remove('empty__library');
  Notiflix.Loading.standard();
  getArrayofMovies(watched)
    .then(data => {
      Notiflix.Loading.remove();
      refs.library.innerHTML = createLibraryMarkup(data);
    })
    .catch(er => console.log(er));
}

function showQueue() {
  setLibStateLocalStorage("queue");
  refs.libraryForEmptyStyle.style.paddingLeft = '105px';
  if (!queueRef.classList.contains('header-movie-button--active')) {
    queueRef.classList.add('search__button__active');
    queueRef.disabled = true;
    watchedRef.classList.remove('search__button__active');
    watchedRef.disabled = false;
  }

  if (!queue.length) {
    Notiflix.Report.info(
      'Your Queue library is empty',
      ' Here you will see the movies that you add from home page',
      'Got it!'
    );
    refs.libraryForEmptyStyle.style.paddingLeft = '0px';
    refs.library.classList.add('empty__library');
    refs.library.innerHTML = `
    <p class="empty__library">
        "Your Queue library is empty"
    </p>`;
    return;
  }
  refs.library.classList.remove('empty__library');
  Notiflix.Loading.standard();
  getArrayofMovies(queue).then(data => {
    Notiflix.Loading.remove();
    refs.library.innerHTML = createLibraryMarkup(data);
  });
}

export function setLibrary(state) {
  if (state == 'watched') {
    showWatched();
  } else if (state == 'queue') {
    showQueue();
  }
  else {
    showWatched();
  }
}

// setLibrary(getLibStateLocalStorage());
