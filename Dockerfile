FROM node:16-alpine

WORKDIR /usr/src/openlint

COPY scripts/install.sh /usr/src/openlint/
COPY packages/cli/package.json /usr/src/openlint/
COPY packages/cli/package.json /usr/local/lib/package.json
RUN apk --no-cache add curl jq \
  && ./install.sh $(cat package.json | jq -r '.version') \
  && rm ./install.sh && rm ./package.json
ENV NODE_ENV production

ENTRYPOINT ["sh", "-c", "exec openlint \"$@\"", "sh"]
