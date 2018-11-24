#/bin/sh
# PWD is ../

CONFIG_FILE=src/config/index.ts
if [ -f $CONFIG_FILE ]; then
   echo "File $CONFIG_FILE exists. Skip build default config."
else
  echo "File $CONFIG_FILE does not exist. Create simple config with default values."
echo "import COMMON from './common';

export default {
  ...COMMON,
  API_URL: 'http://localhost:3000',
  IMAGE_URL: 'http://localhost:3000/images',
  CODE_BRANCH: 'local',
  IS_BETA: true,
};" >> $CONFIG_FILE
fi
