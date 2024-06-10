export function saveToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

export function getFromLocalStorage(key) {
  return localStorage.getItem(key);
}

export function removeFromLocalStorage(key) {
  localStorage.removeItem(key);
}

export function existsInLocalStorage(key) {
  return localStorage.getItem(key) !== null;
}

export function saveToSessionStorage(key, value) {
  sessionStorage.setItem(key, value);
}

export function getFromSessionStorage(key) {
  return sessionStorage.getItem(key);
}

export function removeFromSessionStorage(key) {
  sessionStorage.removeItem(key);
}

export function existsInSessionStorage(key) {
  return sessionStorage.getItem(key) !== null;
}
