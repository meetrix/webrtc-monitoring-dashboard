FROM node:12-bullseye-slim as node-base

RUN apt update && \
    apt install -y bzip2 git && git config --global credential.helper store && \
    echo "https://ddilushan:glpat-A_rLAVpjubz1kyrxahHo@gitlab.com" > ~/.git-credentials
WORKDIR /webrtc
COPY package*.json .npmrc ./
RUN npm install
RUN cd node_modules/@peermetrics/webrtc-stats && npm install && npm run build
COPY tsconfig.json .eslintrc.json .eslintignore .prettierrc.json ./
COPY src ./src
COPY public ./public
RUN npm run build
RUN rm -rf node_modules

FROM nginx:1.15.2-alpine
RUN apk add --no-cache bash
WORKDIR /usr/share/nginx/html
COPY ./env.sh .
RUN chmod +x env.sh
COPY .env.production .env
COPY --from=node-base /webrtc/build /usr/share/nginx/html
COPY nginx.default.conf.template /etc/nginx/templates/default.conf.template

CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
#CMD ["sleep", "7200"]
