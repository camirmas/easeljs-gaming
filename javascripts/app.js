var character, characterIdle, currentCharacter;
var stage;
var score = 0;
var coins = [];
var text = new createjs.Text("Score: " + score, "20px Arial", "#ff7700");

function init() {
  stage = new createjs.Stage("demoCanvas");

  var dataCoin = {
    "framerate": 30,
    "images": ["img/coin.png"],
    "frames": { width: 50, height: 50 },
    "animations": {
      "spin": [0,9]
    }
  }

  var dataLeft = {
    "framerate": 10,
    "images": ["img/cam_pixel_left.png"],
    "frames": { width: 123.67, height: 150 },
    "animations": {
      "run": [0, 1]
    }
  };

  var dataRight = {
    "framerate": 10,
    "images": ["img/cam_pixel_right.png"],
    "frames": { width: 127, height: 150 },
    "animations": {
      "run": [0, 1]
    }
  };

  var dataIdle = {
    "images": ["img/cam_pixel.png"],
    "frames": { width: 121, height: 150 },
    "animations": {
      "stand": 0
    }
  };

  var spriteSheetL = new createjs.SpriteSheet(dataLeft);
  var spriteSheetR = new createjs.SpriteSheet(dataRight);
  var spriteSheetI = new createjs.SpriteSheet(dataIdle);

  characterI = new createjs.Sprite(spriteSheetI, "stand");
  characterL = new createjs.Sprite(spriteSheetL, "run");
  characterR = new createjs.Sprite(spriteSheetR, "run");
  currentCharacter = characterI;

  characterI.x = stage.canvas.width / 2;
  characterI.y = 50;

  stage.addChild(currentCharacter);
  stage.addChild(text);


  for (var i = 0; i < 10; i++) {
    var spriteSheetCoin = new createjs.SpriteSheet(dataCoin);
    coin = new createjs.Sprite(spriteSheetCoin, "spin");
    coin.x = Math.random() * 800;
    coin.y = Math.random() * 400;
    coins.push(coin);
    stage.addChild(coin);
  }

  var event = new Event("coin");
  createjs.Ticker.addEventListener("coin", nearCoin);

  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.addEventListener("tick", stage);
  createjs.Ticker.addEventListener("tick", move);
  createjs.Ticker.addEventListener("tick", scoreAndRemoveCoin);
}

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

function move(event) {
  if (key.isPressed('left')) {
    changeAnimation(characterL);
    currentCharacter.x -= event.delta/1000 * 100;

  } else if (key.isPressed('right')) {
    changeAnimation(characterR);
    currentCharacter.x += event.delta/1000 * 100;

  } else if (key.isPressed('up')) {
    currentCharacter.y -= event.delta/1000 * 100;

  } else if (key.isPressed('down')) {
    currentCharacter.y += event.delta/1000 * 100;

  } else {
    changeAnimation(characterI);
  }
}

function changeAnimation(character) {
  character.x = currentCharacter.x;
  character.y = currentCharacter.y;
  stage.removeChild(currentCharacter);
  currentCharacter = character;
  stage.addChild(currentCharacter);
}
