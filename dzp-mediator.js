//Game example - two players are given one minute to press a button as many times as they can. Scoreboard keep
//current score.

//Participating Objects
//player 1
//player 2
//scoreboard
//mediator

//Other than the mediator, none of the objects know anything about any of the other objects.


//Player constructor
function Player(name){
    this.points=0;
    this.name=name;
}
Player.prototype.play=function(){
    this.points+=1;
    mediator.played();
}

//scoreboard
var scoreboard={

    //html element to be updated
    element:document.getElementById('results'),

    //update the score display
    update:function(score){

        var i,
            msg='';

        for(i in score){
            if(score.hasOwnProperty(i)){
                msg +='\
                    <p>\
                        <strong>'+i+'<\/strong>: '+score[i]+'\
                    <\/p>';
            }
        }
        this.element.innerHTML=msg;
    }
};

//mediator object
var mediator={

    //all the players
    players:{},

    //initialization
    setup:function(){

        var players=this.players;

        players.home=new Player('Home');
        players.guest=new Player('Guest');
    },

    //someone plays - update the score
    played:function(){

        var players=this.players,
            score={
                Home:players.home.points,
                Guest:players.guest.points
            };

        scoreboard.update(score);
    },

    //handle user interactions
    keypress:function(e){
        e=e||window.event;//IE
        if(e.which===49){//Key '1'
            mediator.players.home.play();
            return;
        }
        if(e.which===48){//Key '0'
            mediator.players.guest.play();
            return;
        }
    }
};


//Set up and tear down the game
mediator.setup();
window.onkeypress=mediator.keypress;

//game over in 30 seconds
setTimeout(function(){
    window.onkeypress=null;
    alert('Game over');
},30000);