/*
- There’s a check whether this is an instance of Sandbox and if not (meaning Sandbox() was called without new), we call the function again as a constructor.
- You can add properties to this inside the constructor. You can also add properties to the prototype of the constructor.
- The required modules can be passed as an array of module names, or as individual arguments, or with the * wildcard (or omitted), which means we should load all available modules. Notice that in this example implementation we don’t worry about loading required functionality from additional files, but that’s definitely an option. This is something supported by YUI3 for example. You can load only the most basic module (also known as a “seed”) and whatever modules you require will be loaded from external files using a naming convention where the filenames correspond to module names.
- When we know the required modules, we initialize them, which means we call the function that implements each module.
- The last argument to the constructor is the callback. The callback will be invoked at the end using the newly created instance. This callback is actually the user’s sandbox, and it gets a box object populated with all the requested functionality.
*/

function Sandbox(){

    //VAR
        //turn arguments into an array
    var args=Array.prototype.slice.call(arguments),
        //last argument is the callback
        callback=args.pop(),
        //modules can be passed as an array or as individual parameters
        modules=(args[0]&&typeof args[0]==='string')?args:args[0],
        i;

    //make sure function is called as a constructor
    if(!(this instanceof Sandbox)){
        return new Sandbox(modules,callback);
    }

    //add properties to 'this' as needed (remember that we're in a constructor)
    this.a=1;
    this.b='2';

    //add modules to the core 'this' object
    //no modules or '*' means use all available
    if(!modules||modules==='*'){
        modules=[];
        for(i in Sandbox.modules){
            if(Sandbox.modules.hasOwnProperty(i)){
                modules.push(i);
            }
        }
    }

    //initialize the required modules
    for(i=0;i<modules.length;i++){
        Sandbox.modules[modules[i]](this);
    }

    //execute the callback
    callback();
}

//prototype properties as needed
Sandbox.prototype={
    name:'My App',
    getName:function(){
        return this.name;
    }
};