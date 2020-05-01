import { createStore } from '../store';

describe('Redux Store', () => {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return state + 1;

      case 'DECREMENT':
        return state - 1;

      default:
        return state;
    }
  };

  it('should return undefined when no initial state is set', () => {
    const store = createStore(() => {});

    expect(store.getState()).toBeUndefined();
  });

  it('should return the initial state passed in', () => {
    const store = createStore(() => {}, 0);

    expect(store.getState()).toEqual(0);
  });

  it('should dispatch an action and update state', () => {
    const reducer = (state, action) => {
      switch (action.type) {
        case 'INCREMENT':
          return state + 1;

        case 'DECREMENT':
          return state - 1;

        default:
          return state;
      }
    };

    const store = createStore(reducer, 0);

    store.dispatch({
      type: 'INCREMENT',
    });

    expect(store.getState()).toEqual(1);
  });

  it('should return the current state if an action is not supported', () => {
    const store = createStore(reducer, 0);

    store.dispatch({
      type: 'INCREMENT',
    });

    store.dispatch({
      type: 'INCREMENT',
    });

    store.dispatch({
      type: 'INCREMET',
    });

    expect(store.getState()).toEqual(2);
  });

  it('should subscribe to the store', () => {
    const storeListener = jest.fn();

    const store = createStore(reducer, 0);

    store.subscribe(storeListener);

    store.dispatch({
      type: 'INCREMENT',
    });

    expect(storeListener).toHaveBeenCalled();
  });

  it('should not call our listener if we unsubscribe it from the store', () => {
    const storeListener = jest.fn();
    const store = createStore(reducer, 0);
    const unsubscribe = store.subscribe(storeListener);

    unsubscribe();

    store.dispatch({
      type: 'INCREMENT',
    });

    expect(storeListener).not.toHaveBeenCalled();
  });
});
