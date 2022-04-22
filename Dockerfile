FROM node:16 AS ui-build
WORKDIR /usr/src/app
COPY client/ ./client/
RUN cd client && npm install && npm run build

FROM node:16 AS server-build
WORKDIR /root/
COPY --from=ui-build /usr/src/app/client/build ./client/build
COPY server/ ./server/
RUN cd server && npm install

EXPOSE 8080

CMD ["node", "./server/server.js"]
