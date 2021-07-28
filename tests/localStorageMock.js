const localStorage = (function () {
  let store = {
    tasks: '[]',
  };

  return {
    getItem: (key) => store[Key],
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {
        tasks: '[]',
      };
    },
  };
});

Object.defineProperty(window, 'localStorage', { value: localStorage });