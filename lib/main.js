const DOMNodeCollection = require("./dom_node_collection.js");

window.$l = (arg) => {
  let selectorArr;
  
  if (arg instanceof HTMLElement) {
    selectorArr = [arg];
  } else {
    const selector = document.querySelectorAll(arg);
    selectorArr = Array.from(selector);
  }
  return new DOMNodeCollection(selectorArr);
};
