/* The class EventTarget allows for adding, removing, and dispatching events with associated callbacks. */
class EventTarget {
  constructor() {
    this.listeners = {};
  }
  /**
   * This function adds an event listener to an object.
   * @param name - The name of the event that the listener is being added to. Examples of event names
   * include "click", "keydown", "submit", etc.
   * @param callback - The callback parameter is a function that will be executed when the event
   * specified by the name parameter is triggered. It is the code that will be executed in response to
   * the event.
   */
  addEventListener(name, callback) {
    if (!this.listeners[name]) {
      this.listeners[name] = [];
    }
    this.listeners[name].push(callback);
  }

  /**
   * This function removes a specific event listener from an object's list of listeners.
   * @param name - The name of the event for which the listener is being removed.
   * @param callback - The function that was previously added as an event listener and needs to be
   * removed.
   */
  removeEventListener(name, callback) {
    if (this.listeners[name]) {
      const index = this.listeners[name].indexOf(callback);
      if (index !== -1) {
        this.listeners[name].splice(index, 1);
      }
    }
  }

  /**
   * This function dispatches an event by calling all registered callbacks for a given event name.
   * @param name - The name parameter is a string that represents the name of the event that is being
   * dispatched. It is used to identify which listeners should be triggered when the event is
   * dispatched.
   */
  dispatchEvent(name) {
    if (this.listeners[name]) {
      this.listeners[name].forEach((callback) => {
        callback(this);
      });
    }
  }
}
