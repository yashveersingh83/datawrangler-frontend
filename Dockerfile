# Stage 1: Build the Angular app
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./ 
RUN npm install
COPY . . 

RUN ls -la /app/dist

RUN npm run build --prod

#RUN ls -la /app/dist

# Stage 2: Serve with NGINX
FROM nginx:alpine
COPY --from=build /app/dist/browser /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
