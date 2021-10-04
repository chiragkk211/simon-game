var userClickedPattern = []
var gamePattern=[]
var buttonColours = ["red","blue","green","yellow"]
var started = false
var level=0



$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level "+ level)
    nextSequence()
    started=true
  }
})


$(".btn").click(function(){
  var userChosenColour = this.id
  userClickedPattern.push(userChosenColour)
  console.log(userClickedPattern)

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1)
})





function nextSequence(){
      userClickedPattern=[]
  level++;
    $("#level-title").text("Level "+ level)
  var randomNumber=Math.floor((Math.random()*4))
  var randomChosenColour = buttonColours[randomNumber]

  gamePattern.push(randomChosenColour)

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  console.log(gamePattern)
  playSound(randomChosenColour)



}


function playSound(name){
  if(name=="green"){
    var buttonAudio = new Audio("sounds/green.mp3")
    buttonAudio.play()
  }
  else if (name=="red") {
    var buttonAudio = new Audio("sounds/red.mp3")
    buttonAudio.play()
  }
  else if (name=="yellow") {
    var buttonAudio = new Audio("sounds/yellow.mp3")
    buttonAudio.play()
  }
  else if (name=="blue") {
    var buttonAudio = new Audio("sounds/blue.mp3")
    buttonAudio.play()
  }
}


function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed")
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed")
  },100)
}


function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
      console.log("success")
    if(userClickedPattern.length==gamePattern.length){

    setTimeout(function(){nextSequence()},1000)
  }


  } else{
    console.log("wrong")
    var wrongAudio = new Audio("sounds/wrong.mp3")
    $("body").addClass("game-over")
    setTimeout(function(){
      $("body").removeClass("game-over")
    },200)
    $("h1").text("Game Over, Press Any Key to Restart ")
    wrongAudio.play()
    startOver()
  }
}

function startOver(){
  level=0
  gamePattern=[]
  started=false
}
