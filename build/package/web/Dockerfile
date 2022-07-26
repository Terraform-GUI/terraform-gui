FROM node:alpine as development

# ----- SETUP -----

# Set the current working with go absolute path
WORKDIR /app

# ----- DOWNLOAD PACKAGES -----

# Copy package.json + package-lock.json for install before full copy
COPY web/package*.json ./

# Install all dependencies
RUN npm install

# ----- COPY SOURCE & RUN -----

# Copy the source from the current directory to the container
COPY web/ .

# Expose default Vue port
EXPOSE 3000

# Start the web server
ENTRYPOINT ["npm", "run", "start"]

# ------------------------------------------------------------------------


FROM node:alpine as build

# Set the image source for ghcr.io
LABEL org.opencontainers.image.source = "https://github.com/Terraform-GUI/terraform-gui"

# ----- SETUP -----

# Set the current working with go absolute path
WORKDIR /app

# ----- DOWNLOAD PACKAGES -----

# Copy package.json + package-lock.json for install before full copy
COPY web/package*.json ./

# Install all dependencies
RUN npm install

# ----- COPY SOURCE & RUN -----

# Copy specific folders to avoid large useless images
COPY web/index.html index.html
COPY web/vite.config.js vite.config.js
COPY web/.env.development .env.development
COPY web/.env.production .env.production
COPY web/public/ public/
COPY web/src/ src/

# Expose default Vue port
EXPOSE 3334

# Start the web server
RUN npm run build

# ------------------------------------------------------------------------

FROM nginx:alpine as production

# Copy builded app
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx config
COPY build/package/web/default.conf /etc/nginx/conf.d/default.conf

# Expose nginx default port
EXPOSE 80

# Start service
CMD ["nginx", "-g", "daemon off;"]
