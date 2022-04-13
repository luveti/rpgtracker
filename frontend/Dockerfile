FROM node:alpine
# Expose port 3000
EXPOSE 3000

RUN npm install -g pnpm@next-7

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json .

COPY pnpm-lock.yaml .

RUN pnpm install

COPY . ./

CMD ["npm", "start"]