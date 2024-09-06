# syntax=docker/dockerfile:1
# IMPORTANT: Do not create big size layer due to GitHub Packages have worse performance on this!
FROM debian:12.7-slim
ENV APP_ROOT=/opt/hugoalh/send-discord-webhook-ghaction
ENV DEBIAN_FRONTEND=noninteractive
ENV DENO_NO_UPDATE_CHECK=1
RUN apt-get --assume-yes update && apt-get --assume-yes dist-upgrade && apt-get --assume-yes install apt-utils
COPY --from=denoland/deno:bin-1.46.3 /deno /opt/denoland/deno/deno
RUN chmod +x /opt/denoland/deno/deno && ln -s /opt/denoland/deno/deno /usr/bin/deno
COPY _color_namespace_list.ts _fswalk.ts _payload.ts _random_integer.ts deno.jsonc mod.ts ${APP_ROOT}/
RUN cd $APP_ROOT && deno vendor mod.ts
CMD deno run --allow-env --allow-net=discord.com --allow-read --cached-only --import-map=$APP_ROOT/vendor/import_map.json $APP_ROOT/mod.ts
