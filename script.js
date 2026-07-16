const desktop = document.getElementById('desktop');
const windowLayer = document.getElementById('windowLayer');
const taskbarApps = document.getElementById('taskbarApps');
const startButton = document.getElementById('startButton');
const startMenu = document.getElementById('startMenu');
const contextMenu = document.getElementById('contextMenu');

let topZ = 100;
let cascade = 0;
const openWindows = new Map();

let obCurrentTrackIdx = 0;
let obIsPlaying = true;
let obIntervalTime = null;
let obSeconds = 102; 

const icons = {
  about: 'fa-solid fa-user',
  projects: 'fa-solid fa-folder-open',
  social: 'fa-solid fa-address-book',
  vscode: 'fa-solid fa-code',
  cmd: 'fa-solid fa-terminal',
  trash: 'fa-solid fa-trash-can'
};

const appIconImages = {
  about: 'assets/vista_pc_1.ico',
  projects: 'assets/explorer.ico',
  social: 'assets/vista_messenger.ico',
  vscode: 'assets/vs-removebg-preview.png',
  cmd: 'assets/cmd-removebg-preview.png',
  trash: 'assets/trash-icon.png'
};

const apps = {
  about: {
    title: 'Sobre Mim',
    status: 'Mateus Rodrigues // Web Developer // Online no Perfil // Gamerscore: 48,500 G',
    bodyClass: 'ob-window-body',
    content: `
      <div class="xbox-myspace-container">
        
        <header class="profile-header-banner">
          <div class="header-left-box">
            <div class="profile-avatar-frame">

              <img src="assets/download20260500235506.png" alt="Mateus Rodrigues" class="profile-avatar-img"></span>
            </div>
            <div class="gamertag-tag">
              <i class="fa-brands fa-xbox"></i> MATEUS_DEV
            </div>
          </div>

          <div class="header-main-info">
            <div class="profile-title-bar">
              <h2>Mateus Rodrigues</h2>
              <span class="badge-tag tag-online">ONLINE</span>
              <span class="badge-tag tag-gamerscore"><i class="fa-solid fa-trophy"></i> 48,500 G</span>
            </div>
            
            <p class="myspace-mood">
              <strong>Mateus: </strong><em>"Se a vida te der limões, não faça limonada. Construa um império e faça a vida se arrepender de ter começado essa história."</em>
            </p>

            <div class="header-meta-grid">
              <div class="meta-item"><i class="fa-solid fa-code"></i> <span>Web Developer & Full-Stack</span></div>
              <div class="meta-item"><i class="fa-solid fa-location-dot"></i> <span>São Paulo, Brasil</span></div>
              <div class="meta-item"><i class="fa-solid fa-gamepad"></i> <span>Reputação: ★★★★★</span></div>
            </div>
          </div>
        </header>

        <nav class="dashboard-blades">
          <button type="button" class="blade-btn active" onclick="obSwitchTab('overview', this)"><i class="fa-solid fa-layer-group"></i> Perfil & Visão Geral</button>
          <button type="button" class="blade-btn" onclick="obSwitchTab('top8', this)"><i class="fa-solid fa-star"></i> Tech Stack (Top 8 Core)</button>
          <button type="button" class="blade-btn" onclick="obSwitchTab('achievements', this)"><i class="fa-solid fa-trophy"></i> Conquistas & Log</button>
          <button type="button" class="blade-btn" onclick="obSwitchTab('comments', this)"><i class="fa-solid fa-comments"></i> Mural de Recados</button>
        </nav>

        <div class="dashboard-content">
          
          <div class="tab-pane active" id="ob-tab-overview">
            <div class="myspace-about-card">
              <h3><i class="fa-solid fa-address-card"></i> Sobre Mim // A Filosofia de Desenvolvimento</h3>
              <p>Olá mundo! Sou o Mateus, desenvolvedor web apaixonado por transformar ideias complexas em interfaces rápidas, intuitivas e limpas. Minha jornada na tecnologia começou cedo: jogando clássicos no Xbox e explorando como a web funcionava por baixo dos panos. Essa vivência prática moldou minha forma de programar hoje: foco em performance, respeito pelas bases da programação, curiosidade para resolver bugs difíceis e um design que tenha identidade de verdade.</p>
            </div>

            <div class="overview-grid">
              <article class="overview-vibe-card card-skate">
                <div class="overview-icon"><i class="fa-solid fa-person-skating"></i></div>
                <div class="overview-text">
                  <h4>Minha filosofia</h4>
                  <p>Se a vida te der limões, não perca tempo reclamando. Use cada um deles como combustível para construir algo tão grande que um dia as pessoas enxerguem apenas o que você criou, e não as dificuldades que enfrentou para chegar até lá.</p>
                  <span class="overview-tag">#Resiliência #Lógica #Persistência</span>
                </div>
              </article>

              <article class="overview-vibe-card card-xbox">
                <div class="overview-icon"><i class="fa-brands fa-xbox"></i></div>
                <div class="overview-text">
                  <h4>Retro Gaming & UX Design</h4>
                  <p>Inspirado na agilidade visual e nos menus mecânicos do Xbox original e 360. Jogos que ensinaram o valor de uma interface imersiva, responsiva e que responda perfeitamente aos comandos.</p>
                  <span class="overview-tag">#Dashboards #UXImersivo #2000s</span>
                </div>
              </article>

              <article class="overview-vibe-card card-hw">
                <div class="overview-icon"><i class="fa-solid fa-computer"></i></div>
                <div class="overview-text">
                  <h4>Setup Modding & Hardware</h4>
                  <p>Fascinado por computadores clássicos, teclados mecânicos, overclocking e entender como o processador, a memória e o código se comunicam. Tecnologia com alma e propósito.</p>
                  <span class="overview-tag">#HardwareRig #CleanCode #CRTEra</span>
                </div>
              </article>

              <article class="overview-vibe-card card-music">
                <div class="overview-icon"><i class="fa-solid fa-guitar"></i></div>
                <div class="overview-text">
                  <h4>Trilha Sonora</h4>
                  <p>Playlist lotada. O fone de ouvido é o meu escudo para manter o foco máximo e entrar em fluxo profundo de desenvolvimento.</p>
                  <span class="overview-tag">#Soundtrack #FocusState #AltRock</span>
                </div>
              </article>
            </div>

            <div class="gamer-summary-panel">
              <div class="gamer-sum-head">
                <i class="fa-solid fa-id-badge"></i> <span>Resumo do Perfil Técnico</span>
              </div>
              <div class="gamer-sum-grid">
                <div class="g-stat"><strong>Especialidade:</strong> Full-Stack Development & Jogos em JS</div>
                <div class="g-stat"><strong>Ambiente Principal:</strong> VS Code + Git / CMD</div>
                <div class="g-stat"><strong>Filosofia:</strong> Clean Code, Componentização & Performance</div>
                <div class="g-stat"><strong>Status Atual:</strong> Criando projetos abertos e colaborando no GitHub</div>
              </div>
            </div>
          </div>

          <div class="tab-pane" id="ob-tab-top8">
            <div class="myspace-section-header">
              <h3><i class="fa-solid fa-microchip"></i> Tech Stack & Arsenal Técnico — O Top 8 do Perfil</h3>
              <p>Aqui estão todas as linguagens, bibliotecas, bancos de dados e ferramentas de desenvolvimento e design 3D do meu fluxo de trabalho (tudo reunido no clássico formato do Top 8 do MySpace):</p>
            </div>

            <div class="stack-icons-banner">
              <img src="https://skillicons.dev/icons?i=html,css,js,php,mysql,cpp,react,nodejs,python,vscode,visualstudio,git,github,arduino,blender&theme=dark" alt="Tech Stack Icons" onerror="this.style.display='none'">
            </div>

            <div class="top8-grid">
              <article class="top8-card">
                <div class="top8-icon-box box-html"><i class="devicon-html5-plain colored"></i></div>
                <div class="top8-details">
                  <h4>HTML5</h4>
                  <span>Core Technology</span>
                  <p>Estruturação semântica, acessibilidade e a espinha dorsal de todas as interfaces web.</p>
                </div>
              </article>

              <article class="top8-card">
                <div class="top8-icon-box box-css"><i class="devicon-css3-plain colored"></i></div>
                <div class="top8-details">
                  <h4>CSS3</h4>
                  <span>Core Technology</span>
                  <p>Design systems, layouts responsivos, animações avançadas e recriação de interfaces nostálgicas.</p>
                </div>
              </article>

              <article class="top8-card">
                <div class="top8-icon-box box-js"><i class="devicon-javascript-plain colored"></i></div>
                <div class="top8-details">
                  <h4>JavaScript</h4>
                  <span>Core Technology</span>
                  <p>O motor por trás de toda a lógica dinâmica, manipulação do DOM e jogos interativos.</p>
                </div>
              </article>

              <article class="top8-card">
                <div class="top8-icon-box box-php"><i class="devicon-php-plain colored"></i></div>
                <div class="top8-details">
                  <h4>PHP</h4>
                  <span>Core Technology</span>
                  <p>Desenvolvimento back-end robusto, lógica de negócios, autenticação e arquitetura MVC/CRUD.</p>
                </div>
              </article>

              <article class="top8-card">
                <div class="top8-icon-box box-mysql"><i class="devicon-mysql-original colored"></i></div>
                <div class="top8-details">
                  <h4>MySQL</h4>
                  <span>Core Technology</span>
                  <p>Modelagem relacional, queries otimizadas, consultas seguras e gestão completa de dados.</p>
                </div>
              </article>

              <article class="top8-card">
                <div class="top8-icon-box box-cpp"><i class="devicon-cplusplus-plain colored"></i></div>
                <div class="top8-details">
                  <h4>C++</h4>
                  <span>Core Technology</span>
                  <p>Algoritmos de alta performance, lógica computacional pura, estruturas de dados e automação.</p>
                </div>
              </article>

              <article class="top8-card">
                <div class="top8-icon-box box-react"><i class="devicon-react-plain colored"></i></div>
                <div class="top8-details">
                  <h4>React JS</h4>
                  <span>Currently Learning</span>
                  <p>Construção de interfaces de usuário reativas, modulares e baseadas em componentes escaláveis.</p>
                </div>
              </article>

              <article class="top8-card">
                <div class="top8-icon-box box-node"><i class="devicon-nodejs-plain colored"></i></div>
                <div class="top8-details">
                  <h4>Node.js</h4>
                  <span>Currently Learning</span>
                  <p>Execução de JavaScript no lado do servidor para APIs rápidas e assíncronas.</p>
                </div>
              </article>

              <article class="top8-card">
                <div class="top8-icon-box box-py"><i class="devicon-python-plain colored"></i></div>
                <div class="top8-details">
                  <h4>Python</h4>
                  <span>Currently Learning</span>
                  <p>Automação de scripts, processamento de dados e versatilidade algorítmica.</p>
                </div>
              </article>

              <article class="top8-card">
                <div class="top8-icon-box box-code"><i class="devicon-vscode-plain colored"></i></div>
                <div class="top8-details">
                  <h4>VS Code</h4>
                  <span>Development Tool</span>
                  <p>Meu ambiente de desenvolvimento principal, configurado para máxima agilidade e clean code.</p>
                </div>
              </article>

              <article class="top8-card">
                <div class="top8-icon-box box-vs"><i class="devicon-visualstudio-plain colored"></i></div>
                <div class="top8-details">
                  <h4>Visual Studio</h4>
                  <span>Development Tool</span>
                  <p>IDE para compilação, depuração avançada em C++ e desenvolvimento de sistemas.</p>
                </div>
              </article>

              <article class="top8-card">
                <div class="top8-icon-box box-git"><i class="devicon-git-plain colored"></i></div>
                <div class="top8-details">
                  <h4>Git</h4>
                  <span>Development Tool</span>
                  <p>Controle de versão distribuído para rastreamento preciso do histórico de cada projeto.</p>
                </div>
              </article>

              <article class="top8-card">
                <div class="top8-icon-box box-gh"><i class="devicon-github-original tech-i"></i></div>
                <div class="top8-details">
                  <h4>GitHub</h4>
                  <span>Development Tool</span>
                  <p>Hospedagem de repositórios, colaboração em código-fonte e portfólio oficial de projetos abertos.</p>
                </div>
              </article>

              <article class="top8-card">
                <div class="top8-icon-box box-ard"><i class="devicon-arduino-plain colored"></i></div>
                <div class="top8-details">
                  <h4>Arduino</h4>
                  <span>Development Tool</span>
                  <p>Integração entre software e hardware, prototipagem eletrônica e lógica em microcontroladores.</p>
                </div>
              </article>

              <article class="top8-card">
                <div class="top8-icon-box box-comp">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/composer/composer-original.svg" width="32" height="32" alt="Composer">
                </div>
                <div class="top8-details">
                  <h4>Composer</h4>
                  <span>Development Tool</span>
                  <p>Gerenciador oficial de dependências para PHP, organizando bibliotecas e pacotes com eficiência.</p>
                </div>
              </article>

              <article class="top8-card">
                <div class="top8-icon-box box-blender"><i class="devicon-blender-original colored"></i></div>
                <div class="top8-details">
                  <h4>Blender 3D</h4>
                  <span>Design & 3D</span>
                  <p>Modelagem tridimensional, renderização, texturização e criação de cenários digitais.</p>
                </div>
              </article>

              <article class="top8-card">
                <div class="top8-icon-box box-ink">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/inkscape/inkscape-original.svg" width="32" height="32" alt="Inkscape">
                </div>
                <div class="top8-details">
                  <h4>Inkscape</h4>
                  <span>Design & 3D</span>
                  <p>Criação e edição de vetores, ícones, ilustrações SVG e design de ativos visuais.</p>
                </div>
              </article>
            </div>
          </div>

          <div class="tab-pane" id="ob-tab-achievements">
            <div class="myspace-section-header">
              <h3><i class="fa-solid fa-trophy"></i> Conquistas Desbloqueadas // Log de Evolução</h3>
              <p>Marcos importantes na carreira técnica de desenvolvimento e criação de sistemas:</p>
            </div>

            <div class="achievements-list">
              <div class="achievement-card unlocked">
                <div class="achiev-icon"><i class="fa-solid fa-trophy"></i></div>
                <div class="achiev-text">
                  <div class="achiev-title-row">
                    <h4>Desmontando a Matriz — Os Primeiros Passos no Código</h4>
                    <span class="score-badge">+50 G</span>
                  </div>
                  <p>Mergulho inicial nos estudos intensivos de programação. Construção de páginas estruturadas com HTML5 e CSS3, e introdução a algoritmos e lógica com JavaScript e C++.</p>
                  <span class="achiev-date"><i class="fa-regular fa-calendar"></i> Desbloqueado</span>
                </div>
              </div>

              <div class="achievement-card unlocked">
                <div class="achiev-icon"><i class="fa-solid fa-database"></i></div>
                <div class="achiev-text">
                  <div class="achiev-title-row">
                    <h4>Sistemas Reais — Autenticação & Bancos Relacionais</h4>
                    <span class="score-badge">+150 G</span>
                  </div>
                  <p>Desenvolvimento do primeiro sistema completo de cadastro escolar em PHP e MySQL, aplicando arquitetura CRUD, segurança e gestão. No front-end, criação de um jogo oficial de Xadrez interativo em JS puro.</p>
                  <span class="achiev-date"><i class="fa-regular fa-calendar"></i> Desbloqueado</span>
                </div>
              </div>

              <div class="achievement-card unlocked highlight-achievement">
                <div class="achiev-icon"><i class="fa-solid fa-bolt"></i></div>
                <div class="achiev-text">
                  <div class="achiev-title-row">
                    <h4>Arquiteto de OS — Portfólio Interativo & Full-Stack Mastery</h4>
                    <span class="score-badge">+300 G</span>
                  </div>
                  <p>Criação desta interface completa recriando o sistema operacional Windows Vista/XP com dashboard Xbox e player MySpace. Código otimizado, sem dependências pesadas, alta responsividade e arquitetura limpa.</p>
                  <span class="achiev-date"><i class="fa-regular fa-calendar"></i> Desbloqueado</span>
                </div>
              </div>

              <div class="achievement-card in-progress">
                <div class="achiev-icon"><i class="fa-solid fa-lock"></i></div>
                <div class="achiev-text">
                  <div class="achiev-title-row">
                    <h4>Colaborador de Alto Impacto — Próxima Missão</h4>
                    <span class="score-badge">+500 G</span>
                  </div>
                  <p>Pronto para atuar em equipes técnicas de excelência, colaborar em sistemas escaláveis e entregar soluções de software que gerem impacto real e duradouro no mercado.</p>
                  <span class="achiev-date status-pending"><i class="fa-solid fa-spinner fa-spin"></i> Em Progresso // Objetivo Atual</span>
                </div>
              </div>
            </div>
          </div>

          <div class="tab-pane" id="ob-tab-comments">
            <div class="myspace-section-header">
              <h3><i class="fa-solid fa-comments"></i> Mural de Recados do Perfil // Profile Scrapbook</h3>
              <p>Deixe um comentário no mural ou confira o que os amigos e a comunidade tech estão comentando:</p>
            </div>

            <form class="myspace-comment-form" onsubmit="return obAddComment(event)">
              <div class="form-inputs">
                <input type="text" id="obCommentName" placeholder="Seu Nome / Gamertag..." required maxlength="30" aria-label="Seu nome">
                <input type="text" id="obCommentAvatar" placeholder="URL ou arquivo de foto de perfil (opcional)..." maxlength="300" aria-label="Foto de perfil">
                <input type="text" id="obCommentText" placeholder="Escreva um recado no mural do Mateus..." required maxlength="160" aria-label="Seu comentário">
                <button type="submit" class="btn-post-comment"><i class="fa-solid fa-paper-plane"></i> Postar no Mural</button>
              </div>
            </form>

            <div class="myspace-comments-list" id="obCommentsList">
              
              <article class="myspace-comment-item">
                <div class="comment-author-img">

                  <img src="assets/download.jpg" alt="Dev_Alex2004" class="comment-avatar-img">
                  <div class="avatar-circle dev-alex" style="display:none"><i class="fa-solid fa-user-astronaut"></i></div>
                  <span class="author-name">Dev_Alex2004</span>
                </div>
                <div class="comment-content">
                  <div class="comment-meta">Postado hoje às 14:22 <span>• Online</span></div>
                  <p>Uau, eu acho que você é um dos devs mais criativos de todos</p>
                </div>
              </article>

              <article class="myspace-comment-item">
                <div class="comment-author-img">

                  <img src="assets/images.jpg" alt="SkateAndCode" class="comment-avatar-img">
                  <div class="avatar-circle dev-skate" style="display:none"><i class="fa-solid fa-person-skating"></i></div>
                  <span class="author-name">SkateAndCode</span>
                </div>
                <div class="comment-content">
                  <div class="comment-meta">Postado ontem às 21:05 <span> Online</span></div>
                  <p>Aquele jogo de Xadrez em JS está rodando lisinho! já virei até top 1 global</p>
                </div>
              </article>

              <article class="myspace-comment-item">
                <div class="comment-author-img">

                  <img src="assets/xbox.jpg" alt="RetroSetup_BR" class="comment-avatar-img">
                  <div class="avatar-circle dev-retro" style="display:none"><i class="fa-brands fa-xbox"></i></div>
                  <span class="author-name">RetroSetup_BR</span>
                </div>
                <div class="comment-content">
                  <div class="comment-meta">Postado há 3 dias <span>• Offline</span></div>
                  <p>Gamerscore de respeito e programando pesado em C++ e JavaScript. Setup nota 10, parabéns pelos projetos no GitHub!</p>
                </div>
              </article>

            </div>
          </div>

        </div>
      </div>
    `
  },
  projects: {
    title: 'Projetos — Windows Explorer',
    status: '4 projetos selecionados',
    content: `
      <div class="explorer-toolbar">
        <button type="button"><i class="fa-solid fa-arrow-left"></i> Voltar</button>
        <button type="button"><i class="fa-solid fa-layer-group"></i> Organizar</button>
        <button type="button"><i class="fa-solid fa-list"></i> Exibições</button>
      </div>
      <div class="project-list">
        ${project('Sistema de Escola em PHP', 'Meu primeiro sistema completo de cadastro, autenticação e gestão de alunos.', 'https://github.com/mateusrmelo-collab')}
        ${project('Chess // Jogo de Xadrez JS', 'Recriação interativa de Xadrez baseado nas regras oficiais e validação de movimentos.', 'https://mateusrmelo-collab.github.io/Chess/')}
        ${project('MateusXP (Versão 1)', 'Recriação nostálgica do Windows XP direto no navegador com menus e janelas operacionais.', 'https://mateusrmelo-collab.github.io/MateusxpV1')}
        ${project('Créditos & Trilha Sonora', 'Experiência audiovisual com música de fundo e rolagem de créditos interativa.', 'https://mateusrmelo-collab.github.io/Tentativa-de-creditos')}
      </div>`
  },
  social: {
    title: 'Redes Sociais & Contato',
    status: '3 conexões ativas',
    content: `
      <div class="social-grid">
        ${social('fa-github', 'GitHub', 'Acesse meus repositórios, códigos-fonte e estudos diários.', 'https://github.com/mateusrmelo-collab')}
        ${social('fa-instagram', 'Instagram', 'Bastidores do dia a dia, tecnologia, setups e vivências.', 'https://www.instagram.com/im_still_alive63/')}
        ${social('fa-linkedin', 'LinkedIn', 'Conexões profissionais, currículo completo e experiências técnicas.', '#')}
      </div>`
  },
  vscode: {
    title: 'Visual Studio Code — Portfólio Workspace',
    status: 'Ln 1, Col 1    UTF-8    HTML    Workspace Técnico',
    bodyClass: 'vscode-body',
    content: `
      <aside class="vscode-activity">
        <i class="fa-regular fa-file" title="Explorer"></i>
        <i class="fa-solid fa-magnifying-glass" title="Pesquisar"></i>
        <i class="fa-solid fa-code-branch" title="Controle de Código-Fonte"></i>
        <i class="fa-solid fa-bug" title="Executar e Depurar"></i>
        <i class="fa-solid fa-cubes" title="Extensões"></i>
      </aside>

      <aside class="vscode-explorer">
        <strong>EXPLORER</strong>
        <div class="explorer-folder">▾ PORTFOLIO_WORKSPACE</div>
        <div class="vscode-file active" data-file="html"><i class="devicon-html5-plain colored"></i> index.html</div>
        <div class="vscode-file" data-file="css"><i class="devicon-css3-plain colored"></i> style.css</div>
        <div class="vscode-file" data-file="js"><i class="devicon-javascript-plain colored"></i> script.js</div>
      </aside>

      <section class="vscode-editor">
        <div class="vscode-tabs">
          <div class="vscode-tab active" data-file="html"><i class="devicon-html5-plain colored"></i> index.html</div>
          <div class="vscode-tab" data-file="css"><i class="devicon-css3-plain colored"></i> style.css</div>
          <div class="vscode-tab" data-file="js"><i class="devicon-javascript-plain colored"></i> script.js</div>
        </div>
        <pre class="vscode-code" data-editor><span class="code-blue">&lt;!DOCTYPE html&gt;</span>
<span class="code-blue">&lt;html</span> lang=<span class="code-orange">"pt-BR"</span><span class="code-blue">&gt;</span>
<span class="code-blue">&lt;head&gt;</span>
  <span class="code-blue">&lt;meta</span> charset=<span class="code-orange">"UTF-8"</span><span class="code-blue">&gt;</span>
  <span class="code-blue">&lt;title&gt;</span>Mateus Rodrigues // Portfólio<span class="code-blue">&lt;/title&gt;</span>
  <span class="code-blue">&lt;link</span> rel=<span class="code-orange">"stylesheet"</span> href=<span class="code-orange">"style.css"</span><span class="code-blue">&gt;</span>
<span class="code-blue">&lt;/head&gt;</span>
<span class="code-blue">&lt;body&gt;</span>
  <span class="code-blue">&lt;main</span> class=<span class="code-orange">"desktop-os"</span><span class="code-blue">&gt;</span>
    <span class="code-blue">&lt;h1&gt;</span>Mateus Rodrigues<span class="code-blue">&lt;/h1&gt;</span>
    <span class="code-blue">&lt;p&gt;</span>
      Desenvolvedor Web apaixonado por criar interfaces rápidas,
      com arquitetura limpa e alta identidade visual.
    <span class="code-blue">&lt;/p&gt;</span>
  <span class="code-blue">&lt;/main&gt;</span>
<span class="code-blue">&lt;/body&gt;</span>
<span class="code-blue">&lt;/html&gt;</span></pre>
      </section>
    `
  },
  cmd: {
    title: 'Prompt de Comando',
    status: 'Digite help para ver os comandos ou xbox para surpresa',
    bodyClass: 'cmd-body',
    content: `<div class="cmd-output">Microsoft Windows [versão 6.0.6002]
Copyright (c) Microsoft Corporation. Todos os direitos reservados.

Digite <b>help</b> para listar os comandos. Digite <b>xbox</b> para abrir o console verde.
</div><div class="cmd-line"><span class="cmd-prompt">C:\\Users\\Mateus&gt;</span><input class="cmd-input" aria-label="Comando" autocomplete="off" spellcheck="false"></div>`
  },
  trash: {
    title: 'Lixeira',
    status: '0 itens',
    content: `<div class="explorer-toolbar"><button type="button" data-empty-trash><i class="fa-regular fa-trash-can"></i> Esvaziar Lixeira</button><button type="button"><i class="fa-solid fa-layer-group"></i> Organizar</button></div><div class="trash-empty"><div><i class="fa-regular fa-trash-can"></i><p>A Lixeira está vazia.</p></div></div>`
  }
};

