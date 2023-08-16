import refs from './ref';
import { loadIntoModal } from './load-into-modal';

refs.gallery.addEventListener('click', onOpenModal);
refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.divBackdrop.addEventListener('click', onBackDropClick);

function onOpenModal(event) {

  const getParentalEl = event.target.closest('.movie__card');
  if (!getParentalEl) {
    return;
  }

  const movieId = getParentalEl.dataset.movie;

  loadIntoModal(movieId);

  document.body.classList.add('show-modal');
  window.addEventListener('keydown', onEscKeyPress);
}

function onCloseModal() {
  document.body.classList.remove('show-modal');
  refs.modalContent.innerHTML = '';
}

function onBackDropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

function onEscKeyPress(event) {
  if (event.code !== 'Escape') {
    return;
  }
  window.removeEventListener('keydown', onEscKeyPress);
  onCloseModal();
}
