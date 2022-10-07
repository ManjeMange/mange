FROM ubuntu:latest

COPY ./pocketbase /pocketbase
COPY ./pb_public /pb_public
COPY ./schema.json /schema.json

EXPOSE 8090
VOLUME ["/pb_data"]

CMD [ "./pocketbase", "serve", "--http=0.0.0.0:8090" ]