const vsCodeFiles = {
  html: {
    status: 'Ln 1, Col 1    UTF-8    HTML    Workspace Técnico',
    code: `<span class="code-blue">&lt;!DOCTYPE html&gt;</span>
<span class="code-blue">&lt;html</span> lang=<span class="code-orange">"pt-BR"</span><span class="code-blue">&gt;</span>
<span class="code-blue">&lt;head&gt;</span>
  <span class="code-blue">&lt;meta</span> charset=<span class="code-orange">"UTF-8"</span><span class="code-blue">&gt;</span>
  <span class="code-blue">&lt;title&gt;</span>Mateus Rodrigues // Web Developer<span class="code-blue">&lt;/title&gt;</span>
<span class="code-blue">&lt;/head&gt;</span>
<span class="code-blue">&lt;body&gt;</span>
  <span class="code-blue">&lt;header</span> class=<span class="code-orange">"hero-banner"</span><span class="code-blue">&gt;</span>
    <span class="code-blue">&lt;h1&gt;</span>Mateus Rodrigues<span class="code-blue">&lt;/h1&gt;</span>
    <span class="code-blue">&lt;span</span> class=<span class="code-orange">"badge"</span><span class="code-blue">&gt;</span>FULL STACK DEVELOPER<span class="code-blue">&lt;/span&gt;</span>
  <span class="code-blue">&lt;/header&gt;</span>
<span class="code-blue">&lt;/body&gt;</span>
<span class="code-blue">&lt;/html&gt;</span>`
  },
  css: {
    status: 'Ln 42, Col 12    UTF-8    CSS    Interface Styles',
    code: `<span class="code-orange">.xbox-myspace-container</span> {
  <span class="code-blue">background</span>: <span class="code-yellow">#11161d</span>;
  <span class="code-blue">color</span>: <span class="code-yellow">#e2f1ff</span>;
  <span class="code-blue">font-family</span>: <span class="code-yellow">'Segoe UI', Tahoma, sans-serif</span>;
  <span class="code-blue">border-top</span>: <span class="code-yellow">3px solid #107c10</span>;
}

<span class="code-orange">.myspace-music-player</span> {
  <span class="code-blue">background</span>: <span class="code-yellow">linear-gradient(180deg, #1f2a3a, #131a24)</span>;
  <span class="code-blue">border-left</span>: <span class="code-yellow">3px solid #39ff14</span>;
  <span class="code-blue">padding</span>: <span class="code-yellow">14px</span>;
}`
  },
  js: {
    status: 'Ln 18, Col 5    UTF-8    JavaScript    Winamp & Media Logic',
    code: `<span class="code-blue">function</span> <span class="code-yellow">obPlayerAction</span>(<span class="code-orange">action</span>) {
  <span class="code-blue">if</span> (action === <span class="code-orange">'toggle'</span>) {
    obIsPlaying = !obIsPlaying;
    <span class="code-blue">const</span> visualizer = document.getElementById(<span class="code-orange">'obVisualizer'</span>);
    visualizer.classList.toggle(<span class="code-orange">'active'</span>, obIsPlaying);
  } <span class="code-blue">else if</span> (action === <span class="code-orange">'next'</span>) {
    obCurrentTrackIdx = (obCurrentTrackIdx + <span class="code-yellow">1</span>) % obTracks.length;
    updateWinampDisplay();
  }
}`
  }
};

