FROM node:lts-fermium
COPY package*.json /
COPY discord-webhook-payload-custom.schema.json /
RUN ["npm", "ci"]
COPY main.js /
CMD ["node", "/main.js"]
