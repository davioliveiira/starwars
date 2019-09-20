export const capitalize = (s) => {
  if (typeof s !== 'string') {
    return '';
  }
  
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const cammelizeLetter = (word, index) => (index === 0 ? word.toLowerCase() : word.toUpperCase());
export const camelize = str => str.replace(/(?:^\w|[A-Z]|\b\w)/g, cammelizeLetter).replace(/\s+/g, '');

export const sizeObject = object => Object.keys(object).length;