function project(title, description, url) {
  return `<article class="project-card"><h3>${title}</h3><p>${description}</p><a class="project-btn" href="${url}" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-up-right-from-square"></i>Abrir Projeto</a></article>`;
}

function social(icon, title, description, url) {
  return `<article class="social-card"><h3><i class="fa-brands ${icon}"></i> ${title}</h3><p>${description}</p><a class="social-button" href="${url}" ${url === '#' ? '' : 'target="_blank" rel="noopener noreferrer"'}><i class="fa-solid fa-link"></i> Abrir ${title}</a></article>`;
}

function obSwitchTab(tabId, btnEl) {
  const win = btnEl.closest('.vista-window');
  if (!win) return;
  win.querySelectorAll('.blade-btn').forEach(b => b.classList.remove('active'));
  win.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
  btnEl.classList.add('active');
  const targetPane = win.querySelector(`#ob-tab-${tabId}`);
  if (targetPane) targetPane.classList.add('active');
}

function obAddComment(event) {
  event.preventDefault();
  const nameInput = document.getElementById('obCommentName');
  const avatarInput = document.getElementById('obCommentAvatar');
  const textInput = document.getElementById('obCommentText');
  const listEl = document.getElementById('obCommentsList');
  if (!nameInput || !textInput || !listEl) return false;

  const name = nameInput.value.trim();
  const avatarUrl = avatarInput ? avatarInput.value.trim() : '';
  const text = textInput.value.trim();
  if (!name || !text) return false;

  const now = new Date();
  const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  const article = document.createElement('article');
  article.className = 'myspace-comment-item new-post';
  
  let avatarHtml = `<div class="avatar-circle dev-new"><i class="fa-solid fa-user-check"></i></div>`;
  if (avatarUrl) {
    avatarHtml = `
      <img src="${escapeHtml(avatarUrl)}" alt="${escapeHtml(name)}" class="comment-avatar-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='grid'">
      <div class="avatar-circle dev-new" style="display:none"><i class="fa-solid fa-user-check"></i></div>
    `;
  }

  article.innerHTML = `
    <div class="comment-author-img">
      ${avatarHtml}
      <span class="author-name">${escapeHtml(name)}</span>
    </div>
    <div class="comment-content">
      <div class="comment-meta">Postado agora às ${timeStr} <span>• Online</span></div>
      <p>${escapeHtml(text)}</p>
    </div>
  `;

  listEl.insertBefore(article, listEl.firstChild);
  nameInput.value = '';
  if (avatarInput) avatarInput.value = '';
  textInput.value = '';
  return false;
}

