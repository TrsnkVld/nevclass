/**
 * Returns merged objects as a sibgle object.
 * TS so far does not support this out of the box.
 */
export function mergeObjects(...args) {
  let target = args[0];
  for (let i = 1; i < arguments.length; i++) {
    let source = arguments[i];
    for (let key in source) {
      if (source.hasOwnProperty(key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
}

export function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    let context = this,
      args = arguments;
    let later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

/**
 *
 * @param {Object} requestData @requires
 */
export function $showPayment(requestData) {
  if (typeof doPscbPay === "undefined") {
    const script = document.createElement("script");
    script.src = "https://oos.pscb.ru/s/widget/pscb_oos_pay.min.js";
    script.onload = () => {
      doPscbPay(requestData);
    };
    document.body.appendChild(script);
  } else {
    doPscbPay(requestData);
  }
}

export function $sortByDate(arr) {
  arr.sort((a, b) => new Date(a.sortDate) - new Date(b.sortDate));
  return arr;
}
