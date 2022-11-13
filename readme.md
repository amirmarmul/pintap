# Node.JS, Express, NoSQL, Clean Architecture, Serverless Framework

## Daftar Isi


1. [Tech Stack](#tech-stack)
2. [Deploy di komputer lokal](#deploy-di-komputer-lokal)
3. [Deploy ke Serverless Platform - AWS Lambda](#deploy-ke-serverless-platform---aws-lambda)
4. [Testing dengan Postman](#testing-dengan-postman)

## Tech Stack

Dalam aplikasi ini, saya menggunakan:
- TypeScript
- MongoDB
- Mongoose ODM
- Node.Js
- ExpressJS
- JsonWebToken
- Nodemon
- Dotenv
- Postman
- VSCode
- ...

## Deploy di komputer lokal

Untuk bisa menjalankan aplikasi ini diperlukan beberapa software yang harus diterinstall di komputer local anda, diantaranya:
- Docker
- Docker Compose
- Node.JS 16+

Setelah requirement diatas terpenuhi, untuk melakukan setup awal, pastikan Anda telah melakukan cloning projek ini.

Setelah anda cloning, repo ini, buka terminal pada komputer anda dan masuk ke folder repo ini:
```
cd Code/pintab
```

Setelah kita berada dalam folder pintab, jalankan perintah:
```
npm install
```

### Running database service menggunakan docker

Untuk menjalankan database Mongo yang ada dalam projek ini, cukup jalankan perintah:
```
docker compose up -d
docker compose ps # untuk melihat status dari `running container`

=> NAME                COMMAND                  SERVICE             STATUS              PORTS
=> pintap-mongo-1      "docker-entrypoint.s…"   mongo               running             0.0.0.0:27017->27017/tcp, :::27017->27017/tcp
```

### Running App
Aplikasi ini secara default menggunakan In-Memory database, apabila menggunakan menggunakan MongoDB, pastikan membuat file `.env` pada root projek:

```
PORT=4000

DATABASE_DIALECT=mongo
DATABASE_URL=mongodb://root:root@localhost:27017/mydb?authSource=admin
```

Setelah proses pengaturan `.env`, selanjutnya jalankan perintah:
```
npm run build # untuk melakukan build project, konversi dari ts menjadi js

=> > pintap@1.0.0 build
=> > tsc
```

```
npm run start

=> > pintap@1.0.0 start
=> > node dist/index.js
=>
=> Listening on 4000
```

Selanjutnya, import [Pintab Postman Collection](docs/Pintap.postman_collection.json) yang ada pada folder docs di repository ini.

kemudian pada bagian current value masukkan endpoint:

`http://localhost:4000`

![Setup collection variables](docs/screen-1.png "Screen 1")

Berikut salah satu contoh request menggunakan salah satu endpoint pada projek ini.
![List users endpoint](docs/screen-2.png "Screen 2")


## Deploy ke Serverless Platform - AWS Lambda

Requirements:
- [Serverless Framework](https://www.serverless.com/framework/docs/getting-started/)
- [AWS accounts](https://aws.amazon.com/)

Langkah pertama pastikan telah membuat (IAM users)[https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html#id_users_create_console] pada Akun AWS Lambda.

Install dan Konfigurasi Serverless Framework

```
sudo npm install -g serverless
```

konfigurasi serverless cli untuk kebutuhan deployment:
```
serverless config credentials \
--provider aws \
--key PUBLIC_KEY \
--secret SECRET_KEY
```

```
serverless deploy
...
=> Deploying serverless-pintap to stage dev (ap-southeast-1)
=>
=> ✔ Service deployed to stack serverless-pintap-dev (67s)
=>
=> endpoint: ANY - https://nok6jhhux0.execute-api.ap-southeast-1.amazonaws.com
=> functions:
=>   app: serverless-pintap-dev-app (51 MB)
=>
=> Need a better logging experience than CloudWatch? Try our Dev Mode in console: run "serverless --console"
```

### Noted

Aplikasi ini supports untuk database:

- In-memory Database
- MongoDB

## Testing dengan Postman

Untuk melakukan testing api, pastikan Anda sudah melakukan import [Pintab Postman Collection](docs/Pintap.postman_collection.json) yang ada pada folder docs di repository ini.

kemudian pada bagian current value masukkan endpoint dari hasil deploy pada serverless cli `https://nok6jhhux0.execute-api.ap-southeast-1.amazonaws.com` atau untuk local deployment pastikan:
`http://localhost:4000`.

![Setup collection variables](docs/screen-1.png "Screen 1")

Berikut salah satu contoh request menggunakan salah satu endpoint pada projek ini.
![List users endpoint](docs/screen-2.png "Screen 2")
