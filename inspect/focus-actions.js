let serialCounter = 0;

export function target(element) {
  // This should probably not be a global serial, but based instead on the scope.
  element.dataset.focusTarget = serialCounter++;
  element.tabIndex = 0;
}

export function scope(element) {
  element.dataset.focusScope = '';
}

const createRangeFrom = element => {
  const range = document.createRange();
  range.selectNodeContents(element);
  return range;
};

function getElementBefore(referenceElement, elements) {
  const range = createRangeFrom(referenceElement);
  const lastIndex = elements.length - 1;
  for (let i = lastIndex; i >= 0; i--) {
    if (range.comparePoint(elements[i], 0) === -1) {
      return elements[i];
    }
  }
  return elements[lastIndex];
}

function getElementAfter(referenceElement, elements) {
  const range = createRangeFrom(referenceElement);
  for (let i = 0; i < elements.length; i++) {
    if (range.comparePoint(elements[i], 0) === 1) {
      return elements[i];
    }
  }
  return elements[0];
}

function getTargetBefore(element) {
  return getElementBefore(
    element,
    document.querySelectorAll('[data-focus-target]')
  );
}

function getTargetAfter(element) {
  return getElementAfter(
    element,
    document.querySelectorAll('[data-focus-target]')
  );
}

function getParentScope(element) {
  return element.closest('[data-focus-scope]');
}

function setFocus(targetElement) {
  if (targetElement && targetElement !== document.activeElement) {
    const serial = targetElement.dataset.focusTarget;
    if (serial) {
      const scope = getParentScope(targetElement);
      if (scope) {
        scope.dataset.focusScope = serial;
      }
    }
    targetElement.focus();
    return true;
  }
  return false;
}

export function focusPrev() {
  return setFocus(getTargetBefore(document.activeElement));
}

export function focusNext() {
  return setFocus(getTargetAfter(document.activeElement));
}

export function exitFocusScope() {
  const parent = getParentScope(document.activeElement);
  if (parent) {
    return setFocus(getTargetBefore(parent));
  } else {
    document.activeElement.blur();
    return false;
  }
}

export function enterFocusScope() {
  const nextScope = getElementAfter(
    document.activeElement,
    document.querySelectorAll('[data-focus-scope]')
  );
  const serial = nextScope.dataset.focusScope;
  const selector = serial
    ? `[data-focus-target="${serial}"]`
    : `[data-focus-target]`;
  const target = nextScope.querySelector(selector);
  return setFocus(target);
}

export function focusBySearch(string) {
  // Find a focus target that matches the string.
  try {
    const regex = new RegExp(string.split('').join('.*'), 'i');
    let scope = (document.activeElement);
    do {
      scope = getParentScope(scope.parentElement);
      const targets = (scope || document).querySelectorAll('[data-focus-target]');
      for (let i = 0; i < targets.length; i++) {
        const target = targets[i];
        const text = target.textContent;
        if (regex.test(text)) {
          return setFocus(target);
        }
      }
    } while (scope);
  } catch (e) {}
  return false;
}

