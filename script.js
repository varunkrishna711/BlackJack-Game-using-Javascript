// Challenge 1: Age in days

function AgeInDays(){
        let birthYear=prompt("Enter your year of birth...");
        let ageinDays=(2021-birthYear)*365;
        let h1=document.getElementById('head1');
        let ans=document.createTextNode(`You are ${ageinDays} days old`);
        h1.setAttribute('id','ageInDays');
        h1.appendChild(ans);
        document.getElementById('head1').appendChild(h1);
}

function reset(){
    let ele=document.getElementById('head1');
    ele.removeChild(ele);
}

// Challenge 2: Cat Generator

function catGen(){
   let image=document.createElement('img'); 
   let div=document.getElementById('flex-box');
   image.style.marginLeft="5%";
   image.style.justifyContent="space-around";
   image.style.boxShadow="0px 10px 50px black";
   image.src="http://thecatapi.com/api/images/get?format=src&type=gif";
   div.appendChild(image);
}

//Challenge 3: Rock, Paper, Scissors

function rpsgame(choice){
    console.log(choice);
    let hchoc,botchoc;
    hchoc=choice.id;
    botchoc=pickrps(randomint());
    console.log(`Computer Choice: ${botchoc}`);
    results=decideWinner(hchoc,botchoc);
    console.log(results);
    message=finalMes(results);
    console.log(message);
    rpsFrontEnd(choice.id,botchoc,message);
}

function randomint(){
   return Math.floor(Math.random()*3);
}
function pickrps(number){
    return ['rock','paper','scissors'][number];       // picks either rock,paper or scissors
}

function decideWinner(ychoc,cchoc){
    let rpsdatabase={
        'rock':{'scissors':1,'rock':0.5,'paper':0},
        'paper':{'rock':1,'paper':0.5,'scissors':0},
        'scissors':{'paper':1,'scissors':0.5,'rock':0}
    }
    let yscore=rpsdatabase[ychoc][cchoc];
    let cscore=rpsdatabase[cchoc][ychoc];
    return [yscore,cscore];
}

function finalMes([yscore,cscore]){
        if(yscore===0){
            return {'message':'You Lost!','color':'red'}
        }
        else if(yscore===0.5){
            return {'message':'You Tied!','color':'yellow'}
        }
        else{
            return {'message':'You Won!','color':'green'}
        }
}

function rpsFrontEnd(himgchoc,cimgchoc,mes){
    let imgDatabase={
        'rock':document.getElementById('rock').src,
        'paper':document.getElementById('paper').src,
        'scissors':document.getElementById('scissors').src
    }
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    let hDiv=document.createElement('div');
    let cDiv=document.createElement('div');
    let mesDiv=document.createElement('div');

    hDiv.innerHTML=`<img src="${imgDatabase[himgchoc]}" width="150px" height="150px" style="box-shadow:0px 10px 50px rgba(37,50,233,1)">`
    mesDiv.innerHTML="<h1 style='color:"+message['color']+"; font-size:60px; padding: 30px; border:none'>"+message['message']+"</h1>"
    cDiv.innerHTML=`<img src="${imgDatabase[cimgchoc]}" width="150px" height="150px" style="box-shadow:0px 10px 50px rgba(243,38,24,1)">`
    document.getElementById('flex-box-rps-div').appendChild(hDiv);
    document.getElementById('flex-box-rps-div').appendChild(mesDiv);
    document.getElementById('flex-box-rps-div').appendChild(cDiv);
}

//Challenge 4: Change th color of all buttons

let all_btn=document.getElementsByTagName('button');

let copyAllbtns=[];
for(let i=0;i<all_btn.length;i++){
    copyAllbtns.push(all_btn[i].classList[1]);
}

function btnColorchange(btnThing){
    if(btnThing.value==='red')
            btnsRed();
    else if(btnThing.value==='green')
            btnsGreen();
    else if(btnThing.value==='reset')
            btnsReset();
    else if(btnThing.value==='random')
            btnsRandom();        
}

function btnsRed(){
    for(let i=0;i<all_btn.length;i++){
        all_btn[i].classList.remove(all_btn[i].classList[1]);
        all_btn[i].classList.add('btn-danger');
    }
}
function btnsGreen(){
    for(let i=0;i<all_btn.length;i++){
        all_btn[i].classList.remove(all_btn[i].classList[1]);
        all_btn[i].classList.add('btn-success');
    }
}
function btnsReset(){
    for(let i=0;i<all_btn.length;i++){
        all_btn[i].classList.remove(all_btn[i].classList[1]);
        all_btn[i].classList.add(copyAllbtns[i]);
    }
}
function btnsRandom(){
    let choc=['btn-primary','btn-danger','btn-success','btn-warning'];
    for(let i=0;i<all_btn.length;i++){
        all_btn[i].classList.remove(all_btn[i].classList[1]);
        let j=Math.floor(Math.random()*4);
        all_btn[i].classList.add(choc[j])
    }
}

//Challenge 5: Blackjack

