FROM node:18.10.0
COPY discord-webhook-payload-custom.schema.json main.js package-lock.json package.json /opt/hugoalh/send-discord-webhook-ghaction/
WORKDIR /opt/hugoalh/send-discord-webhook-ghaction/
RUN ["npm", "ci"]
WORKDIR /
CMD ["node", "/opt/hugoalh/send-discord-webhook-ghaction/main.js"]
