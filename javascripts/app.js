var character, characterIdle;
var stage;
var currentCharacter;

function init() {
  stage = new createjs.Stage("demoCanvas");

  var dataLeft = {
    "framerate": 30,
    "images": ["img/monster.png"],
    "frames": { width: 64, height: 64 },
    "animations": {
      "run": [0, 9]
    }
  }

  var dataRight = {
    "framerate": 30,
    "images": ["img/monster_right.png"],
    "frames": { width: 64, height: 64 },
    "animations": {
      "run": [0, 9]
    }
  }

  var dataIdle = {
    "framerate": 30,
    "images": ["img/monster_idle.png"],
    "frames": { width: 64, height: 64 },
    "animations": {
      "stand": 0
    }
  }

  var spriteSheetL = new createjs.SpriteSheet(dataLeft);
  var spriteSheetR = new createjs.SpriteSheet(dataRight);
  var spriteSheetI = new createjs.SpriteSheet(dataIdle);

  characterI = new createjs.Sprite(spriteSheetI, "stand");
  characterL = new createjs.Sprite(spriteSheetL, "run");
  characterR = new createjs.Sprite(spriteSheetR, "run");

  characterI.x, characterL.x, characterR.x = stage.canvas.width / 2;
  characterI.y, characterL.y, characterR.y = 50;

  currentCharacter = characterI;

  stage.addChild(currentCharacter);
  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.addEventListener("tick", stage);
  createjs.Ticker.addEventListener("tick", move);
}

function move(event) {
  if (key.isPressed('left')) {
    characterL.x = currentCharacter.x
    characterL.y = currentCharacter.y
    stage.removeChild(currentCharacter);
    currentCharacter = characterL;
    stage.addChild(currentCharacter);
    currentCharacter.x -= event.delta/1000 * 100;
  } else if (key.isPressed('right')) {
    characterR.x = currentCharacter.x
    characterR.y = currentCharacter.y
    stage.removeChild(currentCharacter);
    currentCharacter = characterR;
    stage.addChild(currentCharacter);
    currentCharacter.x += event.delta/1000 * 100;
  } else {
    characterI.x = currentCharacter.x
    characterI.y = currentCharacter.y
    stage.removeChild(currentCharacter);
    currentCharacter = characterI;
    stage.addChild(currentCharacter);
  }
}
