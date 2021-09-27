const fs = require('fs/promises');
const path = require('path');

class CSVGenerator {
  constructor(string) {
    if (!string) {
      throw Error('Please provide an argument as input!');
    }
    this.string = string;
  }

  converToUpperCase() {
    return this.string.toUpperCase();
  }

  converToAlternateCase() {
    const newString = [];
    for (let i = 0; i < this.string.length; i++) {
      if (i % 2 === 0) newString.push(this.string[i].toLowerCase());
      else newString.push(this.string[i].toUpperCase());
    }

    return newString.join('');
  }

  async createCSV(fileName = 'data') {
    try {
      const data = this.string.split('').join(',');
      const filePath = path.join(process.cwd(), `${fileName}.csv`);

      await fs.writeFile(filePath, data, {
        encoding: 'utf-8',
      });

      return filePath;
    } catch (err) {
      throw Error(
        'Unable to generate CSV, please try again with a different path or filename!'
      );
    }
  }
}

async function generateCSV() {
  const string = process.argv[2];

  let csv;
  try {
    csv = new CSVGenerator(string);
  } catch (error) {
    console.error(error.message);
    return;
  }

  console.log(csv.converToUpperCase());
  console.log(csv.converToAlternateCase());

  try {
    console.log('filepath', await csv.createCSV());
    console.log('CSV created!');
  } catch (error) {
    console.error(error.message);
    return;
  }
}

generateCSV();

// export needed to test the module
exports.CSVGenerator = CSVGenerator;
