import GameSavingLoader from './GameSavingLoader';

(async () => {
  try {
    return await GameSavingLoader.load();
  } catch (error) {
    return Promise.reject(error);
  }
})();
