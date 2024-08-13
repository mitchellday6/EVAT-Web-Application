FROM node:22-alpine

WORKDIR /app

COPY package*json ./

RUN npm install --production

COPY . .

EXPOSE 80
EXPOSE 8080
EXPOSE 443

CMD ["npm", "start"]
