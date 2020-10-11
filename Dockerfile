FROM node:12

WORKDIR /app

COPY . /app
RUN cd /app

RUN npm ci --production
EXPOSE 80

CMD npm run build 
CMD npm start