function obPlayerAction(action) {
  if (action === 'toggle') {
    obIsPlaying = !obIsPlaying;
    const btn = document.getElementById('obPlayBtn');
    const vis = document.getElementById('obVisualizer');
    if (btn) btn.innerHTML = obIsPlaying ? '<i class="fa-solid fa-pause"></i>' : '<i class="fa-solid fa-play"></i>';
    if (vis) vis.classList.toggle('active', obIsPlaying);
  } else if (action === 'next') {
    obCurrentTrackIdx = (obCurrentTrackIdx + 1) % obTracks.length;
    obSeconds = 0;
    obUpdatePlayerUI();
  } else if (action === 'prev') {
    obCurrentTrackIdx = (obCurrentTrackIdx - 1 + obTracks.length) % obTracks.length;
    obSeconds = 0;
    obUpdatePlayerUI();
  } else if (action === 'shuffle') {
    obCurrentTrackIdx = Math.floor(Math.random() * obTracks.length);
    obSeconds = 0;
    obUpdatePlayerUI();
  }
}

function obPlayerSelectTrack(idx) {
  obCurrentTrackIdx = idx;
  obSeconds = 0;
  obIsPlaying = true;
  obUpdatePlayerUI();
}

function obUpdatePlayerUI() {
  const track = obTracks[obCurrentTrackIdx];
  const nameEl = document.getElementById('obTrackName');
  const specEl = document.getElementById('obSpecText');
  const selectEl = document.getElementById('obPlaylistSelect');
  const btn = document.getElementById('obPlayBtn');
  const vis = document.getElementById('obVisualizer');

  if (nameEl) nameEl.textContent = track.title;
  if (specEl) specEl.textContent = track.spec;
  if (selectEl) selectEl.value = obCurrentTrackIdx;
  if (btn) btn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  if (vis && !vis.classList.contains('active')) vis.classList.add('active');
}

