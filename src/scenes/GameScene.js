export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.score = 0;
    this.lives = 5;
    this.lastShotTime = 0;
    this.shotDelay = 200;
    this.pigeonSpeed = { min: -150, max: -80 }; 
    this.difficultyInterval = 10000; 
    this.victoryScore = 10000; 
  }

  preload() {
    this.createHarborBackground();
    this.createPigeonSprites();
    this.createNetTrap();
    this.createGunSprite();
    this.createHeartSprite();
  }

  createHarborBackground() {
    const WIDTH = 1280;
    const HEIGHT = 720;
    const bg = this.make.graphics({ add: false });
    
    // Céu
    bg.fillStyle(0x87ceeb, 1);
    bg.fillRect(0, 0, WIDTH, HEIGHT);
    
    // Nuvens
    bg.fillStyle(0xffffff, 0.7);
    for (let i = 0; i < 8; i++) {
      const x = i * 180 + 50;
      const y = 60 + (i % 3) * 40;
      const width = 100 + (i % 3) * 30;
      const height = 25 + (i % 2) * 15;
      bg.fillRoundedRect(x, y, width, height, 20);
    }
    
    // Mar
    bg.fillStyle(0x1a5276, 1);
    bg.fillRect(0, HEIGHT - 200, WIDTH, 40);
    
    // Ondas
    bg.lineStyle(1, 0x2874a6, 1);
    for (let i = 0; i < 8; i++) {
      bg.lineBetween(0, HEIGHT - 200 + (i * 4), WIDTH, HEIGHT - 200 + (i * 4));
    }
    
    // Navios
    this.drawShips(bg, HEIGHT);
    
    // Gaivotas
    bg.fillStyle(0xffffff, 1);
    for (let i = 0; i < 5; i++) {
      const x = i * 200 + 120;
      const y = 120 + (i % 3) * 30;
      bg.fillTriangle(x, y, x-10, y-5, x-5, y);
      bg.fillTriangle(x, y, x+10, y-5, x+5, y);
    }
    
    // Cais
    bg.fillStyle(0x283e3f, 1);
    bg.fillRect(0, HEIGHT - 160, WIDTH, 160);
    
    // Textura do cais
    bg.lineStyle(1, 0x1a292a, 0.5);
    for (let i = 0; i < 40; i++) {
      bg.lineBetween(i * 32, HEIGHT - 160, i * 32, HEIGHT);
    }
    
    // Postes
    bg.fillStyle(0x4d4d4d, 1);
    for (let i = 0; i < 6; i++) {
      bg.fillRect(i * 200 + 100, HEIGHT - 160, 10, 40);
      bg.fillStyle(0xffcc00, 0.7);
      bg.fillCircle(i * 200 + 105, HEIGHT - 130, 5);
      bg.fillStyle(0x4d4d4d, 1);
    }
    
    // Containers
    this.drawContainers(bg, HEIGHT);
    
    // Guindastes
    this.createCranes();
    
    bg.generateTexture('harbor', WIDTH, HEIGHT);
    bg.destroy();
  }
  
  drawShips(bg, height) {
    // Navio grande
    bg.fillStyle(0x555555, 1);
    bg.fillRect(800, height - 240, 200, 40);
    bg.fillStyle(0x333333, 1);
    bg.fillRect(850, height - 270, 100, 30);
    bg.fillRect(890, height - 290, 40, 20);
    
    // Contêineres no convés
    bg.fillStyle(0xcc6600, 1);
    bg.fillRect(820, height - 255, 30, 15);
    bg.fillStyle(0x3366cc, 1);
    bg.fillRect(860, height - 255, 30, 15);
    
    // Chaminé
    bg.fillStyle(0x222222, 1);
    bg.fillRect(920, height - 310, 15, 20);
    
    // Navio médio
    bg.fillStyle(0x666666, 1);
    bg.fillRect(300, height - 230, 120, 30);
    bg.fillStyle(0x444444, 1);
    bg.fillRect(320, height - 250, 50, 20);
    bg.fillStyle(0x222222, 1);
    bg.fillRect(345, height - 270, 12, 20);
    
    // Navio pequeno
    bg.fillStyle(0x777777, 1);
    bg.fillRect(100, height - 220, 80, 20);
    bg.fillStyle(0x444444, 1);
    bg.fillRect(130, height - 235, 30, 15);
    
    // Reflexos na água
    bg.fillStyle(0x555555, 0.3);
    bg.fillRect(800, height - 200, 200, 15);
    bg.fillStyle(0x666666, 0.3);
    bg.fillRect(300, height - 200, 120, 10);
    bg.fillStyle(0x777777, 0.3);
    bg.fillRect(100, height - 200, 80, 8);
  }
  
  drawContainers(bg, height) {
    const colors = [0xffcc66, 0xff9966, 0xcc6600, 0x3366cc, 0x33cc33, 0x993366, 0x666699];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 2; j++) {
        const x = i * 128 + 16;
        const y = (height - 160) + (j * -48) + 48;
        const colorIndex = (i + j) % colors.length;
        bg.fillStyle(colors[colorIndex], 1);
        bg.fillRect(x, y, 96, 48);
        
        bg.lineStyle(2, 0x000000, 1);
        bg.strokeRect(x, y, 96, 48);
        
        bg.fillStyle(0xffffff, 1);
        if (colorIndex % 3 === 0) {
          bg.fillRect(x + 30, y + 15, 36, 18);
        }
        bg.lineStyle();
      }
    }
  }
  
  createCranes() {
    for (let g = 0; g < 2; g++) {
      const crane = this.make.graphics({ add: false });
      crane.fillStyle(0x444444, 1);
      crane.fillRect(2, 56, 20, 8);
      
      crane.fillStyle(0x666666, 1);
      crane.fillRect(8, 0, 8, 64);
      
      crane.fillStyle(0x888888, 1);
      crane.fillRect(6, 24, 12, 16);
      
      crane.fillStyle(0xaaddff, 1);
      crane.fillRect(8, 26, 8, 6);
      
      crane.fillStyle(0x666666, 1);
      crane.fillRect(8, 0, 48, 8);
      
      crane.lineStyle(1, 0x333333, 1);
      crane.lineBetween(52, 8, 52, 36);
      crane.lineBetween(44, 8, 44, 30);
      
      crane.fillStyle(0x333333, 1);
      crane.fillRect(50, 36, 4, 8);
      
      crane.generateTexture('crane' + g, 64, 64);
      crane.destroy();
    }
  }

  createPigeonSprites() {
    // Pombo variação 1
    const pigeon1 = this.make.graphics({ add: false });
    pigeon1.fillStyle(0xcccccc, 1);
    pigeon1.fillRect(18, 18, 12, 18);
    pigeon1.fillRect(15, 9, 18, 12);
    
    pigeon1.fillStyle(0xff9900, 1);
    pigeon1.fillRect(27, 15, 9, 3);
    
    pigeon1.fillStyle(0x000000, 1);
    pigeon1.fillRect(24, 12, 3, 3);
    
    pigeon1.fillStyle(0xaaaaaa, 1);
    pigeon1.fillRect(12, 21, 6, 9);
    pigeon1.fillRect(30, 21, 6, 9);
    
    pigeon1.fillStyle(0xff9900, 1);
    pigeon1.fillRect(21, 36, 3, 3);
    pigeon1.fillRect(24, 36, 3, 3);
    pigeon1.generateTexture('pigeon1', 48, 48);
    pigeon1.destroy();

    // Pombo variação 2
    const pigeon2 = this.make.graphics({ add: false });
    pigeon2.fillStyle(0xaaaaaa, 1);
    pigeon2.fillRect(18, 18, 12, 18);
    pigeon2.fillRect(15, 9, 18, 12);
    
    pigeon2.fillStyle(0xff9900, 1);
    pigeon2.fillRect(27, 15, 9, 3);
    
    pigeon2.fillStyle(0x000000, 1);
    pigeon2.fillRect(24, 12, 3, 3);
    
    pigeon2.fillStyle(0x888888, 1);
    pigeon2.fillRect(12, 24, 6, 9);
    pigeon2.fillRect(30, 24, 6, 9);
    
    pigeon2.fillStyle(0xff9900, 1);
    pigeon2.fillRect(21, 36, 3, 3);
    pigeon2.fillRect(24, 36, 3, 3);
    pigeon2.generateTexture('pigeon2', 48, 48);
    pigeon2.destroy();
  }

  createNetTrap() {
    const net = this.make.graphics({ add: false });
    net.fillStyle(0xffdd00, 1);
    net.fillCircle(12, 12, 10);
    
    net.fillStyle(0xff8800, 0.7);
    net.fillCircle(12, 12, 8);
    
    net.fillStyle(0xff0000, 0.7);
    net.fillCircle(12, 12, 5);
    
    net.lineStyle(1, 0x333333, 1);
    net.lineBetween(2, 12, 22, 12);
    net.lineBetween(4, 7, 20, 7);
    net.lineBetween(4, 17, 20, 17);
    net.lineBetween(12, 2, 12, 22);
    net.lineBetween(7, 4, 7, 20);
    net.lineBetween(17, 4, 17, 20);
    
    net.lineStyle(2, 0xaa5500, 1);
    net.strokeCircle(12, 12, 10);
    
    net.generateTexture('net', 24, 24);
    net.destroy();
  }

  createGunSprite() {
    const gun = this.make.graphics({ add: false });
    gun.fillStyle(0x666666, 1);
    gun.fillRect(0, 8, 20, 4);
    
    gun.fillStyle(0x444444, 1);
    gun.fillRect(18, 7, 2, 6);
    
    gun.fillStyle(0x333333, 1);
    gun.fillRect(12, 12, 8, 8);
    
    gun.fillStyle(0x8B4513, 1);
    gun.fillRect(8, 12, 4, 10);
    
    gun.fillStyle(0x222222, 1);
    gun.fillRect(14, 20, 2, 2);
    
    gun.fillStyle(0x00ff00, 1);
    gun.fillRect(14, 6, 2, 2);
    gun.generateTexture('gun', 32, 24);
    gun.destroy();
  }

  createHeartSprite() {
    const hg = this.make.graphics({ add: false });
    hg.fillStyle(0xff0000, 1);
    hg.fillCircle(4, 4, 4);
    hg.fillCircle(12, 4, 4);
    hg.fillTriangle(0, 4, 8, 16, 16, 4);
    hg.generateTexture('heart', 16, 16);
    hg.destroy();
  }

  create() {
    // Reset variables on game create
    this.score = 0;
    this.lives = 5;
    this.lastShotTime = 0;
    this.pigeonSpeed = { min: -150, max: -80 };
    
    this.add.image(640, 360, 'harbor').setDepth(0);
    
    this.add.image(100, 560, 'crane0').setOrigin(0,1).setDepth(1);
    this.add.image(1100, 560, 'crane1').setOrigin(0,1).setDepth(1);

    this.createPigeonGroup();
    this.createLivesDisplay();
    this.createScoreDisplay();
    this.createProgressBar();
    this.createPlayerGun();
    this.setupInputHandlers();
    this.setupDifficultyProgression();
  }
  
  createPigeonGroup() {
    this.pigeons = this.physics.add.group();

    this.spawnEvent = this.time.addEvent({
      delay: 1200,
      loop: true,
      callback: this.spawnPigeon,
      callbackScope: this
    });
  }
  
  spawnPigeon() {
    const key = Phaser.Math.Between(0,1) ? 'pigeon1' : 'pigeon2';
    const x = Phaser.Math.Between(16, 1264);
    const pigeon = this.pigeons.create(x, 752, key);
    
    pigeon.setVelocityY(Phaser.Math.Between(this.pigeonSpeed.min, this.pigeonSpeed.max));
    pigeon.setCollideWorldBounds(false);
  }
  
  setupDifficultyProgression() {
    // Aumenta a velocidade dos pombos a cada intervalo
    this.difficultyTimer = this.time.addEvent({
      delay: this.difficultyInterval,
      callback: this.increaseDifficulty,
      callbackScope: this,
      loop: true
    });
  }
  
  increaseDifficulty() {
    // Aumenta a velocidade (valores mais negativos = mais rápido para cima)
    this.pigeonSpeed.min -= 10;
    this.pigeonSpeed.max -= 10;
    
    // Reduz o intervalo de spawn conforme o jogo avança
    const currentDelay = this.spawnEvent.delay;
    if (currentDelay > 400) {
      this.spawnEvent.delay = currentDelay - 50;
      this.spawnEvent.reset({
        delay: this.spawnEvent.delay,
        callback: this.spawnPigeon,
        callbackScope: this,
        loop: true
      });
    }
  }
  
  createProgressBar() {
    // Barra de progresso para vitória
    this.progressBg = this.add.rectangle(640, 40, 400, 16, 0x333333)
      .setOrigin(0.5)
      .setDepth(5);
    
    this.progressBar = this.add.rectangle(440, 40, 0, 12, 0x00ff00)
      .setOrigin(0, 0.5)
      .setDepth(5);
      
    this.goalText = this.add.text(640, 60, `Objetivo: ${this.score}/${this.victoryScore}`, {
      font: '14px Courier',
      fill: '#ffffff'
    })
    .setOrigin(0.5)
    .setDepth(5);
  }
  
  createLivesDisplay() {
    this.hearts = [];
    for (let i = 0; i < this.lives; i++) {
      const heart = this.add.image(1240 - i*20, 16, 'heart')
        .setOrigin(1,0)
        .setDepth(5);
      this.hearts.push(heart);
    }
  }
  
  createScoreDisplay() {
    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      font: '16px Courier',
      fill: '#ffffff',
      stroke: '#000000',
      strokeThickness: 2
    }).setDepth(5);
  }
  
  createPlayerGun() {
    this.gun = this.add.image(0, 0, 'gun').setDepth(10);
  }
  
  setupInputHandlers() {
    this.input.on('pointermove', pointer => {
      this.gun.setPosition(pointer.x, pointer.y);
    });

    this.input.on('pointerdown', pointer => {
      if (this.lives <= 0) return;
      this.tryShootNet(pointer.x, pointer.y);
    });
    
    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  tryShootNet(x, y) {
    const currentTime = this.time.now;
    if (currentTime - this.lastShotTime < this.shotDelay) {
      return; // Evita disparos muito rápidos
    }
    
    this.shootNet(x, y);
    this.lastShotTime = currentTime;
  }
  
  shootNet(x, y) {
    const net = this.physics.add.image(x, y, 'net').setDepth(5);
    net.setVelocityY(-300);
    
    this.physics.add.overlap(net, this.pigeons, (net, pigeon) => {
      net.destroy();
      pigeon.destroy();
      this.updateScore(10);
    });
  }

  updateScore(points) {
    this.score += points;
    this.scoreText.setText('Score: ' + this.score);
    
    // Atualiza a barra de progresso
    const progressWidth = (this.score / this.victoryScore) * 400;
    this.progressBar.width = Math.min(progressWidth, 400);
    this.goalText.setText(`Objetivo: ${this.score}/${this.victoryScore}`);
    
    // Verifica se atingiu a pontuação de vitória
    if (this.score >= this.victoryScore) {
      this.victory();
    }
  }

  update() {
    this.checkEscapedPigeons();
    this.handleSpacebarShooting();
  }
  
  checkEscapedPigeons() {
    this.pigeons.getChildren().forEach(pigeon => {
      if (pigeon.y < -48) {
        pigeon.destroy();
        this.loseLife();
      }
    });
  }
  
  handleSpacebarShooting() {
    if (this.spaceKey.isDown && this.lives > 0) {
      this.tryShootNet(this.gun.x, this.gun.y);
    }
  }

  loseLife() {
    if (this.lives <= 0) return;
    
    this.lives--;
    const heart = this.hearts.pop();
    if (heart) heart.destroy();
    
    if (this.lives <= 0) {
      this.gameOver();
    }
  }

  gameOver() {
    this.stopGame();
    this.createGameOverPanel();
  }
  
  victory() {
    this.stopGame();
    this.createVictoryPanel();
  }
  
  stopGame() {
    // Para todos os timers e eventos
    this.spawnEvent.remove();
    if (this.difficultyTimer) {
      this.difficultyTimer.remove();
    }
    
    // Congela todos os pombos
    this.pigeons.getChildren().forEach(pigeon => {
      pigeon.setVelocity(0, 0);
    });
  }
  
  createGameOverPanel() {
    const panel = this.add.graphics();
    panel.fillStyle(0x000000, 0.7);
    panel.fillRect(340, 200, 600, 300);
    panel.setDepth(19);
    
    this.add.text(640, 250, 'GAME OVER', {
      font: '64px Arial',
      fill: '#ff0000',
      stroke: '#ffffff',
      strokeThickness: 4
    })
    .setOrigin(0.5)
    .setDepth(20);
    
    this.add.text(640, 350, 'Você infartou.\nOs pombos são bem irritantes mesmo.', {
      font: '32px Arial',
      fill: '#ffffff',
      align: 'center'
    })
    .setOrigin(0.5)
    .setDepth(20);
    
    this.add.text(640, 450, `Pontuação Final: ${this.score}`, {
      font: '36px Arial',
      fill: '#ffcc00'
    })
    .setOrigin(0.5)
    .setDepth(20);
    
    const restartText = this.add.text(640, 500, "Pressione R para reiniciar", {
      font: '24px Arial',
      fill: '#ffffff'
    })
    .setOrigin(0.5)
    .setDepth(20);
    
    this.tweens.add({
      targets: restartText,
      alpha: 0.2,
      duration: 800,
      yoyo: true,
      repeat: -1
    });
    
    this.setupRestartKey();
  }
  
  createVictoryPanel() {
    const panel = this.add.graphics();
    panel.fillStyle(0x000066, 0.8);
    panel.fillRect(340, 200, 600, 300);
    panel.setDepth(19);
    
    this.add.text(640, 250, 'VITÓRIA!', {
      font: '64px Arial',
      fill: '#ffdd00',
      stroke: '#ffffff',
      strokeThickness: 4
    })
    .setOrigin(0.5)
    .setDepth(20);
    
    this.add.text(640, 350, 'Você exterminou a praga de pombos!\nO porto está salvo graças a você.', {
      font: '32px Arial',
      fill: '#ffffff',
      align: 'center'
    })
    .setOrigin(0.5)
    .setDepth(20);
    
    this.add.text(640, 450, `Pontuação Final: ${this.score}`, {
      font: '36px Arial',
      fill: '#00ff00'
    })
    .setOrigin(0.5)
    .setDepth(20);
    
    const restartText = this.add.text(640, 500, "Pressione R para jogar novamente", {
      font: '24px Arial',
      fill: '#ffffff'
    })
    .setOrigin(0.5)
    .setDepth(20);
    
    this.tweens.add({
      targets: restartText,
      alpha: 0.2,
      duration: 800,
      yoyo: true,
      repeat: -1
    });
    
    this.setupRestartKey();
  }
  
  setupRestartKey() {
    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.R);
    
    this.input.keyboard.once('keydown-R', () => {
      this.scene.start('TitleScreen');
    });
  }
}