export function createStore(reducer, initialState) {
  let state = initialState;
  let listeners = new Set();

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);

    for (let [listener] of listeners.entries()) {
      listener(state);
    }
  };

  const subscribe = (listener) => {
    listeners.add(listener);

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
