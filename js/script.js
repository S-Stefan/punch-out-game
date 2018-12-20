$(function() {

  // Globals.
  var $playerDiv = $("#player");
  var $playerHealth = $(".p-health");
  var playerHealth = 295;
  var $playerImg = $(".player-img");

  var $cpuDiv = $("#cpu");
  var $cpuHealth = $(".c-health");
  var cpuHealth = 295;
  var $cpuImg = $(".cpu-img");

  var cpuDefeated = false;

  // CPU constructor.
  var CPU = function(sprite, punchPower, hitPoints) {
    this.sprite = sprite;
    this.punchPower = punchPower;
    this.hitPoints = hitPoints;

    this.punch1 = function() {
      // call mikeTyson animation.
      animate($cpuImg, mikeAnimations.mikePunch1);

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
      // call mikeTyson animation.
      animate($cpuImg, mikeAnimations.mikePunch2);

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

    "macJab": ["images/mac-jab-part1.png", "images/mac-jab-finish.png", "images/mac-jab-part1.png", "images/little-mac-1.png"],

    "macCross": ["images/little-mac-2.png", "images/mac-cross-part1.png", "images/mac-cross-part2.png", "images/mac-cross-part3.png", "images/mac-cross-part2.png", "images/mac-cross-part1.png", "images/little-mac-1.png"],

    "macLeftSlip": ["images/little-mac-2.png", "images/little-mac-1.png", "images/mac-left-slip.png", "images/mac-left-slip.png", "images/little-mac-2.png", "images/little-mac-1.png"],

    "macSlipRight": ["images/little-mac-1.png", "images/little-mac-2.png", "images/mac-right-slip.png", "images/mac-right-slip.png", "images/little-mac-2.png", "images/little-mac-1.png"]

  };

  var mikeAnimations = {
    "mikeDefault": ["images/mike-3.png", "images/mike-1.png", "images/mike-2.png", "images/mike-3.png"],

    "mikePunch1": ["images/mike-1.png", "images/mike-2.png", "images/mike-4.png", "images/mike-5.png", "images/mike-6.png", "images/mike-6.png", "images/mike-punch1-finish.png", "images/mike-punch1-finish.png", "images/mike-5.png", "images/mike-3.png", "images/mike-2.png", "images/mike-1.png", "images/mike-3.png"],

    "mikePunch2": ["images/mike-7.png", "images/mike-6.png", "images/mike-6.png", "images/mike-3.png", ],

    "getHit": ["images/mike-ko1.png", "images/mike-ko1.png", "images/mike-3.png"]
  };

  // Set up game environment.
  setUpKeyHandler();
  // Create cpu object.
  var mikeTyson = new CPU("mikeSpritesheet", 20, 295);
  // Let the cpu start behaviour after 3 seconds.
  setTimeout(cpuBehaviour, 3000);
  // Constantly check if the CPU has hit the player.
  var checkHit = setInterval(checkHit, 10);
  // Constantly check if cpu has been hit.
  var checkCpuHit = setInterval(checkCpuHit, 5);

  // This iffe (immedately invoked function expressions) is recursive and constantly generates random intervals to run the cpu attacks.
  (function loop() {
    var rand = randGenerator(6)*1000;
    setTimeout(function() {
            // If someone has been defeated, return and exit the function loop.
            if (cpuHealth <= 0 || playerHealth <= 0) {
              return;
            } else {
              // Otherwise keep running cpuBehaviour.
              cpuBehaviour();
              loop();
            }
    }, rand);
  }());

  // Function for randomly generating numbers from 1 to timeFrame.
  function randGenerator(timeFrame) {
    var rand = Math.floor((Math.random() * timeFrame) + 1);
    return rand;
  }

  // Function that randomly chooses and runs one of the CPU's attacks.
  function cpuBehaviour() {
    // Rand controls the logic gates for setting the punch that is called.
    var rand = randGenerator(2);
    if (rand == 1) {
      mikeTyson.punch1();
    } else {
      mikeTyson.punch2();
    }
  }

  // This function checks if the cpu has been hit.
  function checkCpuHit() {
    // console.log($playerDiv.css("top"));
    if ($playerDiv.css("top") == "252px") {
      // call mikeTyson animation.
      animate($cpuImg, mikeAnimations.getHit);
    }
    $cpuHealth.css("width", cpuHealth);

    if (cpuHealth < 145) {
      $cpuHealth.css("background-color", "orange");
    }

    if (cpuHealth < 50) {
      $cpuHealth.css("background-color", "red");
    }

    // If the cpu's health less than or equal to 0, run youWin.
    if (cpuHealth <= 0) {
      youWin();
    }
  }

  // Checks if the CPU has hit the player within the hit radius.
  function checkHit() {
    // If player is within HIT radius.
    if ($cpuDiv.css("top") == "282px" && ($playerDiv.css("left") > "370px" && $playerDiv.css("left") < "420px")) {

      playerHealth -= mikeTyson.punchPower;
      playSound($("#upper-cut"), 350);

      if (playerHealth < 120) {
        $playerHealth.css("background-color", "orange");
      }

      if (playerHealth < 50) {
        $playerHealth.css("background-color", "red");
      }

      if (playerHealth <= 0) {
        youWin();
      }
      // Adjust GUI health.
      $playerHealth.css("width", playerHealth);
    }
  }

  // Takes parameters for the img element of the character you wish to animate as well as the animation you would like to run.
  function animate(character, animationArray) {
    for (i=0; i<animationArray.length; i++) {
      // We can use setTimout in a for loop by wrapping it in a IIFE.
      (function(i) {
        // In order to setTimout or setInterval a function with parameters/arguments, you need to timeout an anonymous function which will then call your function with parameters when called.
        setTimeout(function() {
          displaySprite(character, animationArray, i);
        }, 100 * (i + 1));
      })(i);
    }
  }

  // Takes parameters for the character you wish to animate, the animation array, and the current index in the array you wish to display.
  function displaySprite(character ,animationArray, arrayIndex) {
    // Change the elements image path to one from the given array at the given index.
    character.attr("src", animationArray[arrayIndex]);
  }

  function playSound(element, soundLength) {
    element[0].currentTime = 0;
    setTimeout(function() {
      element[0].play();
    }, 100);
    setTimeout(function() {
      element[0].pause();
      element[0].currentTime = 0;
    }, soundLength);
  }

  // This function is called when the player or cpu wins.
  function youWin() {
    $(document.documentElement).off("keydown");
    clearInterval(checkHit);
    clearInterval(checkCpuHit);

    if (cpuHealth <= 0) {
      $cpuImg.attr('src', "images/mike-ko2.png");
      $("#cpu-hp").addClass("hide");
      $(".cpu-name").addClass("hide");
      $(".player-name").html("YOU WIN");
      $(".player-name").css('color', "Gold");
      $(".play-again-button").removeClass("hide");
    } else {
      $playerImg.attr('src', "images/mac-defeated.png");
      $("#player-hp").addClass("hide");
      $(".player-name").addClass("hide");
      $(".cpu-name").html("TYSON WINS");
      $(".cpu-name").css('color', "Gold");
      $(".play-again-button").removeClass("hide");
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
          slipLeft();
          break;

        // Right key pressed.
        case 39:
          slipRight();
          break;

        // 'a' key pressed.
        case 65:
          playerJab();
          break;

        // 's' key pressed.
        case 83:
          playerRightCross();
          break;
      }
    });
  }

  // This function handles the behaviour associated with the left key.
  function slipLeft() {
    // Ensures no other keys can be pressed during the animation, and that keys can't be stacked.
    $(document.documentElement).off("keydown");

    // call slipLeft animation.
    animate($playerImg, macAnimations.macLeftSlip);

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

    // call slipRight animation.
    animate($playerImg, macAnimations.macSlipRight);

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

    // call jab animation.
    animate($playerImg, macAnimations.macJab);
    playSound($("#jab"), 200);

    $playerDiv.animate({
      'top' : "42%"
    }, "fast");
    $playerDiv.animate({
      'top' : "50%"
    }, "fast");


    // Take away cpu health.
    cpuHealth -= 5;

    // Don't allow any keys to be pressed for half a second.
    setTimeout(setUpKeyHandler, 500);
  }

  function playerRightCross() {
    // Ensures no other keys can be pressed during the animation, and that keys can't be stacked.
    $(document.documentElement).off("keydown");

    // call cross animation.
    animate($playerImg, macAnimations.macCross);
    playSound($("#cross"), 400);

    $playerDiv.animate({
      'top' : "42%"
    });
    $playerDiv.animate({
      'top' : "50%"
    });

    // Take away cpu health.
    cpuHealth -= 15;

    // Don't allow any keys to be pressed for a second.
    setTimeout(setUpKeyHandler, 1000);
  }

});
