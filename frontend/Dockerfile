# Use the latest LTS version of Node.js
FROM oven/bun:1 AS build
 
# Set the working directory inside the container
WORKDIR /app
 
# Copy package.json and package-lock.json
COPY bun.lock package.json ./
 
# Install dependencies
RUN bun install
 
# Copy the rest of your application files
COPY . .

RUN bun run build

# Production Stage
FROM nginx:stable-alpine AS production
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]