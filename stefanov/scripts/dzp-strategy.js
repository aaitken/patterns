//Select algorithms from a consistent interface at runtime
//Validation example - create one validator object with a 'validate' method.
//Client code calls validate for any type of form, but chooses the checks to perform.

//Example data
var data={
    nameFirst:'Super',
    nameLast:'Man',
    age:'unknown',
    userName:'o_0'
};

//Example validator configuration
//last name not required, anything for first name, age is a number, user name aplhanumeric w/no special characters
validator.config={
    nameFirst:'isNonEmpty',
    age:'isNumber',
    userName:'isAlphaNum'
}

//validate and print errors to console
validator.validate(data);
if(validator.hasErrors()){
    console.log(validator.messages.join('\n'));
}

//Implementation
//available algorithms for the checks are objects with a predefined interface -
//they provide a validate() method and a one-line info message to help with errors
validator.types.isNonEmpty={
    validate:function(value){
        return value !== '';//true if valid
    },
    instructions:'the value cannot be empty'
};
validator.types.isNumber={
    validate:function(value){
        return !isNaN(value);
    },
    instructions:'the value can only be a valid number, e.g. 1, 3.14, or 2010'
};
validator.types.isAlphaNum={
    validate:function(value){
        return !/[^a-z0-9]/i.test(value);
    },
    instructions:'the value can only contain characters and numbers, no special symbols'
};

//Core validator object
var validator={

    //all available checks
    types:{},

    //error messages in the current validation
    messages:[],

    //current validation config
    config:{},

    //The interface method
    //data = key/value pairs
    validate:function(data){

        //private vars
        var i,
            msg,
            type,
            checker,
            resultOk;

        //reset all messages
        this.messages=[];

        for(i in data){
            if(data.hasOwnProperty(i)){
                type=this.config[i];
                checker=this.types[type];
                if(!type){
                    continue;//no need to validate - break loop and continue with next value
                }
                if(!checker){//uh-oh
                    throw {
                        name:'ValidationError',
                        message:'No handler to validate type '+type
                    };
                }
                resultOk=checker.validate(data[i]);
                if(!resultOk){
                    msg='Invalid value for *'+i+'*, '+checker.instructions;
                    this.messages.push(msg);
                }
            }
        }
        return this.hasErrors();
    },

    //helper
    hasErrors:function(){
        return this.messages.length!==0;
    }

};