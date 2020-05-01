export function createStore(reducer, initialState) {
  let state = initialState;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);

    listeners.forEach((listener) => {
      listener(state);
    });
  };

  const subscribe = (listener) => {
    listeners.push(listener);

    return () => {
      listeners = listeners.filter(
        (potentialListenerToEvict) => potentialListenerToEvict !== listener,
      );
    };
  };

  return {
    getState,
    dispatch,
    subscribe,
  };
}
