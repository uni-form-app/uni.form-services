# 1. Estágio de dependências
FROM node:18-alpine AS deps
WORKDIR /app

# Copia apenas manifestos para aproveitar cache de install
COPY package.json package-lock.json ./
RUN npm ci --production --ignore-scripts && npm prune --production

# 2. Estágio de build
FROM node:18-alpine AS builder
WORKDIR /app

# Reusa cache de dependências
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Gera o Prisma Client
RUN npx prisma generate

# Executa o build da aplicação (Next.js ou build custom)
RUN npm run build

# 3. Estágio de produção
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copia artefatos mínimos
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

EXPOSE 8080
# Inicia o servidor em produção
CMD ["npm", "run", "start"]
