const fs = require('fs');
const path = require('path');
const {
  execSync
} = require('child_process');

let currentGitRevNumber = execSync('git rev-parse HEAD').toString();
currentGitRevNumber = currentGitRevNumber.slice(0, currentGitRevNumber.length - 1);

console.log('Current git commit rev:', currentGitRevNumber);

function replaceLastCommit(filePath) {
  console.log('Read .ENV file:', filePath);
  const curEnvContent = fs.readFileSync(filePath, {
    encoding: 'utf-8'
  });
  const newEnvContent = curEnvContent.replace(/(LAST_COMMIT_REV: ')(\w+)(',)/, `$1${currentGitRevNumber}$3`);
  fs.writeFileSync(filePath, newEnvContent, {
    encoding: 'utf-8'
  });
  console.log('Saved .ENV file:', filePath);
}

replaceLastCommit(path.join(process.cwd(), 'src/config/common.ts'));
