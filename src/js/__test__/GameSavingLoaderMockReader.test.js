import GameSavingLoader from '../GameSavingLoader';
import read from '../reader';
import GameSaving from '../GameSaving';

jest.mock('../reader');

const data = '{"id":9,"created":1546300800,"userInfo":{"id":1,"name":"Hitman","level":10,"points":2000}}';
const hitman = new GameSaving(data);
const getBuffer = (input) => {
  const buffer = new ArrayBuffer(input.length * 2);
  const bufferView = new Uint16Array(buffer);
  for (let i = 0; i < input.length; i += 1) {
    bufferView[i] = input.charCodeAt(i);
  }
  return buffer;
};

beforeEach(() => {
  jest.resetAllMocks();
});

test('метод load должен вернуть объект', async () => {
  read.mockReturnValue(getBuffer(data));
  const testCase = await GameSavingLoader.load();
  expect(testCase).toEqual(hitman);
});

test('Метод должен вернуть объект с валидными данными', async () => {
  read.mockReturnValue(getBuffer(data));
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
  read.mockReturnValue(new Error());
  expect.assertions(1);
  await expect(GameSavingLoader.load()).rejects.toBeInstanceOf(Error);
});
