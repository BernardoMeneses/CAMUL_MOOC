# CAMUL - Design & Innovation Website

Este site foi reorganizado para ser mais modular e fácil de manter, seguindo o design do Figma fornecido.

## 📁 Estrutura do Projeto

```
Site/
├── index.html              # Arquivo principal
├── styles/                 # Estilos CSS organizados
│   ├── main.css           # Variáveis CSS e navegação
│   ├── hero.css           # Seção hero/inicial
│   ├── components.css     # Componentes reutilizáveis
│   ├── pages.css          # Páginas sobre e contato
│   ├── projects.css       # Páginas de projetos
│   └── responsive.css     # Media queries e responsivo
├── scripts/               # JavaScript modular
│   └── app.js            # Controlador principal da aplicação
└── assets/               # Recursos (imagens, vídeos)
    └── video-placeholder.html
```

## ✨ Funcionalidades Implementadas

### 🎬 Splash Screen com Animação
- **Ecrã inicial**: Aparece quando o site carrega
- **Animação**: Círculo pulsante com efeito de rotação
- **Botão "Start Journey"**: Leva o utilizador para o site principal
- **Transição suave**: Fade out para revelar o conteúdo

### 🎨 Design Melhorado
- **Cores do Figma**: Paleta de cores atualizada seguindo o design
- **Tipografia**: Hierarquia tipográfica melhorada
- **Animações**: Efeitos de hover e transições suaves
- **Indicador de scroll**: Seta animada na seção hero

### 📱 Totalmente Responsivo
- **Mobile-first**: Design adaptado para dispositivos móveis
- **Breakpoints**: 768px e 480px para diferentes tamanhos
- **Grid flexível**: Layouts que se adaptam ao ecrã

### 🔧 Código Modular
- **CSS separado**: Cada seção tem o seu próprio arquivo
- **JavaScript limpo**: Código organizado em classes
- **HTML semântico**: Estrutura limpa e acessível

## 🚀 Como Usar

1. **Abrir o site**: O splash screen aparece automaticamente
2. **Clique "Start Journey"**: Para entrar no site principal
3. **Navegação**: Use o menu superior para navegar entre páginas
4. **Projetos**: Clique nos cards dos projetos para ver detalhes

## 🎥 Adicionando Vídeo/GIF

Para adicionar um vídeo ou GIF real no splash screen:

### Opção 1: Vídeo MP4/WebM
```html
<!-- Substituir o emoji 🚀 por: -->
<video autoplay muted loop>
    <source src="assets/intro-animation.mp4" type="video/mp4">
    <source src="assets/intro-animation.webm" type="video/webm">
</video>
```

### Opção 2: GIF Animado
```html
<!-- Substituir o emoji 🚀 por: -->
<img src="assets/intro-animation.gif" alt="CAMUL Animation">
```

## 🌊 Adicionando Imagem de Fundo do Mar

Para adicionar uma imagem real de fundo do mar na seção About Us:

1. **Coloque a imagem** na pasta `assets/` (ex: `ocean-background.jpg`)
2. **Edite o CSS** em `styles/components.css`:

```css
.wave-background {
    background-image: url('assets/ocean-background.jpg');
    /* Remova ou comente a linha do gradient: */
    /* background: linear-gradient(135deg, #001122 0%, #003366 30%...); */
}
```

### Recomendações para a imagem:
- **Formato**: JPG ou PNG
- **Resolução**: 1920x1080px ou superior
- **Tema**: Fundo do mar, ondas, água azul
- **Qualidade**: Alta resolução para evitar pixelização

## 🎨 Personalização

### Cores
Edite as variáveis CSS em `styles/main.css`:
```css
:root {
    --color-navy: #0a1628;
    --color-teal: #2d7c8f;
    --color-yellow: #f4d03f;
    /* ... */
}
```

### Animações
Ajuste as animações em `styles/main.css` e `styles/hero.css`.

## 📋 Próximos Passos

1. **Adicionar imagens reais** nos placeholders
2. **Implementar vídeo/GIF** no splash screen  
3. **Adicionar animações** mais complexas se necessário
4. **Otimizar performance** com lazy loading
5. **Adicionar analytics** se necessário

## 👥 Equipa

- **Bernardo Meneses** - Designer & Developer
- **Henrique Pinto** - UI/UX Designer  
- **Afonso Barreira** - Frontend Developer
- **João Pinto** - Project Manager

---

*Desenvolvido para o curso de Concepção e Autoria Multimédia*