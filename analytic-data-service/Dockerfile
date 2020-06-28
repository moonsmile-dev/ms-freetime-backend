FROM hayd/alpine-deno:1.1.1

EXPOSE 3000

WORKDIR /usr/app

COPY deps.ts .

RUN deno cache --unstable --lock=lock.json --lock-write deps.ts

COPY . .

RUN deno cache --unstable -c tsconfig.json app.ts

CMD [ "run", "--allow-net", "--allow-read", "--allow-write", "--allow-env" ,"--unstable" ,"-c tsconfig.json", "app.ts" ]