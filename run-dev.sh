#!/bin/sh

# Instala o NVM
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.35.3/install.sh | bash

# Configura o NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Instala a versão 16 do Node
nvm install 18.15.0

# Configura a versão 16 como padrão
nvm use 18.15.0

# Instala o PM2
yarn add global pm2

yarn install

# Executa o Docker Compose
docker-compose up --b -d