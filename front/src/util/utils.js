export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export function isEmptyString(str) {
  if (typeof str !== 'string') {
    return false;
  }
  return str.trim().length === 0;
}

export function isEmailFormat(email) {
  if (email === null) {
    return false;
  }
  if (typeof email !== 'string' || !email) {
    return false;
  }
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return emailRegex.test(email);
}

export function isPhoneNumFormat(num) {
  return /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/.test(num);
}
