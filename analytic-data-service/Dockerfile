FROM hayd/alpine-deno:1.2.2

EXPOSE 3000

WORKDIR /usr/app

ADD deps.ts .

RUN deno cache --unstable --lock=lock.json --lock-write deps.ts

ADD . .

RUN deno cache --unstable -c tsconfig.json app.ts