function openApp(appId) {
  const existing = openWindows.get(appId);
  if (existing) {
    existing.window.classList.remove('minimized', 'closed');
    existing.task.classList.remove('minimized');
    focusWindow(existing.window);
    if (appId === 'cmd') setTimeout(() => existing.window.querySelector('.cmd-input')?.focus(), 0);
    startMenu.classList.remove('active');
    return;
  }

  const app = apps[appId];
  if (!app) return;
  const win = document.createElement('article');
  win.className = 'vista-window';
  win.dataset.app = appId;
  
  if (appId === 'about') {
    win.classList.add('window-about-ob');
  }

  if (!isTouchLayout()) {
    const maxLeft = Math.max(10, desktop.clientWidth - (appId === 'about' ? 760 : 610));
    const maxTop = Math.max(10, desktop.clientHeight - (appId === 'about' ? 620 : 450));
    win.style.left = `${Math.min(130 + (cascade % 6) * 32, maxLeft)}px`;
    win.style.top = `${Math.min(25 + (cascade % 6) * 28, maxTop)}px`;
    cascade++;
  }

  win.innerHTML = `
    <header class="window-titlebar">
      <div class="window-title">
        <img src="${appIconImages[appId] || ''}" alt="" class="titlebar-app-icon" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline-block'">
        <i class="${icons[appId]}" style="display:none"></i>
        <span>${app.title}</span>
      </div>
      <div class="window-controls">
        <button class="window-control minimize" type="button" aria-label="Minimizar">—</button>
        <button class="window-control maximize" type="button" aria-label="Maximizar">□</button>
        <button class="window-control close" type="button" aria-label="Fechar">✕</button>
      </div>
    </header>
    <div class="window-body ${app.bodyClass || ''}">${app.content}</div>
    <footer class="window-statusbar">${app.status}</footer>`;
  
  windowLayer.appendChild(win);

  const task = document.createElement('button');
  task.className = 'task-item';
  task.type = 'button';
  task.innerHTML = `
    <img src="${appIconImages[appId] || ''}" alt="" class="taskbar-app-icon" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline-block'">
    <i class="${icons[appId]}" style="display:none"></i>
    <span>${app.title}</span>
  `;
  taskbarApps.appendChild(task);
  openWindows.set(appId, { window: win, task });

  bindWindow(win, task, appId);
  focusWindow(win);
  if (appId === 'cmd') initializeCmd(win);
  if (appId === 'vscode') initializeVsCode(win);
  if (appId === 'trash') initializeTrash(win);
  if (appId === "projects") {unlockAchievement("explorer");}
  if (appId === "social") {unlockAchievement("social");}
  if(appId === "about"){unlockAchievement("about");}
  startMenu.classList.remove('active');
}

