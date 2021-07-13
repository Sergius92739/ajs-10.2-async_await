import GameSavingLoader from '../GameSavingLoader';
import read from '../reader';
import GameSaving from '../GameSaving';
import testData from './__fixtures__/input.fixtures';
import testBuffer from './__fixtures__/output.fixtures';

jest.mock('../reader');

const hitman = new GameSaving(testData);

afterEach(() => {
  jest.clearAllMocks();
});

describe('Проверка создания объекта', () => {
  read.mockResolvedValue(testBuffer);

  test('метод load должен вернуть объект', async () => {
    await expect(GameSavingLoader.load()).resolves.toEqual(hitman);
  });

  test('Метод должен вернуть объект с валидными данными', async () => {
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
});

test('метод load должен быбросить ошибку', async () => {
  read.mockRejectedValue(new Error());
  expect.assertions(1);
  await expect(GameSavingLoader.load()).rejects.toBeInstanceOf(Error);
});
