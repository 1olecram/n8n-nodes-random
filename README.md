# n8n-nodes-random

[![Node.js](https://img.shields.io/badge/node-%3E%3D20.15-brightgreen)](https://nodejs.org)
[![Docker](https://img.shields.io/badge/docker-compose-blue)](https://docs.docker.com/compose/)
[![n8n](https://img.shields.io/badge/n8n-v1.85.4-orange)](https://n8n.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Um **nó customizado para n8n** que gera números aleatórios.  
Ele pode ser utilizado em workflows do [n8n](https://n8n.io) para gerar valores dinâmicos entre um intervalo definido ou via API externa (random.org).

---

## 🚀 Instalação das dependências

Clone o repositório e instale os pacotes necessários:

```bash
git clone https://github.com/<SEU_USUARIO>/n8n-nodes-random.git
cd n8n-nodes-random
npm install
```

---

## 🐳 Executando com Docker Compose

O projeto está configurado para rodar com **n8n + PostgreSQL** via `docker-compose`.

### Subir os serviços

No diretório raiz (`n8n-compose`), execute:

```bash
docker compose up -d
```

O n8n ficará disponível em:  
👉 [http://localhost:5679](http://localhost:5679)

### Reiniciar os containers

```bash
docker compose restart n8n
```

---

## ⚙️ Configuração do ambiente

As principais variáveis já estão definidas no `docker-compose.yml`:

```yaml
POSTGRES_USER=postgres
POSTGRES_PASSWORD=marBan20+
POSTGRES_DB=n8n
DB_TYPE=postgresdb
DB_POSTGRESDB_HOST=postgres
DB_POSTGRESDB_PORT=5432
DB_POSTGRESDB_SCHEMA=public
GENERIC_TIMEZONE=America/Sao_Paulo
TZ=America/Sao_Paulo
```

🔑 **Importante:**
- O volume `n8n_data` persiste as credenciais e workflows.  
- Nós customizados ficam no diretório `custom_nodes`.  

---

## 🧪 Executando os testes

Atualmente o projeto não possui uma suíte de testes automatizada.  
Para validar se o nó está funcionando corretamente:

1. Compile o projeto:
   ```bash
   npm run build
   ```

2. Copie os arquivos para o diretório de nós customizados:
   ```bash
   rm -rf ../custom_nodes/n8n-nodes-random
   mkdir -p ../custom_nodes/n8n-nodes-random
   cp -r dist package.json ../custom_nodes/n8n-nodes-random/
   ```

3. Reinicie o n8n:
   ```bash
   docker compose restart n8n
   ```

4. Acesse o editor do n8n em [http://localhost:5679](http://localhost:5679) e adicione o nó **Random** em um workflow.

---

## 📂 Estrutura do projeto

```
n8n-nodes-random/
├── src
│   ├── index.ts              # Exporta os nós
│   └── nodes
│       └── Random
│           ├── Random.node.ts # Implementação do nó
│           └── icon           # Pasta de ícones (random.svg)
├── dist                      # Código compilado (gerado pelo build)
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📌 Informações adicionais

- Node.js **>= 20.15** é necessário para build local.  
- O nó foi testado no n8n **v1.85.4**.  
- Para criar novos nós, utilize o [Starter Template](https://docs.n8n.io/integrations/creating-nodes/build/starter-template/).

---

## 👨‍💻 Autor

- **Nome:** Seu Nome  
- **Email:** seu-email@dominio.com  
- **GitHub:** [@seu-usuario](https://github.com/seu-usuario)  

📜 Licença: [MIT](LICENSE)