function bindWindow(win, task, appId) {
  const titlebar = win.querySelector('.window-titlebar');
  const minimize = win.querySelector('.minimize');
  const maximize = win.querySelector('.maximize');
  const close = win.querySelector('.close');

  win.addEventListener('pointerdown', () => focusWindow(win));
  titlebar.addEventListener('dblclick', e => { if (!e.target.closest('.window-controls')) toggleMaximize(win); });
  minimize.addEventListener('click', () => minimizeWindow(win, task));
  maximize.addEventListener('click', () => toggleMaximize(win));
  close.addEventListener('click', () => closeWindow(appId));
  task.addEventListener('click', () => {
    if (win.classList.contains('minimized')) {
      win.classList.remove('minimized'); task.classList.remove('minimized'); focusWindow(win);
    } else if (win.classList.contains('focused')) {
      minimizeWindow(win, task);
    } else focusWindow(win);
  });

  titlebar.addEventListener('pointerdown', e => {
    if (e.button !== 0 || e.target.closest('.window-controls') || win.classList.contains('maximized') || isTouchLayout()) return;
    e.preventDefault();
    focusWindow(win);
    const rect = win.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    titlebar.setPointerCapture(e.pointerId);
    const move = event => {
      const maxX = desktop.clientWidth - Math.min(win.offsetWidth, 120);
      const maxY = desktop.clientHeight - 38;
      win.style.left = `${Math.max(-win.offsetWidth + 120, Math.min(event.clientX - offsetX, maxX))}px`;
      win.style.top = `${Math.max(0, Math.min(event.clientY - offsetY, maxY))}px`;
    };
    const up = () => {
      titlebar.removeEventListener('pointermove', move);
      titlebar.removeEventListener('pointerup', up);
    };
    titlebar.addEventListener('pointermove', move);
    titlebar.addEventListener('pointerup', up);
  });
}

