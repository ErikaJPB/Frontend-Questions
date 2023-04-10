class EventTarget {
  constructor() {
    this.listeners = {};
  }
  addEventListener(name, callback) {
    if (!this.listeners[name]) {
      this.listeners[name] = [];
    }
    this.listeners[name].push(callback);
  }
  removeEventListener(name, callback) {
    if (this.listeners[name]) {
      const index = this.listeners[name].indexOf(callback);
      if (index !== -1) {
        this.listeners[name].splice(index, 1);
      }
    }
  }

  dispatchEvent(name) {
    if (this.listeners[name]) {
      this.listeners[name].forEach((callback) => {
        callback(this);
      });
    }
  }
}
