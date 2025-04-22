export default class TitleScreen extends Phaser.Scene {
  constructor() {
    super({ key: 'TitleScreen' });
  }

  preload() {
    this.createTitleBackground();
  }

  createTitleBackground() {
    const titleBg = this.make.graphics({ add: false });
    
    // Fundo e elementos principais
    titleBg.fillStyle(0x1a5276, 1);
    titleBg.fillRect(0, 0, 1280, 720);
    
    // Sol
    titleBg.fillStyle(0xffcc00, 1);
    titleBg.fillCircle(980, 150, 80);
    
    // Silhueta de navio
    titleBg.fillStyle(0x333333, 1);
    titleBg.fillRect(300, 320, 400, 50);
    titleBg.fillRect(400, 270, 100, 50);
    
    // Porto
    titleBg.fillStyle(0x222222, 1);
    titleBg.fillRect(0, 400, 1280, 320);
    
    // Guindastes
    titleBg.fillStyle(0x111111, 1);
    titleBg.fillRect(200, 100, 20, 300);
    titleBg.fillRect(200, 100, 200, 20);
    titleBg.fillRect(600, 150, 15, 250);
    titleBg.fillRect(600, 150, 150, 15);
    
    // Pombos voando
    titleBg.fillStyle(0x444444, 1);
    for (let i = 0; i < 15; i++) {
      const x = Phaser.Math.Between(100, 1100);
      const y = Phaser.Math.Between(100, 350);
      const size = Phaser.Math.Between(8, 15);
      titleBg.fillCircle(x, y, size);
      titleBg.fillRect(x - size - 2, y, size, 4);
      titleBg.fillRect(x + 2, y, size, 4);
    }
    
    titleBg.generateTexture('titleBg', 1280, 720);
    titleBg.destroy();
  }

  create() {
    this.add.image(640, 360, 'titleBg');
    
    this.createTitleText();
    this.createStartPrompt();
    this.setupControls();
  }
  
  createTitleText() {
    this.add.text(640, 150, 'Combate aos Pombos do Porto', {
      font: '64px Arial',
      fill: '#ffffff',
      stroke: '#000000',
      strokeThickness: 8
    }).setOrigin(0.5);
    
    const introText = "Os pombos invadiram o porto da cidade!\nVocê está pronto para enfrentar sua raiva e\neliminar todos os pombos antes que eles escapem?";
    this.add.text(640, 300, introText, {
      font: '32px Arial',
      fill: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4,
      align: 'center'
    }).setOrigin(0.5);
    
    this.add.text(640, 400, "Objetivo: Atinja 10.000 pontos para salvar o porto!", {
      font: '26px Arial',
      fill: '#00ff00',
      stroke: '#000000',
      strokeThickness: 3,
      align: 'center'
    }).setOrigin(0.5);
  }
  
  createStartPrompt() {
    this.playText = this.add.text(640, 500, "Pressione ESPAÇO para começar", {
      font: '36px Arial',
      fill: '#ffcc00',
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0.5);
    
    this.tweens.add({
      targets: this.playText,
      alpha: 0.2,
      duration: 800,
      yoyo: true,
      repeat: -1
    });
  }
  
  setupControls() {
    if (this.spaceKey) {
      this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }
  
  update() {
    if (this.spaceKey.isDown) {
      this.scene.start('GameScene');
    }
  }
}