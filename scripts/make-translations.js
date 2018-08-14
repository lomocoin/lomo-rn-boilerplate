const xlsx = require('node-xlsx');
const path = require('path');
const fs = require('fs');

const CSV_FILEPATH = path.join(__dirname, '../src/i18n/translations.xls');

const workSheetsFromFile = xlsx.parse(CSV_FILEPATH);

function writeJsonTranslationFile(langCol, filename) {
  const languages = {};

  const { data } = workSheetsFromFile[0];
  data.forEach((row, index) => {
    // skip header
    if (index > 0) {
      if (!row[langCol]) {
        console.log('Translation missing', row, row[0], row[langCol]);
      }
      languages[row[0]] = `${row[langCol].trim()}`;
    }
  });

  fs.writeFile(
    path.join(__dirname, '../src/i18n/', filename),
    `${JSON.stringify(
      languages,
      (key, value) => {
        if (value && typeof value === 'string') {
          return value.replace(/\\n/g, '\n');
        }
        return value;
      },
      2,
    )}\n`,
    (error) => {
      console.log('save file', filename, 'result', error || 'ok');
    },
  );
}

writeJsonTranslationFile(1, 'zh.json');
writeJsonTranslationFile(2, 'en.json');
