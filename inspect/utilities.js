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
  const enumerableKeys = [];
  for (const enumerableKey in object) {
    enumerableKeys.push(enumerableKey);
  }
  return [...new Set([
    ...enumerableKeys,
    ...Object.getOwnPropertyNames(object),
    ...Object.getOwnPropertySymbols(object),
    ...(object['__proto__'] ? ['__proto__'] : [])
  ])];
};

export const getPropertyDescriptor = (object, prop) => {
  if (!object) {
    return {};
  } else if (prop === '__proto__') {
    return {
      value: Object.getPrototypeOf(object)
    };
  } else {
    const ownPropertyDescriptor = Object.getOwnPropertyDescriptor(object, prop);
    if (ownPropertyDescriptor) {
      return ownPropertyDescriptor;
    } else {
      const prototype = Object.getPrototypeOf(object);
      return getPropertyDescriptor(prototype, prop);
    }
  }
};

export const stringEscapeGroups = string => {
  // Split string into array of sequences of characters, with needed escapes broken out
  const characters = string.split(/([\x00-\x1F]+)/);
  return characters.map(char => JSON.stringify(char).slice(1, -1));
};

const backslashCharCode = '\\'.charCodeAt(0);

export const isEscapeGroup = string => string.charCodeAt(0) === backslashCharCode;

export const groupByRegexes = (regexes) => {
  const keys = Object.keys(regexes);
  return string => {
    const groups = [];
    let source = string;
    while (source.length) {
      let bestKey = null;
      let bestMatch = null;
      let bestIndex = source.length;
      for (const key of keys) {
        const regex = regexes[key];
        const match = source.match(regex);
        if (match && match.index < bestIndex) {
          bestKey = key;
          bestMatch = match[0];
          bestIndex = match.index;
        }
      }
      if (bestIndex > 0) {
        groups.push({key: undefined, match: source.slice(0, bestIndex)})
      }
      if (bestMatch) {
        groups.push({key: bestKey, match: bestMatch})
        source = source.slice(bestIndex + bestMatch.length);
      } else {
        break;
      }
    }
    return groups;
  };
};



