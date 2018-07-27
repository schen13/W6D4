class DOMNodeCollection {
  constructor(array) {
    this.htmlArray = array;
  }
  
  html(string) {
    if (typeof string === 'undefined') {
      return this.htmlArray[0].innerHTML;
    } else {
      this.htmlArray.forEach((node) => {
        node.innerHTML = string;
      });
    }
  }
  
  empty() {
    this.html("");
  }
  
  append(arg) {
    this.htmlArray.forEach((node) => {
      if (typeof arg === "string") {
        node.innerHTML += arg;
      } else if (arg instanceof HTMLElement) {
        node.innerHTML += arg.outerHTML;
      } else if (arg instanceof this.constructor) {
        arg.htmlArray.forEach((innerNode) => {
          node.innerHTML += innerNode.outerHTML;
        });
      }
    });
  }
  
  attr(name, value) {
    if (typeof value === 'undefined') {
      this.htmlArray.forEach((node) => {
        let x = node.getAttribute(name);
        if (x) return x;
      });
      return null;
    } else {
      this.htmlArray.forEach((node) => {
        let outer = node.outerHTML.split(" ");
        let namevalue = [` ${name}` + "=" + `"${value}" `];
        outer = outer[0].concat(namevalue, outer.slice(1));
        node.outerHTML = outer;
      });
    }
  }
  
  addClass(arg) {
    this.htmlArray.forEach((node) => {
      if (!node.className.includes(arg)) {
        node.className += " " + arg;
      }
    });
  }
  
  removeClass(arg) {
    this.htmlArray.forEach((node) => {
      if (node.className.includes(arg)) {
        let nameArray = node.className.split(" ");
        nameArray = nameArray.filter((el) => el !== arg);
        node.className = nameArray.join(" ");
      }
    });
  }
  
  children() {
    let childArray = [];
    this.htmlArray.forEach((node) => {
      let mark = Array.from(node.children);
      childArray = childArray.concat(mark);
    });
    return new DOMNodeCollection(childArray);
  }
  
  parent() {
    return new DOMNodeCollection([this.htmlArray[0].parentElement]);
  }
  
  find(arg) {
    let foundArray = [];
    this.htmlArray.forEach((node) => {
      let foundDes = node.querySelectorAll(arg);
      foundArray = foundArray.concat(Array.from(foundDes));
    });
    return new DOMNodeCollection(foundArray);
  }
  
  remove() {
    let removedNodes = [];
    
    this.htmlArray.forEach((node) => {
      removedNodes.push(node.parentNode.removeChild(node));
    });
    
    return removedNodes;
  }
}

module.exports = DOMNodeCollection;