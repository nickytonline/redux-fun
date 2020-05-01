/**
 *
 * @param {Function} reducer
 * @param {object|number|string|boolean|Array} initialState
 */
export function createStore(reducer, initialState) {
  let state = initialState;
  let listeners = new Set();

  /**
   * Returns the current state of the Redux Store
   */
  const getState = () => state;

  /**
   * Dispatches an action to update the Redux store and
   * notifies subscribers, if any, of the state changes.
   *
   * @param {object} action
   */
  const dispatch = (action) => {
    state = reducer(state, action);

    // Notify all subscribers of state changes
    for (let [listener] of listeners.entries()) {
      listener(state);
    }
  };

  /**
   * Subscribes the given listener to the Redux store.
   *
   * @param {Function} listener
   *
   * @returns {Function} Returns an unsubscribe function
   */
  const subscribe = (listener) => {
    listeners.add(listener);

    // Subscription callback should the subscriber decide to unsubscribe.
    return () => {
      listeners.delete(listener);
    };
  };

  return {
    getState,
    dispatch,
    subscribe,
  };
}
