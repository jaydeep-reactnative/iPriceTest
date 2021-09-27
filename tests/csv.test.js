const fs = require('fs');
const { CSVGenerator } = require('../index');

it('should throw an error if a valid argument is not passed', () => {
  expect(() => new CSVGenerator()).toThrowError(
    'Please provide an argument as input!'
  );
});

it('successfully converts the string to uppercase', () => {
  expect(new CSVGenerator('abcd').converToUpperCase()).toEqual('ABCD');
});

it('successfully converts the string to alternate case', () => {
  expect(new CSVGenerator('abcd').converToAlternateCase()).toEqual('aBcD');
});

it('successfully creates a CSV in the current directory', async () => {
  const fileName = 'test';
  const filePath = await new CSVGenerator('Hello World').createCSV(fileName);

  expect(fs.existsSync(filePath)).toBeTruthy();
  expect(fs.readFileSync(filePath, { encoding: 'utf-8' })).toEqual(
    'H,e,l,l,o, ,W,o,r,l,d'
  );

  cleanup(filePath);
});

function cleanup(filePath) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}
