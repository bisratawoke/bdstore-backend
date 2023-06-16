FROM nodejs

WORKDIR /usr/local/app

COPY . .

CMD ["./start.sh"]






