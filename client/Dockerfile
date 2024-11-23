# Stage 1: Build
FROM node:20 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app
RUN npm run build:prod

# Stage 2: Serve the app with a lightweight web server
FROM nginx:stable-alpine

# Set working directory for Nginx
WORKDIR /usr/share/nginx/html

# Remove the default static assets from Nginx
RUN rm -rf ./*

# Copy the built app from the build stage
COPY --from=build /app/dist .

# Copy custom Nginx configuration if needed
# Uncomment the following line if you have an nginx.conf file:
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
