#! /bin/sh

npm i 

npm i typescript  prisma  @prisma/client

npx prisma generate 

npx prisma migrate deploy

npx pm2 start dist/index.js