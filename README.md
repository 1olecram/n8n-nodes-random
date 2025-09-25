# n8n-nodes-random

[![Docker](https://img.shields.io/badge/docker-compose-blue)](https://docs.docker.com/compose/)
[![n8n](https://img.shields.io/badge/n8n-v1.85.4-orange)](https://n8n.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
 
 **Node customizado para n8n** que gera números aleatórios.  
Ele pode ser utilizado em workflows do [n8n](https://n8n.io) para gerar valores dinâmicos entre um intervalo definido ou via API externa (random.org).

---

## 🚀 Instalação das dependências

Clone o repositório e instale os pacotes necessários:

```bash
git clone https://github.com/1olecram/n8n-nodes-random.git
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
👉 [http://localhost:5678](http://localhost:5678)

### Reiniciar os containers

```bash
docker compose restart n8n
```

---

## ⚙️ Configuração do ambiente

As principais variáveis já estão definidas no `docker-compose.yml`:

```yaml
services:
  postgres:
    image: postgres:15
    restart: always
    environment:
      POSTGRES_USER: <USER_NAME>
      POSTGRES_PASSWORD: <USER_PASSWORD>
      POSTGRES_DB: n8n
    ports:
      - "5433:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - n8n_network

  n8n:
    image: docker.n8n.io/n8nio/n8n:1.85.4
    restart: always
    ports:
      - "5678:5678"   
    environment:
      - GENERIC_TIMEZONE=America/Sao_Paulo
      - TZ=America/Sao_Paulo
      - N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS=true
      - N8N_RUNNERS_ENABLED=true
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_DATABASE=n8n
      - DB_POSTGRESDB_HOST=<USER_HOST>
      - DB_POSTGRESDB_PORT=5432
      - DB_POSTGRESDB_USER=<USER_NAME>
      - DB_POSTGRESDB_SCHEMA=public
      - DB_POSTGRESDB_PASSWORD=<USER_PASSWORD>
      - N8N_ENCRYPTION_KEY=your-super-secret-encryption-key-here-change-me
      - N8N_USER_FOLDER=/home/node/.n8n
      - N8N_CUSTOM_EXTENSIONS=/home/node/.n8n/custom
    volumes:
      - n8n_data:/home/node/.n8n
      - ./custom_nodes:/home/node/.n8n/custom
    depends_on:
      - postgres
    networks:
      - n8n_network

volumes:
  postgres_data:
  n8n_data:

networks:
  n8n_network:     
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
	 cp dist/src/nodes/Random/Random.node.js dist/nodes/Random   
	 cp -r dist package.json ../custom_nodes/n8n-nodes-random/
   ```

3. Reinicie o n8n:
   ```bash
   docker compose restart n8n
   ```

4. Acesse o editor do n8n em [http://localhost:5678](http://localhost:5678) e adicione o nó **Random** em um workflow.

---

## 📂 Estrutura do projeto

```
n8n-nodes-random/
├── src
│   ├── index.ts              # Exporta os nodes
│   └── nodes
│       └── Random
│           ├── Random.node.ts # Implementação do nó
│           └── random.svg    # Icone SVG
├── dist                      # Código compilado (gerado pelo build)
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📌 Informações adicionais

- Node.js + TypeScript na versão 22 (LTS) é necessário para build local.  
- O nó foi testado no n8n **v1.85.4**.  
- Foi utilizado o [Starter Template](https://docs.n8n.io/integrations/creating-nodes/build/starter-template/).

---

## 👨‍💻 Autor

- **Nome:** Marcelo Faria Moreira 
- **Email:** marcelocahve059@gmail.com  
- **GitHub:** [1olecram](https://github.com/1olecram)  
