FROM oven/bun:latest AS base
WORKDIR /app

RUN apt-get update && apt-get install -y curl

FROM base AS deps

COPY bun.lock package.json ./

COPY packages/shared/package.json ./packages/shared/
COPY packages/db/package.json ./packages/db/
COPY packages/ton-client/package.json ./packages/ton-client/

COPY apps/api/package.json ./apps/api/

RUN bun install

FROM base AS dev

COPY --from=deps /app/node_modules ./node_modules

WORKDIR /app/apps/api

CMD ["bun", "run", "dev"]