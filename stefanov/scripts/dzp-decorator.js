//List Implementation with single method being decorated
//for multiple methods, helper method can work with a decorators property that is a
//key-value object in the form of method:array of decorators

//var sale=new Sale(100);
//sale.decorate('fedtax');
//sale.decorate('quebec');
//sale.decorate('money');
//sale.getPrice();

//Constructor
function Sale(price){
    this.price=(price>0)||100; //not sure a/b price>0
    this.decorators=[];//decorators implemented as an own property
}

//Decorators object with properties
Sale.decorators={};
Sale.decorators.fedtax={
    getPrice:function(price){
        return price+(price*(5/100));
    }
};
Sale.decorators.quebec={
    getPrice:function(price){
        return price+(price*(7.5/100));
    }
};
Sale.decorators.money={
    getPrice:function(price){
        return '$'+price.toFixed(2);
    }
};

Sale.prototype.decorate=function(decorator){
    this.decorators.push(decorator);
};
Sale.prototype.getPrice=function(){
    var price=this.price,
        i,
        max=this.length,
        name;
    for(i=0;i<max;i++){
        name=this.decorators[i];
        price=Sale.decorators[name].getPrice(price);
    }
    return price;
};