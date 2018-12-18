$(function() {

  var $playerDiv = $("#player");
  var $cpuDiv = $("#cpu");
  var cpuDefeated = false;
  var $playerHealth = $(".p-health");
  var playerHealth = 240;
  var $cpuHealth = $(".c-health");
  var cpuHealth = 240;


  // CPU object.
  var cpu = {
    "image": null,
    "punchPower": null,
    "hitPoints": null,
    "taunt": null,
    "punchOutput": null

  }

  var CPU = function(image, punchPower, hitPoints) {
    this.image = image;
    this.punchPower = punchPower;
    this.hitPoints = hitPoints;
    this.taunt = function() {
      console.log("TAUNT!");
    };
    this.punch1 = function() {
      $cpuDiv.animate({
        'left' : "48%"
      });
      $cpuDiv.animate({
        'top' : "47%"
      }, "fast");
      $cpuDiv.animate({
        'top' : "35%"
      });
      $cpuDiv.animate({
        'left' : "50%"
      }, "fast");
    };
    this.punch2 = function() {
      $cpuDiv.animate({
        'top' : "47%"
      }, "fast");
      $cpuDiv.animate({
        'top' : "35%"
      }, "fast");
    };
  }

  // Set up game environment.
  setUpKeyHandler();
  // var punchOutput = Math.floor((Math.random() * 6) + 1);

  var mikeTyson = new CPU("mikeSpritesheet", 20, 200);
  cpuBehaviour();
  var checkHit = setInterval(checkHit, 1);


  function cpuBehaviour() {
    console.log("animation started!");
    var rand = Math.floor((Math.random() * 6) + 1);
    console.log(rand);
    if (rand >= 3) {
      mikeTyson.punch1();
    } else {
      mikeTyson.punch2();
    }
    setTimeout(cpuBehaviour, rand * 1000);
  }

  function checkHit() {
    var hit = false;
    if ($cpuDiv.css("top") == "282px" && ($playerDiv.css("left") > "350px" && $playerDiv.css("left") < "400px")) {
      hit = true;
      playerHealth -= 20;
      if (playerHealth <= 0) {
        clearInterval(checkHit);
        alert("KO, YOU LOSE!");
      }
      console.log(playerHealth);
      $playerHealth.css("width", playerHealth);
    }

    if (hit) {
      console.log("HIT!");
    }

    // console.log($playerDiv.css("left"))
    // var miss = true;
    // if ($playerDiv.css("left") > "350px") {
    //   miss = false;
    // }
    // if ($cpuDiv.css("top") == "282px" && !miss) {
    //   console.log("hit!");
    // }
  }

  // Event handler for player.
  function setUpKeyHandler() {
    $(document.documentElement).keydown(function(event) {
      // Store value of pressed key in pressedKey.
      var pressedKey = event.keyCode;

      switch (pressedKey) {
        // Left key pressed.
        case 37:
          console.log("LEFT");
          slipLeft();
          break;

        // Right key pressed.
        case 39:
          console.log("RIGHT");
          slipRight();
          break;

        // Down key pressed.
        case 40:
          console.log("BLOCK");
          break;

        // 'a' key pressed.
        case 65:
          console.log("JAB");
          playerJab();
          break;

        // 's' key pressed.
        case 83:
          console.log("RIGHT HAND");
          playerRightCross();
          break;
      }
    });
  }

  // This function handles the behaviour associated with the left key.
  function slipLeft() {
    // Ensures no other keys can be pressed during the animation, and that keys can't be stacked.
    $(document.documentElement).off("keydown");
    $playerDiv.animate({
      'left' : "42%"
    });
    $playerDiv.animate({
      'left' : "47%"
    });
    // Don't allow any keys to be pressed for a fraction of a second.
    setTimeout(setUpKeyHandler, 800);
  }

  // This function handles the behaviour associated with the right key.
  function slipRight() {
    // Ensures no other keys can be pressed during the animation, and that keys can't be stacked.
    $(document.documentElement).off("keydown");
    $playerDiv.animate({
      'left' : "52%"
    });
    $playerDiv.animate({
      'left' : "47%"
    });
    // Don't allow any keys to be pressed for a fraction of a second.
    setTimeout(setUpKeyHandler, 800);
  }

  function playerJab() {
    // Ensures no other keys can be pressed during the animation, and that keys can't be stacked.
    $(document.documentElement).off("keydown");
    $playerDiv.animate({
      'top' : "42%"
    }, "fast");
    $playerDiv.animate({
      'top' : "50%"
    }, "fast");
    // Don't allow any keys to be pressed for half a second.
    setTimeout(setUpKeyHandler, 500);
  }

  function playerRightCross() {
    // Ensures no other keys can be pressed during the animation, and that keys can't be stacked.
    $(document.documentElement).off("keydown");
    $playerDiv.animate({
      'top' : "42%"
    });
    $playerDiv.animate({
      'top' : "50%"
    });
    // Don't allow any keys to be pressed for 4/5th of a second.
    setTimeout(setUpKeyHandler, 800);
  }

  function spriteSheet(path, frameWidth, framHeight) {
    this.image = new Image();
    this.frameWidth = frameWidth;
    this.framHeight = frameHeight;

    // calculate the number of frames in a row once the image loads.
    var self = this;
    this.image.onload = function() {
      self.framesPerRow = Math.floor(image.width / frameWidth);
    };

    this.image.src = path;
  }


  function spriteAnimation(spritesheet, frameSpeed, startFrame, endFrame) {
    var animationSequence = [];  // array holding the order of the animation
    var currentFrame = 0;        // the current frame to draw
    var counter = 0;             // keep track of frame rate

    // create the sequence of frame numbers for the animation
    for (var frameNumber = startFrame; frameNumber <= endFrame; frameNumber++)
      animationSequence.push(frameNumber);

    // Update the animation
    this.update = function() {

      // update to the next frame if it is time
      if (counter == (frameSpeed - 1))
        currentFrame = (currentFrame + 1) % animationSequence.length;

      // update the counter
      counter = (counter + 1) % frameSpeed;
    };

    // draw the current frame
    this.draw = function(x, y) {
      // get the row and col of the frame
      var row = Math.floor(animationSequence[currentFrame] / spritesheet.framesPerRow);
      var col = Math.floor(animationSequence[currentFrame] % spritesheet.framesPerRow);

      ctx.drawImage(
        spritesheet.image,
        col * spritesheet.frameWidth, row * spritesheet.frameHeight,
        spritesheet.frameWidth, spritesheet.frameHeight,
        x, y,
        spritesheet.frameWidth, spritesheet.frameHeight);
    };
  }

});
