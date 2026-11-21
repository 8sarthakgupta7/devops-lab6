FROM node:24-alpine
LABEL org.opencontainers.image.source="https://github.com/8sarthakgupta7/devops-lab6"
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY src ./src
ARG APP_VERSION=dev
ENV APP_VERSION=$APP_VERSION
ENV PORT=3000
EXPOSE 3000
USER node
CMD ["node", "src/server.js"]
