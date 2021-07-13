import GameSaving from '../GameSaving';
import GameSavingLoader from '../GameSavingLoader';
import json from '../parser';
import testData from './__fixtures__/input.fixtures';

jest.mock('../parser');

const hitman = new GameSaving(testData);

afterEach(() => {
  jest.clearAllMocks();
});

test('метод load должен вернуть объект', async () => {
  json.mockResolvedValue(testData);
  await expect(GameSavingLoader.load()).resolves.toEqual(hitman);
});

test('Метод должен вернуть объект с валидными данными', async () => {
  json.mockResolvedValue(testData);
  const testObj = {
    id: 9,
    created: 1546300800,
    userInfo: {
      id: 1,
      name: 'Hitman',
      level: 10,
      points: 2000,
    },
  };
  await expect(GameSavingLoader.load()).resolves.toEqual(testObj);
});

test('метод load должен быбросить ошибку', async () => {
  json.mockRejectedValue(new Error());
  expect.assertions(1);
  await expect(GameSavingLoader.load()).rejects.toThrow(new Error());
});
