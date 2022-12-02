FROM node:12-bullseye-slim as node-base

RUN apt update && \
    apt install -y bzip2 git && git config --global credential.helper store && \
    echo "https://ddilushan:glpat-A_rLAVpjubz1kyrxahHo@gitlab.com" > ~/.git-credentials
WORKDIR /webrtc
COPY package*.json .npmrc ./
RUN npm install
RUN cd node_modules/@peermetrics/webrtc-stats && npm install && npm run build
COPY tsconfig.json .eslintrc.json .eslintignore .prettierrc.json .env.production ./
COPY src ./src
COPY public ./public
RUN npm run build
RUN rm -rf node_modules

FROM nginx
WORKDIR /usr/share/nginx/html
COPY ./env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh
COPY .env.production .env
COPY --from=node-base /webrtc/build /usr/share/nginx/html
COPY nginx.default.conf.template /etc/nginx/templates/default.conf.template

#CMD ["sleep", "7200"]
