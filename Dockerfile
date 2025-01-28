FROM node:20-alpine

RUN mkdir -p /home/node/kz-bot/node_modules && chown -R node:node /home/node/kz-bot

WORKDIR /home/node/kz-bot

COPY package*.json ./

RUN npm ci --unsafe-perm=true --quiet

COPY --chown=node:node . .

CMD [ "npm", "start" ]