FROM node:24-alpine
ENV NODE_ENV=production
ENV PORT=3001
WORKDIR /app
COPY app.js .
USER node
EXPOSE 3001
CMD ["node", "app.js"]
