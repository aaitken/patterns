//namespace creation - dependent on ocp-namespace
GNS.namespace('GNS.utilities.module');

//Object Creation
GNS.utilities.module=(function(){

    //VAR
        //dependencies
    var uobj=GNS.utilities.object,
        uprp=GNS.utilities.property,
        //private properties
        propone='one',
        proptwo='two',
        //private methods
        methone=function(){
            //...
        },
        methtwo=function(){
            //...
        },
        Constr;

    //one-time init procedures
    //...

    //if returning a constructor
    Constr=function(){
        //...
    };
    Constr.prototype={
        //...
    };

    //PUBLIC API
    //basic
    return {
        proppub:'one',
        methpub:function(){
            //...
        }
    }
    //Alternatively (or in combination), reveal private methods per revelation pattern
    return{
        propone:propone,
        methone:methone
    }
    //Or to return the constructor
    return Constr;

}());

//Importing Globals
GNS.utilities.module=(function(app,global){

    //references to the global GNS namespace and the global object itself now localized for faster
    //'global symbol resolution'

}(GNS,this));