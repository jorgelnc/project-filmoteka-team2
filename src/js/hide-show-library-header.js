
window.addEventListener('scroll', onScrollLibrary);

function onScrollLibrary(event) {
  let header = document.querySelector('.header');
  let library = document.querySelector('.gallery');
  if (window.pageYOffset > 0) {
    header.classList.add('hidden');
    library.classList.add('top');
  } else {
    setTimeout(function () {
      header.classList.remove('hidden');
      library.classList.remove('top');
    }, 100); 
  }
}

