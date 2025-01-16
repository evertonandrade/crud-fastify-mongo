# Quero Delivery Challenge
Este projeto é uma aplicação Node.js desenvolvida como um desafio técnico. Ele utiliza o framework Fastify para construção da API e o Mongoose para integração com o MongoDB.

## Requisitos
Antes de começar, certifique-se de que você tem as seguintes ferramentas instaladas:
- Docker
- Docker Compose

## Configuração
### Variáveis de Ambiente
O projeto utiliza um arquivo `.env` para configurar variáveis de ambiente. Exemplo:
```
NODE_ENV=
PORT=
HOST=
MONGO_URI=
MONGO_INITDB_ROOT_USERNAME=
MONGO_INITDB_ROOT_PASSWORD=
```
Você pode usar o arquivo de exemplo .env.example como base:
```
cp .env.example .env
```
Edite o arquivo `.env` com as configurações apropriadas.

## Rodando com Docker Compose
Para rodar o projeto utilizando o Docker Compose, siga os passos abaixo:
### 1. Build e Suba os Contêineres
Certifique-se de que o arquivo docker-compose.yml está configurado corretamente. Em seguida, execute:
```
docker-compose up --build
```

Isso irá:
- Buildar a imagem da aplicação Node.js
- Iniciar a aplicação
- Subir uma instância do MongoDB

## Testes
Para executar as requisições manualmente existe o `tests.http`