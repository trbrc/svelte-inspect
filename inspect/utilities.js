export const directInstanceOf = type => {
  const prototype = type.prototype;
  return value => value && Object.getPrototypeOf(value) === prototype;
};

export const isArray = directInstanceOf(Array)

export const isNil = (value = null) => value === null;

export const keyIsIndex = key => String(parseInt(String(key))) === String(key);

import {tick} from 'svelte';

export const onTick = callback => tick().then(callback);

export const getObjectToStringTag = object => Object.prototype.toString.call(object).slice(8, -1);

export const getObjectTypeString = object => {
  const prototype = Object.getPrototypeOf(object);
  const constructorName = prototype && prototype.constructor && prototype.constructor.name;
  const usefulConstructorName = constructorName && constructorName !== 'Object';

  return usefulConstructorName ? constructorName : getObjectToStringTag(object);
};

export const getAllProperties = object => {
  return [
    ...Object.getOwnPropertyNames(object),
    ...Object.getOwnPropertySymbols(object),
    ...(object['__proto__'] ? ['__proto__'] : [])
  ];
};

export const stringEscapeGroups = string => {
  // Split string into array of sequences of characters, with needed escapes broken out
  const characters = string.split(/([\x00-\x1F]+)/);
  return characters.map(char => JSON.stringify(char).slice(1, -1));
};

const backslashCharCode = '\\'.charCodeAt(0);

export const isEscapeGroup = string => string.charCodeAt(0) === backslashCharCode;
