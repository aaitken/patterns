//Magazine subscriptions example
//Publisher 'paper' puts out a daily newspaper and monthly magazine
//Subscriber 'joe' to be notified when these events happen

//subscribers = array
//subscribe() = add to array of subscribers
//unsubscribe() = remove from the subscribers array
//publish() = loop through subscribers and call the methods they provided when they signed up
//Methods above need a type parameter so that subscribers can subscribe to only a subset of events
//As the members are generic to all publishers, they are implemented in a stand-alone abject then mixed-in as needed

//generic
var publisher={
    subscribers:{
        any:[]
    },
    subscribe:function(fn,type){
        type=type||'any';
        if(typeof this.subscribers[type]==='undefined'){
            this.subscribers[type]=[];
        }
        this.subscribers[type].push(fn);
    },
    unsubscribe:function(fn,type){
        this.visitSubscribers('unsubscribe',publication,type);
    },
    publish:function(publication,type){
        this.visitSubscribers('publish',publication,type);
    },
    visitSubscribers:function(action,arg,type){

        //private vars
        var pubtype=type||'any',
            subscribers=this.subscribers[pubtype],
            i,
            max=subscribers.length;

        for(i=0;i<max;i++){
            if(action==='publish'){
                subscribers[i](arg);
            }
            else{
                if(subscribers[i]===arg){
                    subscribers.splice(i,1);
                }
            }
        }
    }
};

//function for turning an object into a publisher through mix-in of generic publisher's methods
function makePublisher(o){
    var i;
    for(i in publisher){
        if(publisher.hasOwnProperty(i)&&typeof publisher[i]==='function'){
            o[i]=publisher[i];
        }
    }
    o.subscribers={
        any:[]
    };
}

//implement the paper object
var paper={
    daily:function(){
        this.publish('big news today');
    },
    monthly:function(){
        this.publish('interesting analysis','monthly');
    }
};

//make paper object a publisher
makePublisher(paper);

//object joe, which will subscribe
var joe={
    drinkCoffee:function(paper){
        console.log('Just read '+paper);
    },
    sundayPreNap:function(monthly){
        console.log('About to fall asleep reading this '+monthly);
    }
};

//subscription
paper.subscribe(joe.drinkCoffee);
paper.subscribe(joe.sundayPreNap,'monthly');

paper.daily();//console -> Just read big news today
paper.daily();//console -> Just read big news today
paper.daily();//console -> Just read big news today
paper.monthly();//console -> About to fall asleep reading this interesting analysis



