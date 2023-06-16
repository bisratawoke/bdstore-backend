FROM node

WORKDIR /usr/local/app

COPY . .

CMD ["./start.sh"]






