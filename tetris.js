


class Tetris{
    
    constructor(){

        this.arr = new Array(4);

        let gen = new Generator();

        this.arr[0]=gen.base[0];
        this.arr[1]=gen.base[1];
        
        let ran = Math.floor(Math.random()*5);
    
        this.arr[2]=gen.cases[ran][0];
        this.arr[3]=gen.cases[ran][1];

        if(gen.cases[ran][2]){

            console.log("center is...."+ gen.cases[ran][2]);
            this.center = this.arr[gen.cases[ran][2]];
            this.centerN =gen.cases[ran][2];
        }
        else this.center=0;

        this.len = gen.len[ran];

    }

}


class Generator {


    constructor(){

        this.base = [[0-4,0],[0-4,1]];
        this.cases=new Array();
        this.cases[0] = [[0-4,2],[0-4,3],3];
        this.cases[1] = [[0-4,2],[1-4,2],1]; 
        this.cases[2] = [[0-4,2],[1-4,1],1];
        this.cases[3] = [[0-4,2],[1-4,0],1];
        this.cases[4] = [[1-4,0],[1-4,1],null];

        this.len=new Array();
        this.len[0]=4;
        this.len[1]=3;
        this.len[2]=3;
        this.len[3]=3;
        this.len[4]=2;


    }
    


}

export{Generator, Tetris};