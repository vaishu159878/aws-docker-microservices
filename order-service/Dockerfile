FROM node:24-alpine
ENV NODE_ENV=production
ENV PORT=3002
WORKDIR /app
COPY app.js .
USER node
EXPOSE 3002
CMD ["node", "app.js"]
