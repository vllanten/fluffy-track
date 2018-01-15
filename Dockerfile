# Construye una imagen docker a partir de la carpeta dist/

FROM nginx:1.11-alpine
COPY dist /usr/share/nginx/html
