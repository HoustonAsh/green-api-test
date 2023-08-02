FROM node:alpine

WORKDIR /app
COPY ./app/package*.json ./
RUN npm install
COPY ./app .

EXPOSE 3000
CMD [ "$REINSTALL" = "no" ] && npm run dev || npm install && npm run dev
