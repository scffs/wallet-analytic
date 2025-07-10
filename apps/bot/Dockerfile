FROM oven/bun:latest AS base
WORKDIR /app

FROM base AS deps

COPY bun.lock package.json ./

COPY packages/shared/package.json ./packages/shared/package.json
COPY packages/db/package.json ./packages/db/package.json

COPY apps/bot/package.json ./apps/bot/package.json

RUN bun install

FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY apps/bot ./apps/bot
COPY packages ./packages

FROM base AS dev

COPY --from=deps /app/node_modules ./node_modules

WORKDIR /app/apps/bot
CMD ["bun", "run", "dev"]
