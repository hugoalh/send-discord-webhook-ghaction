# syntax=docker/dockerfile:1
# IMPORTANT: Do not create big size layer due to GitHub Packages have worse performance on this!
FROM debian:12.6-slim as stage-base
ENV DEBIAN_FRONTEND=noninteractive
ENV DENO_FUTURE=1
RUN apt-get --assume-yes update && apt-get --assume-yes dist-upgrade && apt-get --assume-yes install apt-utils

FROM stage-base as stage-extract-deno
ARG DENO_VERSION=1.46.1
RUN apt-get --assume-yes install unzip
ADD https://github.com/denoland/deno/releases/download/v${DENO_VERSION}/deno-x86_64-unknown-linux-gnu.zip /tmp/deno.zip
RUN unzip /tmp/deno.zip

FROM stage-base
ENV APP_ROOT=/opt/hugoalh/send-discord-webhook-ghaction
COPY --from=stage-extract-deno /tmp/deno /opt/denoland/deno/deno
RUN chmod +x /opt/denoland/deno/deno && ln -s /opt/denoland/deno/deno /usr/bin/deno
COPY _color_namespace_list.ts _fswalk.ts _payload.ts _random_integer.ts deno.jsonc mod.ts ${APP_ROOT}/
RUN cd $APP_ROOT && deno cache mod.ts
CMD deno run --allow-env --allow-net --allow-read --cached-only --config=$APP_ROOT/deno.jsonc $APP_ROOT/mod.ts
