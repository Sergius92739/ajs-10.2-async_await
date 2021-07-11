import GameSaving from './GameSaving';
import json from './parser';
import read from './reader';

export default class GameSavingLoader {
  static async load() {
    try {
      const data = await read();
      const jsonStr = await json(data);
      return new GameSaving(jsonStr);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
