//Magazine subscriptions example
//Publisher 'paper' puts out a daily newspaper and monthly magazine
//Subscriber 'joe' to be notified when these events happen so it can fire its own associated avents

//subscribers = array
//subscribe() = add to array of subscribers
//unsubscribe() = remove from the subscribers array
//publish() = loop through subscribers and call the methods they provided when they signed up
//Methods above need a type parameter so that subscribers can subscribe to only a subset of events
//As the members are generic to all publishers, they are implemented in a stand-alone abject then mixed-in as needed

var pubsub={
    publisher:{
        subscribers:{
            any:[]//default catcher
        },
        subscribe:function(fn,type){
            type=type||'any';
            if(typeof this.subscribers[type]==='undefined'){
                this.subscribers[type]=[];//if subscription passes a type we don't have (monthly), make new array for this
            }
            this.subscribers[type].push(fn);//push subscriber function to default 'any' or explicitly-provided type array
        },
        unsubscribe:function(fn,type){
            this.visitSubscribers('unsubscribe',fn,type);
        },
        publish:function(publication,type){//publication is what we're putting out, type defines who we put it out to
            this.visitSubscribers('publish',publication,type);
        },
        visitSubscribers:function(action,arg,type){//communicate the published event to subscribers - arg is parameter of client function for 'publish,' client function itself for unsubscribe
    
            var pubtype=type||'any',
                subscribers=this.subscribers[pubtype],
                i,
                max=subscribers.length;
    
            for(i=0;i<max;i++){
                if(action==='publish'){
                    subscribers[i](arg);//fire that bad boy
                }
                else{//action==='unsubscribe'
                    if(subscribers[i]===arg){
                        subscribers.splice(i,1);
                    }
                }
            }
        }
    },
    //function for turning an object into a publisher through mix-in of generic publisher's methods
    makePublisher:function(o){
        var i;
        for(i in this.publisher){
            if(this.publisher.hasOwnProperty(i)&&typeof this.publisher[i]==='function'){
                o[i]=this.publisher[i];
            }
        }
        o.subscribers={
            any:[]//,//paper.subscribe(joe.sundayPreNap,'monthly'); dynamically adds monthly array to paper.subscribers
            //monthly:[] 
        };
    }
};


//implement the paper object
//This object declares both what it will publish, and who will subscribe
var paper={};
pubsub.makePublisher(paper);//make paper object a publisher (give it the core publish and subscribe methods, with others)
paper.daily=function(){
    this.publish('big news today');//publish mix-in loops through subscribers + fires methods they gave on subscribing with 'big news today' (in this case) as method argument
};
paper.monthly=function(){
    this.publish('interesting analysis','monthly');
};

//object joe, which will subscribe
var joe={
    drinkCoffee:function(paper){//paper (and monthly, below) argument consumed as 'arg' by 
        console.log('Just read '+paper);
    },
    sundayPreNap:function(monthly){
        console.log('About to fall asleep reading this '+monthly);
    }
};

//subscription
paper.subscribe(joe.drinkCoffee);//joe.drinkCoffee added to 'any' array
paper.subscribe(joe.sundayPreNap,'monthly');//joe.sundayPreNap added to 'monthly' array

paper.daily();//console -> Just read big news today
paper.daily();//console -> Just read big news today
paper.daily();//console -> Just read big news today
paper.monthly();//console -> About to fall asleep reading this interesting analysis
paper.unsubscribe(joe.sundayPreNap,'monthly');
paper.monthly();