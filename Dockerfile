# syntax=docker/dockerfile:1
# IMPORTANT: Do not create big size layer due to GitHub Packages have worse performance on this!
FROM denoland/deno:bin-1.46.3 AS stage-deno
FROM debian:12.7-slim
ENV APP_ROOT=/opt/hugoalh/send-discord-webhook-ghaction
ENV DEBIAN_FRONTEND=noninteractive
ENV DENO_NO_PROMPT=1
ENV DENO_NO_UPDATE_CHECK=1
COPY --from=stage-deno /deno /opt/denoland/deno/deno
RUN chmod +x /opt/denoland/deno/deno && ln -s /opt/denoland/deno/deno /usr/bin/deno
COPY _color_namespace_list.ts _fswalk.ts _parameter.ts _payload.ts _random_integer.ts deno.jsonc mod.ts ${APP_ROOT}/
RUN deno --version && deno info && cd $APP_ROOT && deno cache mod.ts && deno cache --vendor mod.ts
CMD deno run --allow-env --allow-net=discord.com --allow-read --allow-write --config=$APP_ROOT/deno.jsonc --vendor $APP_ROOT/mod.ts
