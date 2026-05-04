# Playwright-базис: Node.js, системные зависимости браузера
FROM mcr.microsoft.com/playwright:v1.59.1-jammy

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci && npx playwright install --with-deps chromium

COPY . .

RUN chmod +x scripts/docker-entrypoint.sh

ENV CI=true

CMD ["npm", "run", "test:docker"]
