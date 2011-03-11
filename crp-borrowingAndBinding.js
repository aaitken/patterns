//BORROWING (AND BINDING)===============================================================================================
//Using call/apply function methods lets us borrow select methods from existing objects
//without the overhead of copying a whole bunch of methods/properties we DON'T need

//pattern
notmyobj.doStuff.call(myobj,param1,p2,p3);
notmyobj.doStuff.apply(myobj,[param1,p2,p3]);

//Example: borrowing from Array object
function f(){
    var args=[].slice.call(arguments,1,3);
    return args;
}
f(1,2,3,4,5,6); //returns [2,3]


//BINDING

//Everything's good...
var one={
    name:'object',
    say:function(greet){
        return greet+', '+this.name;
    }
};
one.say('hi');//'hi, object'
var two={
    name:'another object'
};
one.say.apply(two,['hello']);//'hello, another object'

//until function pointer is assigned to a global... (this===global)
var say=one.say;
say('hoho');//'hoho, undefined'

//or passed as a callback (this===global)
var three={
    name:'yet another object',
    method:function(callback){
        return callback('hola');
    }
};
three.method(one.say);//'hola, undefined'

//in these cases we need to bind the object to its method
//even after bind (below) returns, the inner function will have access to o and m, which will point to the original
//object and method
function bind(o,m){
    return function(){
        return m.apply.o(o,[].slice.call(arguments));
    }
}

var twosay=bind(two,one.say);
twosay('yo');//'yo, another object'


//ES5 Native binding====================================================================================================
//EcmaScript 5 spec adds a bind method to Function.prototype = binding becomes as easy as call
//or apply. Function below makes implementation bullet-proof for pre-ES5 environments
if(typeof Function.prototype.bind==='undefined'){
    Function.prototype.bind=function(thisArg){
        var fn=this,
            slice=Array.prototype.slice,
            args=slice.call(arguments,1);
        return function(){
            return fn.apply(thisArg,args.concat(slice.call(arguments)));
        };
    }
}

var twosay2=one.say.bind(two);
twosay2('Bonjour');//'Bonjour, another object'

var twosay3=one.say.bind(two, 'Enchante');
twosay3();//'Enchante, another object'