FROM node:18-alpine AS builder

WORKDIR /app
ENV COREPACK_DEFAULT_TO_LATEST=0

ARG UUID
ENV UUID=$UUID

RUN corepack enable 

COPY pnpm-lock.yaml ./
COPY package.json ./

RUN pnpm install

COPY . .

RUN pnpm run build

FROM node:18-alpine AS runner

WORKDIR /app
ENV COREPACK_DEFAULT_TO_LATEST=0
RUN corepack enable 

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

ENV NODE_ENV=production

CMD ["pnpm", "start"]
