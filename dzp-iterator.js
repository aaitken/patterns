//Sample implementation using an ordinary array

var agg=(function(){

    //closure vars globally accessible by returned obj
    var index=0,
        data=[1,2,3,4,5],
        length=data.length;

    return{
        //get the next element
        next:function(){
            var element;
            if(!this.hasNext()){
                return null;
            }
            element=data[index];
            index++;
            return element;
        },
        //test for a next element
        hasNext:function(){
            return index<length;
        },
        //reset pointer to first element
        rewind:function(){
            index=0;
        },
        //return the current element
        current:function(){
            return data[index];
        }
    }
}());
