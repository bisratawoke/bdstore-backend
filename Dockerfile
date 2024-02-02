FROM node:14

WORKDIR /usr/local/app

COPY . .

RUN npm i 

RUN npm i typescript prisma @prisma/client pm2

RUN npx prisma generate 

RUN npx prisma migrate dev --name init

RUN npx tsc

RUN mkdir ./dist/public

COPY ./public/index.html ./dist/public

CMD ["npx", "pm2-runtime", "start" ,"dist/index.js"]








