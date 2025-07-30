# 🏡 Rental API

API RESTful para gerenciamento de aluguéis de imóveis. Desenvolvida em **NestJS** com **Sequelize**, **PostgreSQL**, e estruturada com princípios de **DDD (Domain-Driven Design)**, **Clean Architecture** e **SOLID**.

## 🚀 Objetivo

O objetivo deste projeto é criar uma API robusta e escalável para plataformas de locação de imóveis, permitindo o gerenciamento de contratos, inquilinos e propriedades, com autenticação JWT e divisão clara entre camadas da aplicação.

## 🧰 Tecnologias utilizadas

- Node.js  
- NestJS  
- PostgreSQL  
- Sequelize ORM  
- JWT (autenticação)  
- Class-validator / class-transformer  
- Arquitetura limpa (Clean Architecture)  
- DDD (Domain-Driven Design)  
- Princípios SOLID  

## 📁 Estrutura do Projeto

src  
├── auth                      # Módulo de autenticação (JWT)  
├── application               # Casos de uso  
│   └── use-cases  
├── domain                    # Entidades e interfaces  
├── infra                     # Repositórios e Models Sequelize  
│   └── repositories  
├── presentation              # Controllers e DTOs  
└── main.ts                   # Inicialização da aplicação  

## ✅ Funcionalidades

- Cadastro de propriedades  
- Cadastro de inquilinos  
- Criação de contratos de aluguel  
- Atualização de status do contrato (APROVADO | NEGADO)  
- Autenticação com JWT  
- Aplicação dos princípios de Clean Architecture e DDD  

## 🔐 Autenticação

A API utiliza autenticação JWT. Para acessar rotas protegidas, adicione o token no header:  

Authorization: Bearer <token>

## 🧪 Endpoints disponíveis

### Auth

POST /auth/login – Autentica e retorna token JWT  

### Propriedades

GET /properties – Lista todas as propriedades  
POST /properties – Cria uma nova propriedade  

### Inquilinos

GET /tenants – Lista todos os inquilinos  
POST /tenants – Cria um novo inquilino  

### Contratos de Aluguel

POST /contracts – Cria um novo contrato de aluguel  
PATCH /contracts/:id/approve – Atualiza o status do contrato para APROVADO  
PATCH /contracts/:id/reject – Atualiza o status do contrato para NEGADO  

## 💻 Como rodar localmente

1. Clone o repositório:  
git clone https://github.com/Reistr12/rental-api.git && cd rental-api/api  

2. Instale as dependências:  
npm install  

3. Configure o arquivo `.env`:  
DB_HOST=localhost  
DB_PORT=5432  
DB_NAME=rental_db  
DB_USER=postgres  
DB_PASS=sua_senha  
JWT_SECRET=sua_chave_secreta  

4. Rode as migrations (se necessário):  
npx sequelize-cli db:migrate  

5. Inicie o servidor:  
npm run start:dev  

## 📌 Boas práticas aplicadas

- Separação de camadas: domain, application, infra e presentation  
- DTOs com validações usando `class-validator`  
- Uso de interfaces para dependências (inversão de controle)  
- Repositórios desacoplados da camada de domínio  
- Casos de uso orquestram a lógica de negócio  


## 👨‍💻 Autor

Gabriel Reis  
LinkedIn:https://www.linkedin.com/in/gabriel-reis-13a035350/ https://www.linkedin.com/in/gabrielreisdev  
GitHub: https://github.com/Reistr12  

---

Este projeto faz parte do meu portfólio pessoal como desenvolvedor backend. Fique à vontade para dar feedback ou sugestões!