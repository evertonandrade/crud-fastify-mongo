FROM node:22.13.0-slim

WORKDIR /app

COPY package*.json ./

# Instala as dependências necessárias para bcrypt e outras bibliotecas nativas
RUN apt-get update && apt-get install -y python3 make g++ && \
    npm ci && \
    apt-get remove -y python3 make g++ && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
