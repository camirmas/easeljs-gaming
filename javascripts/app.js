var character, characterIdle, currentCharacter;
var stage;
var score = 0;
var coins = [];
var text = new createjs.Text("Score: " + score, "20px Arial", "#ff7700");

function init() {
  stage = new createjs.Stage("demoCanvas");
  stage.addChild(text);

  /* -------- SpriteSheet params -------- */
  var data = {
    "coin": {
      "framerate": 30,
      "images": ["img/coin.png"],
      "frames": { width: 50, height: 50 },
      "animations": {
        "spin": [0,9]
      }
    },
    character: {
      framerate: 10,
      images: ["img/cam_sprite.png"],
      frames: { width: 136.5, height: 160 },
      animations: {
        standL: 5,
        standR: 9,
        standU: 3,
        standD: 0,
        runL: {
          frames: [1, 5],
        },
        runR: {
          frames: [9, 10],
        },
        runU: {
          frames: [2, 6],
        },
        runD: {
          frames: [4, 8],
        }
      }
    }
  }

  /* -------- Character Creation -------- */
  var spriteSheet = new createjs.SpriteSheet(data.character);

  characterL = new createjs.Sprite(spriteSheet, "runL");
  characterR = new createjs.Sprite(spriteSheet, "runR");
  characterU = new createjs.Sprite(spriteSheet, "runU");
  characterD = new createjs.Sprite(spriteSheet, "runD");

  standL = new createjs.Sprite(spriteSheet, "standL");
  standR = new createjs.Sprite(spriteSheet, "standR");
  standU = new createjs.Sprite(spriteSheet, "standU");
  standD = new createjs.Sprite(spriteSheet, "standD");

  currentCharacter = characterD;
  stage.addChild(currentCharacter);

  /* -------- Coin Creation -------- */
  for (var i = 0; i < 10; i++) {
    var spriteSheetCoin = new createjs.SpriteSheet(data.coin);
    coin = new createjs.Sprite(spriteSheetCoin, "spin");
    coin.x = Math.random() * 900;
    coin.y = Math.random() * 300;
    coins.push(coin);
    stage.addChild(coin);
  }

  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.addEventListener("tick", stage);
  createjs.Ticker.addEventListener("tick", move);
  createjs.Ticker.addEventListener("tick", scoreAndRemoveCoin);
}

/* -------- Coin Helpers -------- */
function nearCoin() {
  for(var i = 0; i < coins.length; i++) {
    var coin = coins[i];

    if (coin) {
      var distance = Math.sqrt(Math.pow((currentCharacter.x - coin.x), 2) + Math.pow((currentCharacter.y - coin.y), 2));

      if (distance < 80) {
        return coin;
      }
    }
  }
  return false;
}

function scoreAndRemoveCoin() {
  if (nearCoin()) {
    var coin = nearCoin();
    score += 100;
    stage.removeChild(coin);
    delete coins[coins.indexOf(coin)];
    changeScoreText();
  }
}

function changeScoreText() {
  stage.removeChild(text);
  text = new createjs.Text("Score: " + score, "20px Arial", "#ff7700");
  stage.addChild(text);
}

/* -------- Animation Helpers -------- */
function move(event) {
  if (key.isPressed('left')) {
    changeAnimation(characterL);
    currentCharacter.x -= event.delta/1000 * 100;

  } else if (key.isPressed('right')) {
    changeAnimation(characterR);
    currentCharacter.x += event.delta/1000 * 100;

  } else if (key.isPressed('up')) {
    changeAnimation(characterU);
    currentCharacter.y -= event.delta/1000 * 100;

  } else if (key.isPressed('down')) {
    changeAnimation(characterD);
    currentCharacter.y += event.delta/1000 * 100;

  } else {
    changeToStanding(currentCharacter);
  }
}

function changeAnimation(character) {
  character.x = currentCharacter.x;
  character.y = currentCharacter.y;
  stage.removeChild(currentCharacter);
  currentCharacter = character;
  stage.addChild(currentCharacter);
}

function changeToStanding(character) {
  switch(character) {
    case characterL:
      changeAnimation(standL);
      break;
    case characterR:
      changeAnimation(standR);
      break;
    case characterU:
      changeAnimation(standU);
      break;
    case characterD:
      changeAnimation(standD);
      break;
  }
}
