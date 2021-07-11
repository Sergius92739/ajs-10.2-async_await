import GameSaving from '../GameSaving';
import GameSavingLoader from '../GameSavingLoader';
import json from '../parser';

jest.mock('../parser');

const data = '{"id":9,"created":1546300800,"userInfo":{"id":1,"name":"Hitman","level":10,"points":2000}}';
const badData = '{id":9,"created":1546300800,"userInfo":{"id":1,"name":"Hitman","level":10,"points":2000}}';
const hitman = new GameSaving('{"id":9,"created":1546300800,"userInfo":{"id":1,"name":"Hitman","level":10,"points":2000}}');

beforeEach(() => {
  jest.resetAllMocks();
});

test('метод load должен вернуть объект', async () => {
  json.mockReturnValue(data);
  const testCase = await GameSavingLoader.load();
  expect(testCase).toEqual(hitman);
});

test('Метод должен вернуть объект с валидными данными', async () => {
  json.mockReturnValue(data);
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
  const userData = await GameSavingLoader.load();
  expect(userData).toEqual(testObj);
});

test('метод load должен быбросить ошибку', async () => {
  json.mockReturnValue(badData);
  expect.assertions(1);
  await expect(GameSavingLoader.load()).rejects.toThrow(new Error('Unexpected token i in JSON at position 1'));
});
