export function _indexOf(haystack, needle) {
  for (let i = 0; i < haystack.length; i++) {
    if (haystack[i] === needle) {
      return i;
    }
  }
  return null;
}

export function joinWords(words) {
  let str = '';
  words.forEach((word) => {
    if (str.charAt(str.length - 1) && str.charAt(str.length - 1) !== ' ' && word.charAt(0) !== ' ') {
      str += ' ';
    }
    str += word;
  });
  return str;
}


/*
  These functions require target to be a js-tabbable, or else this won't work since index will be null
*/
export function focusPrevElement(target) {
  const inputs = document.getElementsByClassName('js-tabbable');
  const index = _indexOf(inputs, target);
  if (index != null && inputs[index - 1]) {
    inputs[index - 1].focus();
  }
}

export function focusNextElement(target) {
  const inputs = document.getElementsByClassName('js-tabbable');
  const index = _indexOf(inputs, target);
  if (index != null && inputs[index + 1]) {
    inputs[index + 1].focus();
  }
}

export function handleUpDownShortcut(e) {
  // DOWN
  if (e.which === 40) {
    focusNextElement(e.target);
  // UP
  } else if (e.which === 38) {
    focusPrevElement(e.target);
  }
}
