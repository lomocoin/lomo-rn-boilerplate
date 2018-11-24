const path = require('path');
const fs = require('fs');

const envFileName = path.join(process.cwd(), 'src/config/index.ts');

function updateConfigTs(branch) {
  const curEnvContent = fs.readFileSync(envFileName, {
    encoding: 'utf-8'
  });

  const newEnvContent = curEnvContent
    .replace(/__CODE_BRANCH__/, branch);

  fs.writeFileSync(envFileName, newEnvContent, {
    encoding: 'utf-8'
  });
}

if (!process.argv || process.argv.length < 2) {
  console.error('Wrong arguments for set-config');
  process.exit(1);
}
const branch = process.argv[2];

updateConfigTs(branch);
