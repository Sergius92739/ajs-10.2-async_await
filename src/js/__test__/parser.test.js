import json from '../parser';
import read from '../reader';

const dataTest = '{"id":9,"created":1546300800,"userInfo":{"id":1,"name":"Hitman","level":10,"points":2000}}';

test('Метод json должен вернуть зарезолвенный промис', async () => {
  const data = await read();
  expect(json(data)).toEqual(Promise.resolve());
});

test('В промисе должна быть валидная строка для json', async () => {
  const data = await read();
  await expect(json(data)).resolves.toBe(dataTest);
});
