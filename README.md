# 🚀 Meu Portfólio de Desenvolvedor SQL & Python

Este é o seu site de portfólio profissional, criado especificamente para quem deseja se destacar em vagas de **SQL**, **Bancos de Dados Relacionais**, **Análise de Dados** e **Python**.

O projeto foi construído em **HTML5**, **CSS3 moderno (Dark Theme)** e **JavaScript nativo**, sem necessidade de instalar dependências complexas (`npm`, `node`, etc.). Funciona direto no navegador e é 100% compatível com o **GitHub Pages**.

---

## 📂 Estrutura dos Arquivos

```text
portfolio-sql/
│
├── index.html     # Estrutura do site (textos, projetos, queries SQL, contatos)
├── styles.css     # Estilos visuais modernos (cores, tema escuro, layout responsivo)
├── script.js      # Interatividade (botão copiar código e alternância de abas)
└── README.md      # Este guia de uso e publicação
```

---

## 💻 Como Visualizar Localmente no seu Computador

Você pode visualizar o site de duas maneiras muito simples:

### Opção 1: Direto no Navegador (Mais rápido)
1. Abra a pasta `C:\Users\caior\.gemini\antigravity\scratch\portfolio-sql` no seu Explorador de Arquivos do Windows.
2. Dê um duplo clique no arquivo `index.html`. Ele abrirá instantaneamente no seu navegador padrão (Chrome, Edge, etc.).

### Opção 2: Servidor Local com Python
Abra o terminal nesta pasta e execute:
```bash
python -m http.server 8000
```
Em seguida, acesse no navegador: `http://localhost:8000`

---

## ✏️ O Que Você Deve Personalizar no `index.html`

Abra o arquivo `index.html` no seu editor de código (como o VS Code) e altere os pontos principais:

1. **Nome e Título:**
   * Altere `Caio` pelo seu nome completo e ajuste a bio inicial na seção `<section class="hero">`.
2. **Links das Redes Sociais:**
   * Substitua os links `https://github.com` e `https://linkedin.com` pelo endereço do seu perfil real.
   * Na seção `#contato`, troque `seuemail@exemplo.com` pelo seu e-mail profissional.
3. **Projetos em Destaque:**
   * O site já vem com **3 projetos modelos de alto impacto** estruturados em três abas:
     1. *🎯 O Desafio de Negócio*: Explica o problema real.
     2. *💻 Query SQL / Código*: A consulta técnica utilizada.
     3. *📊 Insights Gerados*: Tabela de resultados e métricas.
   * Conforme você for desenvolvendo seus próprios projetos, basta substituir as queries e métricas de exemplo pelos seus resultados reais!

---

## 🌐 Como Publicar Gratuitamente no GitHub Pages (Passo a Passo)

Para ter o seu site no ar com um link público (ex: `https://seu-usuario.github.io/portfolio`):

1. **Crie uma conta no GitHub** (se ainda não tiver): [github.com](https://github.com).
2. **Crie um novo Repositório:**
   * Nome sugerido: `portfolio` (ou `seu-usuario.github.io`).
   * Marque a opção **Public** (Público).
3. **Envie os arquivos:**
   * No repositório criado, clique em **Add file** -> **Upload files**.
   * Arraste os arquivos `index.html`, `styles.css` e `script.js`.
   * Clique em **Commit changes**.
4. **Ative o GitHub Pages:**
   * Dentro do repositório, clique na aba **Settings** (Configurações).
   * No menu lateral esquerdo, clique em **Pages**.
   * Em **Build and deployment** -> **Branch**, selecione a branch `main` (ou `master`) e a pasta `/ (root)`.
   * Clique em **Save**.
5. **Pronto!** Em cerca de 1 a 2 minutos, o GitHub irá gerar o link público do seu portfólio.
