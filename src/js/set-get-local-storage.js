const KEY_QUEUE = 'queue';
const KEY_WATCHED = 'watched';
const KEY_LIB_STATE = 'libState';

export const watched = getWatchedLocalStorage() || [];
export const queue = getQueueLocalStorage() || [];
export const libState = getLibStateLocalStorage() || [];

export function getWatchedLocalStorage() {
  return JSON.parse(localStorage.getItem(KEY_WATCHED));
}

export function getQueueLocalStorage() {
  return JSON.parse(localStorage.getItem(KEY_QUEUE));
}

export function setWatchedLocalStorage(arr) {
  localStorage.setItem(KEY_WATCHED, JSON.stringify(arr));
}

export function setQueueLocalStorage(arr) {
  localStorage.setItem(KEY_QUEUE, JSON.stringify(arr));
}

export function getLibStateLocalStorage() {
  return JSON.parse(localStorage.getItem(KEY_LIB_STATE));
}

export function setLibStateLocalStorage(arr) {
  localStorage.setItem(KEY_LIB_STATE, JSON.stringify(arr));
}
