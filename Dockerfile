FROM node:20.18.3-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY . .

RUN pnpm install

EXPOSE 8000

CMD ["pnpm", "serve"]
