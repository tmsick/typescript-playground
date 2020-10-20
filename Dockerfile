FROM node:12-buster AS builder
WORKDIR /app

# Install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install

# Transpile JavaScript from TypeScript
COPY tsconfig.json .
COPY src/ src/
RUN yarn run build

###

FROM node:12-alpine
WORKDIR /app
COPY --from=builder /app/dist/ .
CMD ["node", "./index.js"]
