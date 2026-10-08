# Pass the version from .nvmrc: docker build --build-arg NODE_VERSION=$(cat .nvmrc) .
ARG NODE_VERSION
FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/openlint

COPY scripts/install.sh /usr/src/openlint/
COPY packages/cli/package.json /usr/src/openlint/
COPY packages/cli/package.json /usr/local/lib/package.json
RUN apk --no-cache add curl jq \
  && ./install.sh $(cat package.json | jq -r '.version') \
  && rm ./install.sh && rm ./package.json
ENV NODE_ENV production

ENTRYPOINT ["sh", "-c", "exec openlint \"$@\"", "sh"]
