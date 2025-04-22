export default class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameScene'
    });
    this.score = 0;
    this.lives = 5;
    this.lastShotTime = 0;
    this.shotDelay = 200;
    this.pigeonSpeed = {
      min: -50,
      max: -30
    };
    this.spawnDelay = 2000;
    this.difficultyInterval = 5000;
    this.victoryScore = 600;
    this.difficultyStage = 0;
    this.maxDifficultyStages = 10;
  }

  preload() {
    this.createHarborAssets();
    this.createPigeonAssets();
    this.createNetAsset();
    this.createGunAsset();
    this.createHeartAsset();
  }

  createHarborAssets() {
    const WIDTH = 1280;
    const HEIGHT = 720;
    const graphics = this.make.graphics({
      add: false
    });

    graphics.fillStyle(0x87ceeb, 1);
    graphics.fillRect(0, 0, WIDTH, HEIGHT);

    graphics.fillStyle(0xffffff, 0.7);
    for (let i = 0; i < 8; i++) {
      const x = i * 180 + 50;
      const y = 60 + (i % 3) * 40;
      const width = 100 + (i % 3) * 30;
      const height = 25 + (i % 2) * 15;
      graphics.fillRoundedRect(x, y, width, height, 20);
    }

    graphics.fillStyle(0x1a5276, 1);
    graphics.fillRect(0, HEIGHT - 200, WIDTH, 40);

    graphics.lineStyle(1, 0x2874a6, 1);
    for (let i = 0; i < 8; i++) {
      graphics.lineBetween(0, HEIGHT - 200 + (i * 4), WIDTH, HEIGHT - 200 + (i * 4));
    }

    this.drawShips(graphics, HEIGHT);

    graphics.fillStyle(0xffffff, 1);
    for (let i = 0; i < 5; i++) {
      const x = i * 200 + 120;
      const y = 120 + (i % 3) * 30;
      graphics.fillTriangle(x, y, x - 10, y - 5, x - 5, y);
      graphics.fillTriangle(x, y, x + 10, y - 5, x + 5, y);
    }

    graphics.fillStyle(0x283e3f, 1);
    graphics.fillRect(0, HEIGHT - 160, WIDTH, 160);

    graphics.lineStyle(1, 0x1a292a, 0.5);
    for (let i = 0; i < 40; i++) {
      graphics.lineBetween(i * 32, HEIGHT - 160, i * 32, HEIGHT);
    }

    graphics.fillStyle(0x4d4d4d, 1);
    for (let i = 0; i < 6; i++) {
      graphics.fillRect(i * 200 + 100, HEIGHT - 160, 10, 40);
      graphics.fillStyle(0xffcc00, 0.7);
      graphics.fillCircle(i * 200 + 105, HEIGHT - 130, 5);
      graphics.fillStyle(0x4d4d4d, 1);
    }

    this.drawContainers(graphics, HEIGHT);
    this.createCraneAssets();

    graphics.generateTexture('porto', WIDTH, HEIGHT);
    graphics.destroy();
  }

  drawShips(graphics, height) {
    graphics.fillStyle(0x555555, 1);
    graphics.fillRect(800, height - 240, 200, 40);
    graphics.fillStyle(0x333333, 1);
    graphics.fillRect(850, height - 270, 100, 30);
    graphics.fillRect(890, height - 290, 40, 20);

    graphics.fillStyle(0xcc6600, 1);
    graphics.fillRect(820, height - 255, 30, 15);
    graphics.fillStyle(0x3366cc, 1);
    graphics.fillRect(860, height - 255, 30, 15);

    graphics.fillStyle(0x222222, 1);
    graphics.fillRect(920, height - 310, 15, 20);

    graphics.fillStyle(0x666666, 1);
    graphics.fillRect(300, height - 230, 120, 30);
    graphics.fillStyle(0x444444, 1);
    graphics.fillRect(320, height - 250, 50, 20);
    graphics.fillStyle(0x222222, 1);
    graphics.fillRect(345, height - 270, 12, 20);

    graphics.fillStyle(0x777777, 1);
    graphics.fillRect(100, height - 220, 80, 20);
    graphics.fillStyle(0x444444, 1);
    graphics.fillRect(130, height - 235, 30, 15);

    graphics.fillStyle(0x555555, 0.3);
    graphics.fillRect(800, height - 200, 200, 15);
    graphics.fillStyle(0x666666, 0.3);
    graphics.fillRect(300, height - 200, 120, 10);
    graphics.fillStyle(0x777777, 0.3);
    graphics.fillRect(100, height - 200, 80, 8);
  }

  drawContainers(graphics, height) {
    const colors = [0xffcc66, 0xff9966, 0xcc6600, 0x3366cc, 0x33cc33, 0x993366, 0x666699];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 2; j++) {
        const x = i * 128 + 16;
        const y = (height - 160) + (j * -48) + 48;
        const colorIndex = (i + j) % colors.length;
        graphics.fillStyle(colors[colorIndex], 1);
        graphics.fillRect(x, y, 96, 48);

        graphics.lineStyle(2, 0x000000, 1);
        graphics.strokeRect(x, y, 96, 48);

        graphics.fillStyle(0xffffff, 1);
        if (colorIndex % 3 === 0) {
          graphics.fillRect(x + 30, y + 15, 36, 18);
        }
        graphics.lineStyle();
      }
    }
  }

  createCraneAssets() {
    for (let i = 0; i < 2; i++) {
      const graphics = this.make.graphics({
        add: false
      });
      graphics.fillStyle(0x444444, 1);
      graphics.fillRect(2, 56, 20, 8);

      graphics.fillStyle(0x666666, 1);
      graphics.fillRect(8, 0, 8, 64);

      graphics.fillStyle(0x888888, 1);
      graphics.fillRect(6, 24, 12, 16);

      graphics.fillStyle(0xaaddff, 1);
      graphics.fillRect(8, 26, 8, 6);

      graphics.fillStyle(0x666666, 1);
      graphics.fillRect(8, 0, 48, 8);

      graphics.lineStyle(1, 0x333333, 1);
      graphics.lineBetween(52, 8, 52, 36);
      graphics.lineBetween(44, 8, 44, 30);

      graphics.fillStyle(0x333333, 1);
      graphics.fillRect(50, 36, 4, 8);

      graphics.generateTexture(`guindaste${i}`, 64, 64);
      graphics.destroy();
    }
  }

  createPigeonAssets() {
    const pigeon1Graphics = this.make.graphics({
      add: false
    });
    pigeon1Graphics.fillStyle(0xcccccc, 1);
    pigeon1Graphics.fillRect(18, 18, 12, 18);
    pigeon1Graphics.fillRect(15, 9, 18, 12);
    pigeon1Graphics.fillStyle(0xff9900, 1);
    pigeon1Graphics.fillRect(27, 15, 9, 3);
    pigeon1Graphics.fillStyle(0x000000, 1);
    pigeon1Graphics.fillRect(24, 12, 3, 3);
    pigeon1Graphics.fillStyle(0xaaaaaa, 1);
    pigeon1Graphics.fillRect(12, 21, 6, 9);
    pigeon1Graphics.fillRect(30, 21, 6, 9);
    pigeon1Graphics.fillStyle(0xff9900, 1);
    pigeon1Graphics.fillRect(21, 36, 3, 3);
    pigeon1Graphics.fillRect(24, 36, 3, 3);
    pigeon1Graphics.generateTexture('pombo1', 48, 48);
    pigeon1Graphics.destroy();

    const pigeon2Graphics = this.make.graphics({
      add: false
    });
    pigeon2Graphics.fillStyle(0xaaaaaa, 1);
    pigeon2Graphics.fillRect(18, 18, 12, 18);
    pigeon2Graphics.fillRect(15, 9, 18, 12);
    pigeon2Graphics.fillStyle(0xff9900, 1);
    pigeon2Graphics.fillRect(27, 15, 9, 3);
    pigeon2Graphics.fillStyle(0x000000, 1);
    pigeon2Graphics.fillRect(24, 12, 3, 3);
    pigeon2Graphics.fillStyle(0x888888, 1);
    pigeon2Graphics.fillRect(12, 24, 6, 9);
    pigeon2Graphics.fillRect(30, 24, 6, 9);
    pigeon2Graphics.fillStyle(0xff9900, 1);
    pigeon2Graphics.fillRect(21, 36, 3, 3);
    pigeon2Graphics.fillRect(24, 36, 3, 3);
    pigeon2Graphics.generateTexture('pombo2', 48, 48);
    pigeon2Graphics.destroy();
  }

  createNetAsset() {
    const netGraphics = this.make.graphics({
      add: false
    });
    netGraphics.fillStyle(0xffdd00, 1);
    netGraphics.fillCircle(12, 12, 10);
    netGraphics.fillStyle(0xff8800, 0.7);
    netGraphics.fillCircle(12, 12, 8);
    netGraphics.fillStyle(0xff0000, 0.7);
    netGraphics.fillCircle(12, 12, 5);
    netGraphics.lineStyle(1, 0x333333, 1);
    netGraphics.lineBetween(2, 12, 22, 12);
    netGraphics.lineBetween(4, 7, 20, 7);
    netGraphics.lineBetween(4, 17, 20, 17);
    netGraphics.lineBetween(12, 2, 12, 22);
    netGraphics.lineBetween(7, 4, 7, 20);
    netGraphics.lineBetween(17, 4, 17, 20);
    netGraphics.lineStyle(2, 0xaa5500, 1);
    netGraphics.strokeCircle(12, 12, 10);
    netGraphics.generateTexture('rede', 24, 24);
    netGraphics.destroy();
  }

  createGunAsset() {
    const gunGraphics = this.make.graphics({
      add: false
    });
    gunGraphics.fillStyle(0x666666, 1);
    gunGraphics.fillRect(0, 8, 20, 4);
    gunGraphics.fillStyle(0x444444, 1);
    gunGraphics.fillRect(18, 7, 2, 6);
    gunGraphics.fillStyle(0x333333, 1);
    gunGraphics.fillRect(12, 12, 8, 8);
    gunGraphics.fillStyle(0x8B4513, 1);
    gunGraphics.fillRect(8, 12, 4, 10);
    gunGraphics.fillStyle(0x222222, 1);
    gunGraphics.fillRect(14, 20, 2, 2);
    gunGraphics.fillStyle(0x00ff00, 1);
    gunGraphics.fillRect(14, 6, 2, 2);
    gunGraphics.generateTexture('arma', 32, 24);
    gunGraphics.destroy();
  }

  createHeartAsset() {
    const heartGraphics = this.make.graphics({
      add: false
    });
    heartGraphics.fillStyle(0xff0000, 1);
    heartGraphics.fillCircle(4, 4, 4);
    heartGraphics.fillCircle(12, 4, 4);
    heartGraphics.fillTriangle(0, 4, 8, 16, 16, 4);
    heartGraphics.generateTexture('coracao', 16, 16);
    heartGraphics.destroy();
  }

  create() {
    this.score = 0;
    this.lives = 5;
    this.lastShotTime = 0;
    this.pigeonSpeed = {
      min: -50,
      max: -30
    };
    this.difficultyStage = 0;
    this.spawnEvent = null;

    this.add.image(640, 360, 'porto').setDepth(0);
    this.add.image(100, 560, 'guindaste0').setOrigin(0, 1).setDepth(1);
    this.add.image(1100, 560, 'guindaste1').setOrigin(0, 1).setDepth(1);

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
      delay: this.spawnDelay,
      loop: true,
      callback: this.spawnPigeon,
      callbackScope: this
    });
  }

  spawnPigeon() {
    const pigeon = this.pigeons.create(
      Phaser.Math.Between(16, 1264),
      752,
      Phaser.Math.Between(0, 1) ? 'pombo1' : 'pombo2'
    );
    pigeon.setVelocityY(
      Phaser.Math.Between(this.pigeonSpeed.min, this.pigeonSpeed.max)
    );
    pigeon.setCollideWorldBounds(false);
  }

  setupDifficultyProgression() {
    this.difficultyTimer = this.time.addEvent({
      delay: this.difficultyInterval,
      callback: this.increaseDifficulty,
      callbackScope: this,
      loop: true
    });
  }

  increaseDifficulty() {
    this.difficultyStage = Math.min(this.difficultyStage + 1, this.maxDifficultyStages);

    const progressFactor = this.difficultyStage / this.maxDifficultyStages;

    const minSpeedStart = -50;
    const minSpeedMax = -80;
    this.pigeonSpeed.min = minSpeedStart + (minSpeedMax - minSpeedStart) * progressFactor;

    const maxSpeedStart = -30;
    const maxSpeedMax = -50;
    this.pigeonSpeed.max = maxSpeedStart + (maxSpeedMax - maxSpeedStart) * progressFactor;

    const spawnDelayStart = 2000;
    const spawnDelayMin = 1000;
    const newDelay = spawnDelayStart - (spawnDelayStart - spawnDelayMin) * progressFactor;

    if (this.spawnEvent && this.spawnEvent.delay !== newDelay) {
      this.spawnEvent.delay = newDelay;
      this.spawnEvent.reset({
        delay: newDelay,
        callback: this.spawnPigeon,
        callbackScope: this,
        loop: true
      });
    }

    console.log(`Dificuldade ${this.difficultyStage}/${this.maxDifficultyStages}: velocidade=${this.pigeonSpeed.min} a ${this.pigeonSpeed.max}, spawn=${newDelay}ms`);
  }

  createProgressBar() {
    this.progressBg = this.add.rectangle(640, 40, 400, 16, 0x333333)
      .setOrigin(0.5).setDepth(5);
    this.progressBar = this.add.rectangle(440, 40, 0, 12, 0x00ff00)
      .setOrigin(0, 0.5).setDepth(5);
    this.goalText = this.add.text(640, 60, `Objetivo: ${this.score}/${this.victoryScore}`, {
      font: '14px Courier',
      fill: '#ffffff'
    }).setOrigin(0.5).setDepth(5);
  }

  createLivesDisplay() {
    this.hearts = [];
    for (let i = 0; i < this.lives; i++) {
      const heart = this.add.image(1240 - i * 20, 16, 'coracao')
        .setOrigin(1, 0).setDepth(5);
      this.hearts.push(heart);
    }
  }

  createScoreDisplay() {
    this.scoreText = this.add.text(16, 16, 'Pontuação: 0', {
      font: '16px Courier',
      fill: '#ffffff',
      stroke: '#000000',
      strokeThickness: 2
    }).setDepth(5);
  }

  createPlayerGun() {
    this.gun = this.add.image(0, 0, 'arma').setDepth(10);
  }

  setupInputHandlers() {
    this.input.on('pointermove', pointer => this.gun.setPosition(pointer.x, pointer.y));
    this.input.on('pointerdown', pointer => {
      if (this.lives > 0) this.tryShootNet(pointer.x, pointer.y);
    });
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  tryShootNet(x, y) {
    const now = this.time.now;
    if (now - this.lastShotTime < this.shotDelay) return;
    this.shootNet(x, y);
    this.lastShotTime = now;
  }

  shootNet(x, y) {
    const net = this.physics.add.image(x, y, 'rede').setDepth(5);
    net.setVelocityY(-300);
    this.physics.add.overlap(net, this.pigeons, (netObj, pigeon) => {
      netObj.destroy();
      pigeon.destroy();
      this.updateScore(10);
    });
  }

  updateScore(points) {
    this.score += points;
    this.scoreText.setText('Pontuação: ' + this.score);
    const width = (this.score / this.victoryScore) * 400;
    this.progressBar.width = Math.min(width, 400);
    this.goalText.setText(`Objetivo: ${this.score}/${this.victoryScore}`);
    if (this.score >= this.victoryScore) this.endGame(true);
  }

  update() {
    this.checkEscapedPigeons();
    if (this.spaceKey.isDown && this.lives > 0) {
      this.tryShootNet(this.gun.x, this.gun.y);
    }
  }

  checkEscapedPigeons() {
    this.pigeons.getChildren().forEach(pigeon => {
      if (pigeon.y < -48) {
        pigeon.destroy();
        this.loseLife();
      }
    });
  }

  loseLife() {
    if (this.lives <= 0) return;
    this.lives--;
    const heart = this.hearts.pop();
    if (heart) heart.destroy();
    if (this.lives <= 0) this.endGame(false);
  }

  stopGame() {
    this.spawnEvent.remove();
    if (this.difficultyTimer) this.difficultyTimer.remove();
    this.pigeons.getChildren().forEach(pigeon => pigeon.setVelocity(0, 0));
  }

  endGame(isVictory) {
    this.stopGame();
    if (isVictory) {
      this.createVictoryPanel();
    } else {
      this.createGameOverPanel();
    }
  }

  createGameOverPanel() {
    const panel = this.add.graphics();
    panel.fillStyle(0x000000, 0.7).fillRect(340, 200, 600, 300).setDepth(19);
    this.add.text(640, 250, 'FIM DE JOGO', {
      font: '64px Arial',
      fill: '#ff0000',
      stroke: '#ffffff',
      strokeThickness: 4
    }).setOrigin(0.5).setDepth(20);
    this.add.text(640, 350, 'Você infartou.\nOs pombos são bem irritantes mesmo.', {
      font: '32px Arial',
      fill: '#ffffff',
      align: 'center'
    }).setOrigin(0.5).setDepth(20);
    this.add.text(640, 450, `Pontuação Final: ${this.score}`, {
      font: '36px Arial',
      fill: '#ffcc00'
    }).setOrigin(0.5).setDepth(20);
    const restartText = this.add.text(640, 500, "Pressione R para reiniciar", {
      font: '24px Arial',
      fill: '#ffffff'
    }).setOrigin(0.5).setDepth(20);
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
    panel.fillStyle(0x000066, 0.8).fillRect(340, 200, 600, 300).setDepth(19);
    this.add.text(640, 250, 'VITÓRIA!', {
      font: '64px Arial',
      fill: '#ffdd00',
      stroke: '#ffffff',
      strokeThickness: 4
    }).setOrigin(0.5).setDepth(20);
    this.add.text(640, 350, 'Você exterminou a praga de pombos!\nO porto está salvo graças a você.', {
      font: '32px Arial',
      fill: '#ffffff',
      align: 'center'
    }).setOrigin(0.5).setDepth(20);
    this.add.text(640, 450, `Pontuação Final: ${this.score}`, {
      font: '36px Arial',
      fill: '#00ff00'
    }).setOrigin(0.5).setDepth(20);
    const restartText = this.add.text(640, 500, "Pressione R para jogar novamente", {
      font: '24px Arial',
      fill: '#ffffff'
    }).setOrigin(0.5).setDepth(20);
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
