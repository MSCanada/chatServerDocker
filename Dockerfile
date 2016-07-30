FROM node:0.10.38
RUN mkdir /src
WORKDIR /src
ADD app/ /src/
RUN npm install
EXPOSE 6789
RUN ls
CMD ["./cmd.sh"]