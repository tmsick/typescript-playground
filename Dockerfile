FROM node:12-buster

WORKDIR /app

# Install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install

# Transpile JavaScript from TypeScript
COPY tsconfig.json .
COPY src/ src/
RUN yarn run build

CMD ["node", "./dist/index.js"]
