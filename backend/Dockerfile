FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && \
    addgroup -S appgroup && adduser -S appuser -G appgroup
COPY prisma/ ./prisma/
RUN npx prisma generate
COPY dist/ ./dist/
RUN chown -R appuser:appgroup /app
USER appuser
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/children -o /dev/null -w '%{http_code}' | grep -q '200\|401' || exit 1
CMD ["node", "dist/main.js"]
