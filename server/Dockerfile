FROM node:22-alpine

WORKDIR /app

COPY package*json ./

RUN apt-get update \\
    && apt-get install --yes python3 \\
    && pip install overpy sys np lru_cache
RUN npm install --production 

COPY . .

EXPOSE 80
EXPOSE 8080
EXPOSE 443

CMD ["npm", "start"]
