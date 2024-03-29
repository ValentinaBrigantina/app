# My app
Application for sharing photos and for communication in a general chat.

<div style="display: flex; flex-direction: row; justify-content: space-between;">
    <img src="https://s1.hostingkartinok.com/uploads/images/2022/09/5354d05c1d5e7abdde2f8caeb8ededa5.png" width="380" height="300">
    <img src="https://s1.hostingkartinok.com/uploads/images/2022/09/ebd3e4480b0720829b7753682158e8e3.png" width="210" height="300">
</div>

# Requirements
- node.js v16+

# Stack
- [express.js](https://expressjs.com/)
- [pug.js](https://pugjs.org/api/getting-started.html)
- [prisma](https://www.prisma.io/express)
- [docker](https://docs.docker.com/)


## Installation
To install project on your local machine just run

```bash
git clone git@github.com:ValentinaBrigantina/app.git

touch micro_services/gateway/.env | cp micro_services/gateway/.env.local micro_services/gateway/.env

touch micro_services/storage/.env | cp micro_services/storage/.env.local micro_services/storage/.env

docker compose up --build
```
Runs the app in the development mode.
Open http://127.0.0.1:3000/ to view it in your browser.

## License
MIT
