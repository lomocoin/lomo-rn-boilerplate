
cp ./src/themes/fonts/*.ttf ./android/app/src/main/assets/fonts/

node ./node_modules/.bin/generate-icon \
    ./src/themes/fonts/icomoon.css \
    --t=./scripts/icon-set.tpl \
    --fontFamily=icomoon \
    > ./src/themes/Icons.ts

prettier --single-quote --trailing-comma=es5 --write ./src/themes/Icons.ts
