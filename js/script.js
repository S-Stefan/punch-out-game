$(function() {

  // Globals.
  var $playerDiv = $("#player");
  var $playerHealth = $(".p-health");
  var playerHealth = 240;
  var $playerImg = $(".player-img");


  var $cpuDiv = $("#cpu");
  var $cpuHealth = $(".c-health");
  var cpuHealth = 240;
  var $cpuImg = $(".cpu-img");

  var cpuDefeated = false;



  // CPU constructor.
  var CPU = function(sprite, punchPower, hitPoints) {
    this.sprite = sprite;
    this.punchPower = punchPower;
    this.hitPoints = hitPoints;
    this.taunt = function() {
      console.log("TAUNT!");
    };
    this.punch1 = function() {
      $cpuDiv.animate({
        'left' : "48%"
      }, "fast");
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

  // Animations.
  var macAnimations = {
    "macDefault": ["images/little-mac-1.png", "images/little-mac-2.png", "images/little-mac-1.png", "images/little-mac-2.png"],

    "macJab": ["images/little-mac-2.png", "images/mac-jab-part1.png", "images/mac-jab-finish.png"],

    "macCross": ["images/little-mac-2.png", "images/mac-cross-part1.png", "images/mac-cross-part2.png", "images/mac-cross-part3.png", "images/mac-cross-finish.png"]

  };

  var mikeAnimations = {
    "mikeDefault": [[true],["images/mike-3.png", "images/mike-1.png", "images/mike-2.png", "images/mike-3.png"]]
  };

  // var animationArray = mikeAnimations.mikeDefault;
  // var bool = true;

  // runAnimation(mikeAnimations.mikeDefault, $cpuImg, bool);
  //
  // function runAnimation(array, character, repeating) {
  //   var counter = 0;
  //   setInterval(function() {
  //     counter++;
  //   }, 500);
  //
  //   while (counter < array.length) {
  //     character.attr("src", array[counter]);
  //   }
  //
  //   if (!repeating) {
  //     console.log("Animation done")
  //     return;
  //   } else {
  //     runAnimation(array, character, repeating);
  //   }
  // }

  // var animation = mikeAnimations.mikeDefault;
  // var current = 0;
  // // setInterval(animateSprite(animation, $playerImg), 1000);
  // var animateDefaultMike = setInterval(animateSprite, 500);
  //
  // // Function to animate sprite. Takes parameters for array of sprites and the element that contains the sprites on the screen.
  // function animateSprite() {
  //   current++;
  //   if (current >= animation.length) {
  //     console.log("end of animation");
  //     current = 0;
  //   }
  //   $cpuImg.attr("src", animation[current]);
  // }
  // function animateSprite(animation, element, max) {
  //   current++;
  //   if (current >= max) {
  //     console.log("end of animation");
  //     current = 0;
  //   }
  //   element.attr("src", animation[current]);
  // }

  // Set up game environment.
  setUpKeyHandler();
  // var punchOutput = Math.floor((Math.random() * 6) + 1);

  var mikeTyson = new CPU("mikeSpritesheet", 25, 240);
  // Let the cpu start behaviour after 3 seconds.
  setTimeout(cpuBehaviour, 3000);
  // Constantly check if the CPU has hit the player.
  var checkHit = setInterval(checkHit, 10);


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
    if ($cpuDiv.css("top") == "282px" && ($playerDiv.css("left") > "370px" && $playerDiv.css("left") < "420px")) {
      hit = true;
      playerHealth -= mikeTyson.punchPower;

      if (playerHealth < 120) {
        $playerHealth.css("background-color", "orange");
      }

      if (playerHealth < 50) {
        $playerHealth.css("background-color", "red");
      }

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
      'left' : "45%"
    });
    $playerDiv.animate({
      'left' : "50%"
    });
    // Don't allow any keys to be pressed for a fraction of a second.
    setTimeout(setUpKeyHandler, 800);
  }

  // This function handles the behaviour associated with the right key.
  function slipRight() {
    // Ensures no other keys can be pressed during the animation, and that keys can't be stacked.
    $(document.documentElement).off("keydown");
    $playerDiv.animate({
      'left' : "55%"
    });
    $playerDiv.animate({
      'left' : "50%"
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

    // Take away cpu health.
    cpuHealth -= 5;

    $cpuHealth.css("width", cpuHealth);
    if (cpuHealth <= 0) {
      alert("YOU WIN!!!");
    }

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

    // Take away cpu health.
    cpuHealth -= 15;
    $cpuHealth.css("width", cpuHealth);
    if (cpuHealth <= 0) {
      alert("YOU WIN!!!");
    }

    // Don't allow any keys to be pressed for 4/5th of a second.
    setTimeout(setUpKeyHandler, 800);
  }

});