function focusWindow(win) {
  topZ++;
  document.querySelectorAll('.vista-window').forEach(w => w.classList.remove('focused'));
  document.querySelectorAll('.task-item').forEach(t => t.classList.remove('active'));
  win.classList.add('focused');
  win.style.zIndex = topZ;
  openWindows.get(win.dataset.app)?.task.classList.add('active');
}

function minimizeWindow(win, task) {
  win.classList.add('minimized');
  win.classList.remove('focused');
  task.classList.add('minimized');
  task.classList.remove('active');
}

function toggleMaximize(win) {
  if (!win.classList.contains('maximized')) {
    win.dataset.restore = JSON.stringify({ left: win.style.left, top: win.style.top, width: win.style.width, height: win.style.height });
    win.classList.add('maximized');
  } else {
    win.classList.remove('maximized');
    const old = JSON.parse(win.dataset.restore || '{}');
    Object.assign(win.style, old);
  }
  focusWindow(win);
}

function closeWindow(appId) {
  const item = openWindows.get(appId);
  if (!item) return;
  item.window.remove();
  item.task.remove();
  openWindows.delete(appId);
}

function initializeCmd(win) {
  const input = win.querySelector('.cmd-input');
  const output = win.querySelector('.cmd-output');
  const body = win.querySelector('.cmd-body');
  win.addEventListener('click', () => input.focus());
  input.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    const raw = input.value.trim();
    const command = raw.toLowerCase();
    output.innerHTML += `\nC:\\Users\\Mateus&gt;${escapeHtml(raw)}\n`;
    const commands = {
      help: 'Comandos disponíveis: help, about, projects, social, vscode, xbox, myspace, clear, date, whoami, echo',
      about: 'Abrindo perfil Sobre Mim...',
      projects: 'Abrindo Projetos...',
      social: 'Abrindo Redes Sociais...',
      vscode: 'Abrindo Visual Studio Code...',
      xbox: 'XBOX LIVE CONNECTED! Gamertag: MATEUS_DEV | Gamerscore: 48,500 G | Blades Dashboard Ativo!',
      myspace: 'MYSPACE PROFILE ONLINE! Top 8 Friends carregado, música do perfil tocando no volume máximo.',
      date: new Date().toLocaleString('pt-BR'),
      whoami: 'mateus-rodrigues\\web-developer // online'
    };
    if (command === 'clear' || command === 'cls') {
      output.innerHTML = '';
    }
    else if (command.startsWith('echo ')) {
      output.textContent += raw.slice(5) + '\n';
    }
    else if (command === 'sudo rm -rf /') {
      output.textContent +=
      `rm: removendo '/'...
ERRO CRÍTICO!
      
Boa tentativa`;
      unlockAchievement("secret");
    }

    else if (commands[command]) {
      output.textContent += commands[command] + '\n';

      if (['about', 'projects', 'social', 'vscode'].includes(command)) {
        openApp(command);
      }
    }

    else if (command) {
      output.textContent += `'${raw}' não é reconhecido como um comando interno ou externo.\n`;
    }

    input.value = '';
    body.scrollTop = body.scrollHeight;
  });
  setTimeout(() => input.focus(), 0);
  unlockAchievement("hacker");
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function initializeVsCode(win) {
  const editor = win.querySelector('[data-editor]');
  const updateTab = (fileKey) => {
    const data = vsCodeFiles[fileKey];
    if (!data) return;
    editor.innerHTML = data.code;
    win.querySelectorAll('.vscode-file, .vscode-tab').forEach(el => {
      if (el.dataset.file === fileKey) el.classList.add('active');
      else el.classList.remove('active');
    });
    const statusbar = win.querySelector('.window-statusbar');
    if (statusbar) statusbar.textContent = data.status;
  };
  win.querySelectorAll('[data-file]').forEach(fileEl => {
    fileEl.addEventListener('click', () => updateTab(fileEl.dataset.file));
  });
  unlockAchievement("vscode");
}

