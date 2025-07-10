FROM oven/bun:latest AS base
WORKDIR /app

RUN apt-get update && apt-get install -y curl

FROM base AS deps

COPY bun.lock package.json ./

COPY packages/shared/package.json ./packages/shared/package.json
COPY apps/web/package.json ./apps/web/package.json

RUN bun install

FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY apps/web ./apps/web
COPY packages ./packages

FROM base AS prod

COPY --from=deps /app/node_modules ./node_modules

WORKDIR /app/apps/web
CMD ["bun", "run", "dev"]
