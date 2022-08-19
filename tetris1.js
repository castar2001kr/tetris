//////////////////////////////////////////////////////////
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








class tetris{ //테트리스 만들기!

    constructor(){

        this.blocks=new Array(4);
        this.blocks[0]=[0,0];
        this.NOB=1;
        this.map=new Map();
        this.map.set(0,new Map());
        this.map.get(0).set(0,true);
    }

    init(){
        for(let i=1; i<4;i++){
            this.makeBlock();
        }
    }


    makeBlock(){
        
        let selectedOne=this.blocks[Math.floor(Math.random()*this.NOB)];

        let nextBlockPosition=shake();

        let index=0;

        while(true){
            
            if(this.map.get(selectedOne[0]+nextBlockPosition[index][0])){
                if(this.map.get(selectedOne[0]+nextBlockPosition[index][0]).get(selectedOne[1]+nextBlockPosition[index][1])){
                    
                }else{
                    break;
                }
            }else{
                break;
            }

            index++;
        }

        this.blocks[this.NOB++]=[selectedOne[0]+nextBlockPosition[index][0],selectedOne[1]+nextBlockPosition[index][1]];
        console.log(this.blocks);
        
        if(this.map.get(this.blocks[this.NOB-1][0])){
            this.map.get(this.blocks[this.NOB-1][0]).set(this.blocks[this.NOB-1][1],true);
        }else{
            this.map.set(this.blocks[this.NOB-1][0],new Map());
            this.map.get(this.blocks[this.NOB-1][0]).set(this.blocks[this.NOB-1],true)
    
        }

    }

}




/////////////////////////////////////////////////////
const width=10;
const height=15;

const cases=[[1,0],[0,1],[-1,0],[0,-1]]; // 블록들이 뻗어나가는 경우.



let map = document.getElementById("map");
let canv = document.createElement("canvas");
canv.style.border="solid black 1px"
canv.style.height="300px";
canv.style.width="600px";
map.appendChild(canv);
let ctx = canv.getContext("2d");
let pix=10;


let space=new Array(height);

let now_tetris=null;


let timerId=null;

let legacy=null;
let news=new Stack();



for(let i=0; i<space.length; i++){
    space[i]=new Array(width); //4를 더한 이유는 시작부터 겹치는 것 방지.
    for(let j=0; j<space[i].length; j++){
        space[i][j]=0;
    }
}


phase();


///////////////// phase()로 한 테트리스씩 처리. //////////////////////////////


function phase(){
    now_tetris=new tetris();
    now_tetris.init();
    legacy=null;
    news=new Stack();

    ready_for_run();


    timerId=setInterval(()=>{   //시간에 따라 움직이기
        if(check_for_stop()){

            loop();
        }
    },1000)

}

function left_mv(){ //사용자 움직이기
   
    let problem=false;

   now_tetris.blocks.forEach((ele)=>{
    
    if(ele[1]-1<0){
        problem=true;
    }
   });


   if(problem){

   }else{

    now_tetris.blocks.forEach((ele)=>{
    
        
        ele[1]-=1;

       });

       draws();
   }

}

function right_mv(){

    let problem=false;

    now_tetris.blocks.forEach((ele)=>{
     
     if(ele[1]+1>width-1){
         problem=true;
     }
    });
 
 
    if(problem){
 
    }else{
 
     now_tetris.blocks.forEach((ele)=>{
     
         
         ele[1]+=1;
 
        });

        draws();
    }


}



////////////////////////////////////////////////


function ready_for_run(){

    let maxposi=0;
    let lowposi=width;

    now_tetris.blocks.forEach(function(ele){

        if(ele[1]>maxposi){
            maxposi=ele[1];
        }

        if(ele[1]<lowposi){
            lowposi=ele[1];
        }
    });

    let len=maxposi-lowposi+1;

    let position=Math.floor(Math.random()*(width-len));               //width-1-(len-1)  ㅁ ㅁ ㅁ ㅁ 랜덤으로 테트리스 위치 설정

    let diff=position-lowposi;
    
    now_tetris.blocks.forEach(function(ele){            ///테트리스를 가능한 랜덤 위치에 옮겨 놓는다.
        
        ele[1]+=diff;
    });



}

function loop(){
    now_tetris.blocks.forEach(function(ele){

        ele[0]+=1;

    });
    draws();
}


function check_for_stop(){

    now_tetris.blocks.forEach(function(ele){
        console.log("x : "+ele[1]);
        console.log("y : "+ele[0]);
        if(ele[0]==height-1||space[ele[0]+1][ele[1]]==1){
            clearInterval(timerId);

            console.log("phase out...")
            check_live();

            return false;
        }

    });
    console.log("------------------")

    legacy=null;

    return true;
    //아래가 1이면 루프를 멈추고,
    //옆이 1이거나 맵 끝이면 이동을 멈춘다.
    //setTimeOut이나 비슷한 함수를 쓰는 것이 좋아 보인다.


}

function check_live(){

    let maxupper=height;

    now_tetris.blocks.forEach((ele)=>{
        
        if(ele[0]<height){
            maxupper=ele[0];
        }

    });

    if(maxupper<=0){
        console.log(maxupper)
        //게임 오버
    }else{

        now_tetris.blocks.forEach((ele)=>{
        
            space[ele[0]][ele[1]]=1;
            phase();
    
        });

    }

}



//////////// 테트리스 만들기 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function shake(){ //테트리스를 만들 때, 필요한 경우의 수

    let temp=new Array(4);
    let forReturn=new Array(4);

    for(let i=0; i<4; i++){
        temp[i]=[cases[i][0],cases[i][1]];
    }

    for(let i=3; i>=0;i--){         //3번으로 줄여도 됨.

        let pickIndex=Math.floor(Math.random()*(i+1));
        
        forReturn[3-i]=temp[pickIndex];

        for(let j=pickIndex; j<=i;j++){
            temp[j]=temp[j+1];
        }

    }

    return forReturn;

}









/////////////////////////////////////////////////////////////




function draws(){
      
    if(legacy!=null){

        legacy.forEach(eraseOne);
    }

    news=new Stack();
    now_tetris.blocks.forEach(drawOne);

    legacy=news.arr;


}



function drawOne(ele){

    ctx.fillRect(ele[0]*pix,ele[1]*pix,pix,pix);
    news.push(canv);
}

function eraseOne(ele){

    if(ele.isEmpty()){
        return;
    }

    ctx.clearRect(ele[0]*pix,ele[1]*pix,pix,pix);


}

















///////////////////////////////////////////////////////////////////
//promise문법과 ajax 통신을 통해, 온라인 게임 만들 수 있음.





