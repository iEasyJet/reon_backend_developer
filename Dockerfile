FROM node

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

EXPOSE ${PORT}

RUN npm run build

CMD ["npm", "start"]