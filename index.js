let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;
let score = 0;

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
    score = 0;
}

function playSound(name){
    let playerAudio = new Audio("sounds/" + name + ".mp3");
    playerAudio.play();
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor((Math.random() * 4));
    //console.log(randomNumber);
    let randomChosenColour = buttonColours[randomNumber];
    //console.log(randomChosenColour);
    gamePattern.push(randomChosenColour);
    //console.log(gamePattern); 
    /* add change of sound here after lvl 10 */
    playSound(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100); 
};

/* function nextSequence() {
    
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
} */

function animatePress(currentColour){
       $("#" + currentColour).addClass("pressed");
       setTimeout(function () {
       $("#" + currentColour).removeClass("pressed");
       }, 100);   
}
/* Alt way for Function animatePress */

/* function animatePress(currentColour){
    $("#" + currentColour).fadeOut(100).fadeIn(100);
} */

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        score += 5;
        $("#score").text("Score: " + score);
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function() {
            nextSequence();
            }, 1000);
        }
        } else {
        playSound("wrong");
        //console.log("wrong"); 
        $("body").addClass("game-over");
        setTimeout(function() {
        $("body").removeClass("game-over");
        }, 200); 
        $("#level-title").text("Game Over, Pres Enter to Restart");     
        startOver()    
        }
    }

$(".btn").click(function(){
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    console.log(userClickedPattern);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length -1);  
})

$(document).keypress(function(e){
    let keycode = (e.keyCode ? e.keyCode : e.which);
          if(keycode == '13' && !started) {
            //console.log("game started")
            $("#level-title").text("Level " + level)
            $("#score").css("visibility", "visible");    
            $("#score").text("Score: " + score);
            nextSequence();
            started = true;
          }
});



