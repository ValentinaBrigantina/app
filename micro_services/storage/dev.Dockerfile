FROM node:18

WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN ./node_modules/.bin/prisma generate

CMD ["npm", "run", "dev"]