let bjGame={
    'you':{'scoreSpan':'#your-bj-res','div':'#your-box','score':0},
    'dealer':{'scoreSpan':'#dealer-bj-res','div':'#dealer-box','score':0},
    'cards':['2','3','4','5','6','7','8','9','10','A','J','Q','K'],
    'cardMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11]},
    'wins':0,
    'losses':0,
    'draws':0,
    'isStand':false,
    'turnsOver':false            //to say all of the turns of both you and dealer are over
}
const YOU=bjGame['you'];
const DEALER=bjGame['dealer'];

const hitSound=new Audio('sounds/swish.m4a');
const winSound=new Audio('sounds/cash.mp3');
const lostSound=new Audio('sounds/aww.mp3');

document.querySelector('#bj-hit').addEventListener('click',bjHit);    //call the function bjHit() when the id is being clicked
document.querySelector('#bj-stand').addEventListener('click',dealerLogic);
document.querySelector('#bj-deal').addEventListener('click',bjDeal);

function bjHit(){
    if(bjGame['isStand']===false){
        let card=randomCard();
        showCard(card,YOU);
        updateScore(card,YOU);
        showScore(YOU);
        console.log(YOU['score']);
    }
}

function randomCard(){
    let pick=Math.floor(Math.random()*13);
    return bjGame['cards'][pick];
    
}

function showCard(card,activePlayer){
    if(activePlayer['score']<=21){
         let cardImage=document.createElement('img');
         cardImage.style.height='150px';
         cardImage.style.width='100px';
         cardImage.style.padding='4px';
         cardImage.src=`images/${card}.png`;
         document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
    else
        document.querySelector(activePlayer['scoreSpan']).textContent='BUST';  

}

function bjDeal(){
    if(bjGame['turnsOver']===true){
        bjGame['isStand']=false;
        let yourImages=document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages=document.querySelector('#dealer-box').querySelectorAll('img');

        for(let i=0;i<yourImages.length;i++){
            yourImages[i].remove();
        }
        for(let i=0;i<dealerImages.length;i++){
            dealerImages[i].remove();
        }
        YOU['score']=0;
        DEALER['score']=0;

        document.querySelector('#your-bj-res').textContent=0;
        document.querySelector('#dealer-bj-res').textContent=0;
        document.querySelector('#your-bj-res').style.color='white';
        document.querySelector('#dealer-bj-res').style.color='white';

        document.querySelector('#blackjack-res').textContent="Let's Play!";
        document.querySelector('#blackjack-res').style.color="black";

        bjGame['turnsOver']=true;
    }
}

function updateScore(card,activePlayer){
    if(card==='A'){
        if(activePlayer['score']+bjGame['cardMap'][card][1]<=21){
                 activePlayer['score']+=bjGame['cardMap'][card][1];
        } else{
            activePlayer['score']+=bjGame['cardMap'][card][0];
         }
    } else{
    activePlayer['score']+=bjGame['cardMap'][card];
    }
}

function showScore(activePlayer){
    if(activePlayer['score']>21){
        document.querySelector(activePlayer['scoreSpan']).textContent='BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color='red';
    }
    else{
        document.querySelector(activePlayer['scoreSpan']).textContent=activePlayer['score'];
    }
}

function sleep(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));
}

async function dealerLogic(){
    bjGame['isStand']=true;
    while(DEALER['score']<16 && bjGame['isStand']===true){
        let card=randomCard();
        showCard(card,DEALER);
        updateScore(card,DEALER);
        showScore(DEALER);
        await sleep(1000);
    }    

   
    bjGame['turnsOver']=true;
    let winner=computeWinner();
    showResult(winner);
}

function computeWinner(){  // compute winner and return who won
    let winner;
    if(YOU['score']<=21){
        if(YOU['score']>DEALER['score'] || DEALER['score']>21){
            bjGame['wins']++;
            winner=YOU;
        }
        else if(YOU['score']<DEALER['score']){
            bjGame['losses']++;
            winner=DEALER;
        }
        else if(YOU['score']===DEALER['score']){
            bjGame['draws']++;
        }    
    }    
    else if(YOU['score']>21 && DEALER['score']<=21){
        bjGame['losses']++;
        winner=DEALER;
    }
    else if(YOU['score']>21 && DEALER['score']>21){
        bjGame['draws']++;
    }
    console.log('Winner is: ',winner);
    return winner;
}

function showResult(winner){
    if(bjGame['turnsOver']===true){
        let message,messageColor;
        if(winner===YOU){
            document.querySelector('#wins').textContent=bjGame['wins'];
            message="You Won!";
            messageColor='green';
            winSound.play();
        }
        else if(winner===DEALER){
            document.querySelector('#losses').textContent=bjGame['losses'];
            message="You Lost!";
            messageColor='red';
            lostSound.play();
        }
        else{
            document.querySelector('#draws').textContent=bjGame['draws'];
            message="You Drew!";
            messageColor='yellow';
        }
        document.querySelector('#blackjack-res').textContent=message;
        document.querySelector('#blackjack-res').style.color=messageColor;
    }
}