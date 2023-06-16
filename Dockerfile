FROM node

WORKDIR /usr/local/app

COPY . .

RUN npm i 

RUN npm i typescript prisma @prisma/client pm2

RUN npx prisma generate 

RUN npx prisma migrate deploy
CMD ["npx", "pm2", "start" ,"dist/index.js"]








