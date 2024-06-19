FROM node:20

WORKDIR /NodeApplication

COPY . .

RUN npm install

EXPOSE 3000

CMD ['npm','start']