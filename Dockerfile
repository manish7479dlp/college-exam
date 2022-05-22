# build
FROM node:alpine as frontend
WORKDIR /frontend
COPY ./ui/package.json ./
RUN npm install
ADD ui .
RUN npm run build

# Main 
FROM node:alpine
WORKDIR /app
COPY . .
RUN npm install
COPY --from=frontend /frontend/build /app/ui/build
CMD ["node", "index.js"]
