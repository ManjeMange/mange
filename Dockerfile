FROM alpine:latest

COPY ./pocketbase /pocketbase
COPY ./dist /pb_public
COPY ./schema.json /schema.json

EXPOSE 8090
VOLUME ["/pb_data"]

CMD [ "./pocketbase", "serve", "--http=0.0.0.0:8090" ]
