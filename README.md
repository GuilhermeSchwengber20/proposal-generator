# 💼 Proposal Generator

Aplicação full stack para criação e geração de propostas comerciais em PDF.  
Desenvolvida com **Vue 3, TailwindCSS, Node.js, Express e TypeScript**, a ferramenta permite que empresas elaborem orçamentos de forma profissional, visualizem o preview e baixem o PDF final de maneira automatizada.

---

## 🚀 Tecnologias Utilizadas

### **Frontend**
- ⚙️ [Vue 3](https://vuejs.org/)
- 🎨 [TailwindCSS](https://tailwindcss.com/)
- ⚡ [Vite](https://vitejs.dev/)

### **Backend**
- 🟩 [Node.js](https://nodejs.org/)
- 🧩 [Express](https://expressjs.com/)
- ✨ [TypeScript](https://www.typescriptlang.org/)
- 🧾 [PDFKit](https://pdfkit.org/)

---

## 🧱 Estrutura do Projeto

```
proposal-generator/
├── client/ # Frontend (Vue 3 + TailwindCSS)
├── server/ # Backend (Node.js + Express + TypeScript)
└── README.md
```


---

## 🧩 Funcionalidades

✅ Formulário completo para cadastro da proposta  
✅ Máscara de telefone e validações em tempo real  
✅ Preview visual antes da geração do PDF  
✅ Geração de documento fiel ao layout do frontend  
✅ Envio automático dos dados para o backend  
✅ Download e visualização do PDF  
✅ Configuração via variáveis de ambiente (`.env`)

---

## 🧰 Variáveis de Ambiente

No **frontend (`client/`)**, crie um arquivo `.env`:

```bash
VITE_API_BASE_URL=http://localhost:3000/api
```

---

## 💻 Como Rodar Localmente

Clone o repositório

```bash
git clone https://github.com/<seu-usuario>/proposal-generator.git
```

### 🔹 *Backend*

```bash
cd server
npm install
npm run dev
```

Servidor rodando em http://localhost:3000

### 🔹 *Frontend*

```bash
cd client
npm install
npm run dev
```

Acesse em http://localhost:5173


