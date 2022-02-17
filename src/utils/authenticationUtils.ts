export function checkInput(value: string, type: string): boolean {
  if (type === 'email') {
    const regExp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
    if (regExp.test(value)) return true;
  } else if (type === 'pass') {
    const regExp = /[a-z0-9]{8,}/i;
    if (regExp.test(value)) return true;
  } else if (value.trim().length > 4) return true;
  return false;
}

export function checkLocalStorage(): string | null {
  if (localStorage.getItem('appState')) {
    return localStorage.getItem('appState') as string;
  }
  return null;
}
