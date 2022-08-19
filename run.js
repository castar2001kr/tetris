import { Stack } from "./Stack.js";
import { Tetris } from "./tetris.js";
import { Generator } from "./tetris.js";

const height = 15;
const width = 10;

const pix=10;

let phase_num=0;

let space=new Array(height);

let now_tetris=null;

let timerId=null;


let legacy=new Stack();


for(let i=0; i<height; i++){

    space[i]=new Array(width);
    
    for(let j=0; j<width; j++){
        space[i][j]=0;
    }

}

let map = document.getElementById("map");

let canv=document.createElement("canvas");
canv.style.height="300px";
canv.style.width="600px";
let ctx=canv.getContext("2d");

map.appendChild(canv);

phase();


function phase(){

    console.log(phase_num++)

    legacy=new Stack();

    console.log("phase start")

    now_tetris=new Tetris();
    
    let random_move=Math.floor(Math.random()*(width-now_tetris.len));

    now_tetris.arr.forEach((ele)=>{
        ele[1]+=random_move;
        console.log("y좌표 : "+ele[0]);
    })

    timerId=setInterval(()=>{

        if(check_for_stop(now_tetris)){

            loop();
            console.log("tetris is going downside");
            console.log(now_tetris.arr);
        }

    },50)



}

function check_for_stop(now){

    let arr = new Array(4);
    let result=true;

    for(let i=0; i<4; i++){
        arr[i]=now.arr[i];
    }

    arr.forEach((ele)=>{

       

        if(ele[0]>=Number(0)){

            console.log( "0보다 큰 값 :"+ ele[0])
            console.log("phase num : "+(phase_num-1))
            
            if(ele[0]==height-1||space[ele[0]+1][ele[1]]==1){
                
                clearInterval(timerId);//비동기
                console.log("clear interval");

                arr.forEach((ele)=>{
                
                    console.log("detected : "+ele);
                    space[ele[0]][ele[1]]=1;
                })


                if(live_check(now)){
                    console.log("새로운 페이즈 시작")
                    phase();
                }else{

                   
                    console.log("게임 종료.");
                }
    


                result= false;
            }
        }

    });

    return result;
}

function loop(){

    now_tetris.arr.forEach((ele)=>{

        ele[0]+=1;
    });

    draw();
}

function live_check(now){

    let result = true;
    now.arr.forEach((ele)=>{
        console.log("live check : "+ele[0])
        if(ele[0]<=0){

            

            result= false;
        }
    })

    return result;

}

function draw(){

    console.log(now_tetris.arr);

    while(!legacy.isEmpty()){

        eraseOne(legacy.pop());
        
    }

    now_tetris.arr.forEach((ele)=>{

        console.log("drawing....")
        drawOne(ele);
        legacy.push([ele[0],ele[1]]);

    })


}

function drawOne(ele){

    if(ele[0]>=0){

        ctx.fillRect(ele[1]*pix,ele[0]*pix,pix,pix);
    }

}

function eraseOne(ele){

    if(ele[0]>=0){

        ctx.clearRect(ele[1]*pix,ele[0]*pix,pix,pix);
    }

}