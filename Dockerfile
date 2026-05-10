From node

ENV MONGO_DB_USERNAME=admin \
    MongoDB_DB_PWD=qwerty

RUN mkdir -p docker-testapp

# copy ./docker-testapp
COPY . /docker-testapp

CMD ["node" ,"/docker-testapp/server.js"]

