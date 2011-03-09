//PROTOTYPAL INHERITANCE================================================================================================

//utility function for basic prototypal inheritance pattern - objects inherit from other objects
//if parent object created with a constructor function, both 'own' and prototype properties are inherited
//Note: in ES5, this pattern becomes official part of the language through Object.create() method
function object(o){
    function F(){};
    F.prototype=o;
    return new F();
}

var parent={name:'papa'};
var child=object(parent);
child.name; //'papa'


//INHERITANCE BY COPYING================================================================================================

//Shallow copy - object references maintained
function extend(parent,child){
    var i;
    child=child||{};
    for(i in parent){
        if(parent.hasOwnProperty(i)){
            child[i]=parent[i];
        }
    }
    return child;
}

var dad={name:'Alex'};
var kid=extend(dad);
kid.name; //'Adam'

//Deep copy - broken references for objects other than functions ({} and [])
function extendDeep(parent,child){
    var i,
        toStr=Object.prototype.toString,
        astr="[object Array]";
    child=child||{};
    for(i in parent){
        if(parent.hasOwnProperty(i)){
            if(typeof parent[i]==='object'){
                child[i]=(toStr.call(parent[i])===astr)?[]:{};//developer.mozilla.org... Object.toString
                extendDeep(parent[i],child[i]);
            }
            else{
                child[i]=parent[i];
            }
        }
    }
    return child;
}

var dad={
    counts:[1,2,3],
    reads:{paper:true}
};
var kid=extendDeep(Dad);
kid.counts.push(4);
kid.counts.toString();//'1,2,3,4'
dad.counts.toString();//'1,2,3'


//MIXIN=================================================================================================================

//Shallow
function mix(){
    var arg,
        prop,
        child={};
    for (arg=0;arg<arguments.length;arg++){
        for(prop in arguments[arg]){
            if(arguments[arg].hasOwnProperty(prop)){
                child[prop]=arguments[arg][prop];
            }
        }
    }
    return child;
}


