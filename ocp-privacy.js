//CONSTRUCTOR===========================================================================================================

//Basic
function Gadget1(){
    //private member
    var name='iPod';
    //public (privileged) function
    this.getName=function(){
        return name;
    };
};

//With generic access (pattern by AMA)
function Gadget2(){
    //private members
    var members={
            name:'iPod',
            maker:'apple',
            boss:'jobs'
        };
    //public members
    this.test='test';
    //public (privileged) function - ...'CMember' to indicate a constructor member vs a prototype member (below)
    this.getCMember=function(key){
        return members[key];
    };
};

//anti-pattern (as object/array references provide ongoing access)
function Gadget3(){
    //private members
    var members={
            name:'iPod',
            maker:'apple',
            boss:'jobs'
        };
    //public (privileged) function
    this.getMember=function(){
        return members;
    };
};

//PROTOTYPE=============================================================================================================

//Private Members
Gadget2.prototype=(function(){
    var members={
            first:'Alex',
            last:'Aitken'
        };
    return {
        getPMember:function(key){
            return members[key];
        },
        getPublic:function(){
            return this.test;
        }
    };
}());

//Revealing private functions as public methods (external clobbering does not affect internal functionality)
Gadget3.prototype=(function(){
    var first=function(){
            return 'Alex';
        },
        full=function(){
            return first()+' Aitken';
        };
    return {
        first:first,
        full:full
    };
}());

//OBJECT LITERAL========================================================================================================

var gadget4=(function(){
    //private members
    var members={
        name:'iPod',
        maker:'apple',
        boss:'jobs'
    };
    //public
    return {
        getMember:function(key){
            return members[key];
        }
    };
}());


