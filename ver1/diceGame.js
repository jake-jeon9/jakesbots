// Created on Jeon Seonghwan의 iPad.
const commands = ["/던져","/결과보기","/초기화","/게임설명"];
const diceRoom ={};

function shoot(replier,room, sender, msg) {
    
    var num = -1;
    var result = "";
    diceRoom[room] || (diceRoom[room] = {});
    
    
    if (msg == commands[0]) {
        if (isDone(room, sender)) {
        result = "이미 던졌습니다.";
        } else {
            do{
                num = Math.floor(Math.random() * 10+1);
            }while(isContain(room,num));
            diceRoom[room][sender] = num;
            result = sender + "의 숫자 : " + num;
        }
    } else if (msg == commands[1]) {
        result = getRank(room);
        
    } else if (msg == commands[2]) {
        setGame(room);
        result = "게임초기화";
        
    } else if(msg == commands[3]){
        result = "주사위 게임입니다. 1~10까지 숫자가 나오며, "
        +"중복된 값은 나오지 않습니다.\n/던져 를 통해 주사위를 던지고,\n/결과보기 를 통해 결과를 확인합니다."
        +" \n/초기화 를 통해 게임을 게임을 초기화할 수 있습니다."
    }else return;
    
    replier.reply(result);
}

function getRank(room) {
    var result = "☞순위발표☜ \n결과보기.." +"\u200b".repeat(500);
    var rank = 1;
    const temps = [];
    
    for(i in diceRoom[room]){
        temps.push({name : i,score : diceRoom[room][i]});
    }
    var size = temps.length;
    if(size <1 )return "게임 참여자가 없습니다.";

    temps.sort(function (a,b){
        return a.score - b.score
    });
    
    for(var i =0; i<size; i++){
        var item = temps.pop();
        result += rank + "등은? " +item.name+"["+item.score+"]\n";
        rank++;
    }
    return result;
}

function setGame(room) {
    for (member in diceRoom[room]) {
        delete diceRoom[room][member];
    }
}

function isDone(room, sender) {
    if (diceRoom[room][sender] > 0) {
        return true;
    } else {
        return false;
    }
}

function isContain(room,num){
    for(i in diceRoom[room]){
        if(diceRoom[room][i] == num)return true;
    }
    return false;
}