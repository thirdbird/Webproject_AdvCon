FROM node:13.6.0
EXPOSE 8080
EXPOSE 9229
WORKDIR /webtodo
COPY package*.json ./
RUN npm install
COPY src/ ./src/
CMD ["npm", "run", "start"]