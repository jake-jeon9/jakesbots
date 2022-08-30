const commands = ["/설정","/참여","/포기","/정답보기","/설명"];
const updownRoom =[];   //테겟번호 설정
const updownRoomMember = [];    //참여자 배열
const roomCount= [];    // 기회

function setGame(room,msg){
    if(updownRoom[room] > 0) return "이미 설정되어 있습니다.";
    var items = msg.split(" ");
    var maxNum = items[1];
    var num = Math.floor(Math.random()*maxNum +1);
    updownRoom[room] = num;
    roomCount[room] = items[2];
    return "설정 완료";
}

function join(room,sender){
    if(updownRoomMember[room][sender]) return "이미 참여하셨습니다.";
    updownRoomMember[room][sender] = true;
    return sender+"님 참여 신청완료";
}

function out(room,sender){
    if(!updownRoomMember[room][sender]) return sender+"님은 게임에 참여하지 않았습니다.";
    delete updownRoomMember[room][sender];
    return sender+"님 게임 종료";
}

function getResult(room){
    if(updownRoom[room] >0) {
        var result =  "결과보기.." +"\u200b".repeat(500)+"\n정답은 ["+updownRoom[room]+"] 입니다.";
        delete updownRoom[room]
        delete updownRoomMember[room];
        delete roomCount[room];
        return result ; 
    }else return "게임을 먼저 설정해주세요.";
}


function response(room,sender,msg,replier){
    var result ="";
    if(msg.search("/")){
        msg.replace("/","");
        if(updownRoom[room]>0 &&updownRoomMember[room][sender]){//참여자 and 게임 진행중? 
            if(roomCount[room]>0 ){
                if(Number.isInteger(msg)){ // 메세지가 숫자?
                    if(msg == updownRoom[room]){ // 일치
                        replier.reply(sender+"님! 정답!");
                        delete updownRoom[room];
                        delete updownRoomMember[room];
                        delete roomCount[room];
                    }else{ // 비일치
                        roomCount[room] --;
                        if(updownRoom[room] > msg){ // 크면 업
                            replier.reply("Up! 남은기회 : "+roomCount[room]); 
                        }else{ // 작으면 다운
                            replier.reply("Down! 남은기회 : "+roomCount[room]);
                        }
                    }
                }
            }else{
                replier.reply("정답은 ["+updownRoom[room]+"] 이였습니다. ")
                delete updownRoom[room];
                delete updownRoomMember[room];
                delete roomCount[room];
            }
        }
        return;
    }
    

    if(msg == commands[0]){
        result = setGame(room,msg);
    }else if(msg == commands[1]){
        result = join(room,sender);
    }else if(msg == commands[2]){
        result = out(room,sender);
    }else if(msg == commands[3]){
        result = getResult(room);
    }else if(mesg == commands[4]){
        result ="[게임설명]\n /설정 100 20 -> 타겟번호 100, 기회 20번 으로 설정\n"
        +"/참여 : 게임에 멤버로 참여 \n 포기 : 게임 멤버에서 포기 \n정답보기 : 게임 정료 후 정답보기";
    }else{
        return;
    }

    replier.reply(result);
}


