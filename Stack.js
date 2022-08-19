
class Stack{
    constructor(){
        
        this.arr=new Array(4);
        this.first=0;
        this.last=0;
    
    }

    isEmpty(){
        return this.first==this.last;
    }

    pop(){
        return this.arr[--this.last];
    }

    push(ele){
        this.arr[this.last++]=ele;
    }

    peek(){

        if(this.isEmpty()){
            console.log('빈 스택 접근')
            return null;
        }

        return this.arr[this.last-1];
    }
}

export{Stack};