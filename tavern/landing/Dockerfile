from golang:latest

RUN apt -y update
RUN apt -y upgrade
RUN apt install -y nodejs
RUN apt install -y npm
ADD ./serve /goclient
ADD ./my-app /client
WORKDIR /client
RUN npm run build
RUN mv ./build /build
workdir /goclient
RUN go mod init client
RUN go get
RUN go build
CMD ["./client"]