function initializeTrash(win) {
  const emptyBtn = win.querySelector('[data-empty-trash]');
  if (emptyBtn) {
    emptyBtn.addEventListener('click', () => {
      alert('A Lixeira já está limpa e otimizada!');
    });
  }
  unlockAchievement("trash");
}

const isTouchLayout = () => window.matchMedia('(pointer: coarse), (max-width: 700px)').matches;

document.querySelectorAll('.icon-item').forEach(icon => {
  icon.addEventListener('click', e => {
    document.querySelectorAll('.icon-item').forEach(i => i.classList.remove('selected'));
    e.currentTarget.classList.add('selected');
    if (isTouchLayout()) openApp(icon.dataset.app);
  });
  icon.addEventListener('dblclick', () => {
    if (!isTouchLayout()) openApp(icon.dataset.app);
  });
});

document.querySelectorAll('[data-app]').forEach(item => {
  if (!item.classList.contains('icon-item')) {
    item.addEventListener('click', () => openApp(item.dataset.app));
  }
});

startButton.addEventListener('click', e => {
  e.stopPropagation();
  startMenu.classList.toggle('active');
  contextMenu.classList.remove('active');
});

startMenu.addEventListener('click', e => e.stopPropagation());

document.addEventListener('click', e => {
  if (!e.target.closest('.icon-item')) {
    document.querySelectorAll('.icon-item').forEach(i => i.classList.remove('selected'));
  }
  if (!e.target.closest('.start-menu') && !e.target.closest('.start-button')) {
    startMenu.classList.remove('active');
  }
  contextMenu.classList.remove('active');
});

desktop.addEventListener('contextmenu', e => {
  if (e.target.closest('.vista-window')) return;
  e.preventDefault();
  contextMenu.classList.add('active');
  const x = Math.min(e.clientX, innerWidth - contextMenu.offsetWidth - 8);
  const y = Math.min(e.clientY, innerHeight - contextMenu.offsetHeight - 65);
  contextMenu.style.left = `${x}px`;
  contextMenu.style.top = `${y}px`;
});

contextMenu.addEventListener('click', e => {
  e.stopPropagation();
  const action = e.target.dataset.contextAction || e.target.closest('[data-context-action]')?.dataset.contextAction;
  if (action === 'refresh') desktop.animate([{ opacity: 0.65 }, { opacity: 1 }], { duration: 200 });
  if (action === 'about' || action === 'cmd') openApp(action);
  contextMenu.classList.remove('active');
});

function updateClock() {
  const now = new Date();
  document.getElementById('clock').textContent = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  document.getElementById('date').textContent = now.toLocaleDateString('pt-BR');
}
updateClock();
setInterval(updateClock, 1000);

const shutdownScreen = document.getElementById('shutdownScreen');
document.getElementById('powerButton').addEventListener('click', () => {
  startMenu.classList.remove('active');
  shutdownScreen.classList.add('active');
  shutdownScreen.setAttribute('aria-hidden', 'false');
  setTimeout(() => shutdownScreen.classList.add('ready'), 1700);
});

document.getElementById('turnOnButton').addEventListener('click', () => {
  shutdownScreen.classList.remove('active', 'ready');
  shutdownScreen.setAttribute('aria-hidden', 'true');
});

const achievements = {

    welcome:{
        title:"Bem-vindo!",
        desc:"Obrigado por visitar meu portfólio.",
        score:"+10G",
        gif:"assets/3dgifmaker23100.gif"
    },

    explorer:{
        title:"Explorador",
        desc:"Você abriu a pasta Projetos.",
        score:"+20G",
        gif:"assets/3dgifmaker40520.gif"
    },

    hacker:{
        title:"Hacker",
        desc:"Prompt de Comando desbloqueado.",
        score:"+30G",
        gif:"assets/3dgifmaker75237.gif"
    },

    vscode:{
        title:"Code Master",
        desc:"Visual Studio Code aberto.",
        score:"+25G",
        gif:"assets/3dgifmaker25700.gif"
    },

    social:{
        title:"Social",
        desc:"Visitou minhas redes sociais.",
        score:"+15G",
        gif:"assets/3dgifmaker64058.gif"
    },

    trash:{
        title:"Lixeira",
        desc:"Até a lixeira foi explorada.",
        score:"+5G",
        gif:"assets/3dgifmaker09885.gif"
    },

    secret:{
        title:"???",
        desc:"Você encontrou um easter egg.",
        score:"+100G",
        gif:"assets/3dgifmaker39776.gif"
    },
    
    about:{
      title:"Conhecendo o Dev",
      desc:"Você abriu o perfil do Mateus.",
      score:"+15G",
      gif:"assets/3dgifmaker64878.gif"
    }
};

function unlockAchievement(id){

    if(localStorage.getItem("achievement_" + id)) return;

    localStorage.setItem("achievement_" + id, "true");

    const data = achievements[id];
    if(!data) return;

    const container = document.getElementById("achievement-container");

    const div = document.createElement("div");
    div.className = "achievement";

    div.innerHTML = `
        <img src="${data.gif}">
        <div class="achievement-info">
            <span class="achievement-title">Achievement Unlocked</span>
            <span class="achievement-name">${data.title}</span>
            <span class="achievement-desc">${data.desc}</span>
            <span class="achievement-score">${data.score}</span>
        </div>
    `;

    container.appendChild(div);

    requestAnimationFrame(() => div.classList.add("show"));

    setTimeout(() => {
        div.classList.remove("show");
        div.classList.add("hide");

        setTimeout(() => div.remove(), 500);
    }, 5000);
  }

window.addEventListener("load", () => {

    setTimeout(() => {
        unlockAchievement("welcome");
    }, 1000);

});

