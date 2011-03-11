//var corolla=CarMaker.factory('compact');
//var solstice=CarMaker.factory('convertible');
//var cherokee=CarMaker.factory('suv');
//corolla.drive() -> 'Vroom, I have 4 doors'
//solstice.drive() -> 'Vroom, I have 2 doors'
//cherokee.drive() -> 'Vroom, I have 17 doors'

//parent constructor
function CarMaker(){};

//shared method
CarMaker.prototype.drive=function(){
    return 'Vroom, I have '+this.doors+' doors';
};

//static method
CarMaker.factory=function(type){
    var constr=type,
        newcar;

    //error if the constructor doesn't exist
    if(typeof CarMaker[constr]!=='function'){
        throw {
            name:'Error',
            message:constr+' doesn\'t exist'
        };
    }

    //at this point we know that the constructor exists
    //below it inherits the parent, but only once
    if(typeof CarMaker[constr].prototype.drive!=='function'){
        CarMaker[constr].prototype=new CarMaker();
    }

    //create a new instance
    newcar=new CarMaker[constr]();
    //optionally call some methods... and then return
    return newCar;
};

//define specific car makers
CarMaker.compact=function(){
    this.doors=4;
};
CarMaker.convertible=function(){
    this.doors=2;
};
CarMaker.suv=function(){
    this.doors=17;
};
