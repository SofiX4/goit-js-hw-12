import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = form.querySelector('input[name="search-text"]');
const loadMoreBtn = document.querySelector('.load-more');

let currentQuery;
let currentPage;
const PER_PAGE = 15;

function scrollAfterLoad() {
  const firstCard = document.querySelector('.gallery-item'); // клас твоїх карточок
  if (!firstCard) return;

  const cardHeight = firstCard.getBoundingClientRect().height;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

// ===================== FORM SUBMIT ========================
form.addEventListener('submit', async event => {
  event.preventDefault();

  const query = input.value.trim();

  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query!',
    });
    return;
  }

  // Reset state for new search
  currentQuery = query;
  currentPage = 1;

  clearGallery();
  hideLoadMore();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    if (!data.hits.length) {
      iziToast.info({
        title: 'No results',
        message: 'Sorry, no images found.',
      });
      return;
    }

    createGallery(data.hits);

    // END OF COLLECTION ON FIRST PAGE
    if (data.totalHits <= PER_PAGE) {
      hideLoadMore();
      iziToast.info({
        title: 'End',
        message: "We're sorry, but you've reached the end of search results.",
      });
      return;
    }

    showLoadMore();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to load images',
    });
  } finally {
    hideLoader();
  }
});

// ==================== LOAD MORE HANDLER ====================
loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  await loadMoreImages();
});

async function loadMoreImages() {
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    createGallery(data.hits);

    // Плавна прокрутка після додавання нових зображень
    scrollAfterLoad();

    // END OF COLLECTION AFTER SEVERAL PAGES
    if (currentPage * PER_PAGE >= data.totalHits) {
      hideLoadMore();
      iziToast.info({
        title: 'End',
        message: "We're sorry, but you've reached the end of search results.",
      });
      return;
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to load more images',
    });
  } finally {
    hideLoader();
  }
}

// ===================== BUTTON HELPERS ======================
function showLoadMore() {
  loadMoreBtn.classList.remove('hidden');
}

function hideLoadMore() {
  loadMoreBtn.classList.add('hidden');
}
