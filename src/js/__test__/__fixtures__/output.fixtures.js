import testData from './input.fixtures';

const testBuffer = new ArrayBuffer(testData.length * 2);
const bufferView = new Uint16Array(testBuffer);

for (let i = 0; i < testData.length; i += 1) {
  bufferView[i] = testData.charCodeAt(i);
}

export default testBuffer;
