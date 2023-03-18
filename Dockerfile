# Imagem de Origem
FROM node:18.15.0-alpine

# Diretório de trabalho(é onde a aplicação ficará dentro do container).
WORKDIR /var/www/app

COPY . .

# Inicializa a aplicação
CMD ["yarn", "run", "start"]