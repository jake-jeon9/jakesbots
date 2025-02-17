const sdcard = File.getSdcardPath();
const preChat = {};
const botOn = {};
const version = "1.0";
const chatLog = {};
const kill = false;
const Admin_name = "전성화이";
const botName = "Jbot";
const chat = {};
const line = "═".repeat(20);
const FV = "\u200b".repeat(500);
const commends =
    ["/제이봇", "/봇온", "/봇오프", "/도움말", "/명령어",
        "/검색", "/따라하기", "/DB", "/log", "/챗봇학습",
        "/복권", "/날씨", "/채팅순위", "/운세", "/코로나",
        "/실시간코로나", "/백신현황", "/노래찾기", "가르치기 ", "/학습제거",
        "/학습내용", "/번역", "/학습불러오기"];
const admin_commends = ["/kill", "/revival", "/stop"];
const reactions = ["오 정말?", "그렇구나!", "진짜야?", "완전 인정!", "박수!"];
const learnlingWord = {};
const autoReply = true;



function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    chat[room] || (chat[room] = {});
    chat[room][sender] || (chat[room][sender] = 0);

    chat[room][sender] += 1;
    let rankData = chat[room];
    jbot(room, msg, sender, isGroupChat, replier, rankData);

    chatLog[room] += getCurrentTime(1) + " / " + sender + " : " + msg + "\n";


}


function readChat(room, name, manual) {
    if (manual) {
        return File.read(sdcard + "/Jbot_Learn/" + room + "/" + name + ".txt");
    } else {
        return File.read(sdcard + "/Jbot/" + room + "/" + name + ".txt");
    }

}

function saveChat(room, name, value, manual) {
    if (manual) {
        File.createFolder(sdcard + "/Jbots_Learn/" + room);
        File.save(sdcard + "/Jbots_Learn/" + room + "/" + name + ".txt", value);
    } else {
        File.createFolder(sdcard + "/Jbots/" + room);
        File.save(sdcard + "/Jbots/" + room + "/" + name + ".txt", value);
    }
}

function getChatCount(room, manual) {
    if (manual) {
        return File.getFileCount(sdcard + "/Jbots_Learn/" + room);
    } else {
        return File.getFileCount(sdcard + "/Jbots/" + room);
    }
}

function isAdmin(name) {
    if (name == Admin_name) {
        return true;
    } else {
        return false;
    }
}


function procCmd(room, msg, sender, replier) {
    if (msg == admin_commends[0]) {
        kill = true;
        replier.reply(botName + " 사망");
    }
    if (msg == admin_commends[1]) {
        kill = false;
        replier.reply(botName + " 부활");
    }
}


function onLoaded() {
    File.createFolder(sdcard + "/Jbots/")
    File.createFolder(sdcard + "/Jbots_Learn/")
}


function jbot(room, msg, sender, isGroupChat, replier, rankData) {
    let a = arguments;
    learnlingWord[room] || (learnlingWord[room] = {});
    //단체 채팅방에서만 작동
    if (isGroupChat == false) {
        return;
    }

    //도배 방지
    if (preChat[room] == msg) {
        return;
    }

    //자동 활성화
    if (botOn[room] == null) {
        botOn[room] = true;
    }

    switch (msg) {
        //관리자 명령어
        case admin_commends[0]:
        case admin_commends[1]: if (isAdmin(sender)) procCmd(room, msg, sender, replier);
            break;
        case admin_commends[2]: if (isAdmin(sender)) autoReply ? autoReply = true : autoReply = false;
        //명령어 (봇이 꺼져있어도 작동)
        case commends[0]: replier.reply("봇 이름 : 제이봇\n버전 : " + version + "\n제작자 : jake 원작자 : Dark Tornado\n라이선스 : MIT License\n수동학습 DB : " + getChatCount(room, true) + "개\n자동학습 DB : " + getChatCount(room) + "개");
            break;
    }

    //관리자용 on/off
    if (kill) {
        return;
    }


    if (msg == commends[1]) {
        replier.reply(botName + " 활성화");
        botOn[room] = true;
    } else if (msg == commends[2]) {
        replier.reply(botName + " 비활성화");
        botOn[room] = false;
    }
    //봇이 꺼져있으면 이 이하는 작동 X
    if (botOn[room] == false) return;


    if (autoReply && Object.keys(learnlingWord).includes(a[1])) {
        a[4].reply(learnlingWord[a[1]]);
        return;
    }

    //명령어 (봇이 켜져있어야 작동)

    if (msg == commends[3]) {
        var rr = Math.floor(Math.random() * 3);
        if (rr == 0) {
            replier.reply("내..내가 왜 너를 도와주어야 하지?");
        } else {
            replier.reply("봇 이름 : Jbot\n버전 : " + version + "\n제작자 : jaks, 원작자 : Dark Tornado\n 동일한 채팅이 두 번 이상 연속으로 수신되면 도배로 간주, 가볍게 무시합니다.\n 명령어 목록은 '/명령어'를 사용해주세요.")
        }
    }
    else if (msg == commends[4]) {
        var rr = Math.floor(Math.random() * 3);
        if (rr == 0) {
            replier.reply("내..내가 왜 명령어를 알려주어야 하지?");
        } else {
            var commend = commends;
            var result = getCmd(commend);
            replier.reply("[명령어 목록]" + Utils.compress() + "\n\n" + result);
        }
    }
    else if (msg.startsWith(commends[5])) {
        var cmd = msg.split(" ");
        var data = msg.replace(cmd[0] + " ", "");
        replier.reply("따..딱히 찾아주고 싶지는 않지만, 일이니까..."
            + "\nhttps://m.search.naver.com/search.naver?query=" + data.replace(/ /g, "%20"));
    }
    else if (msg.startsWith(commends[6])) {
        var cmd = msg.split(" ");
        var data = msg.replace(cmd[0] + " ", "");
        var rr = Math.floor(Math.random() * 3);
        if (rr == 0) {
            replier.reply("정중하게 부탁하면 따라 할지도..?");
        } else {
            replier.reply(data);
            if (chatLog[room] == null) {
                chatLog[room] = "sender: " + sender + "\nmsg: " + msg + "\nreply: " + data + "\ntype: 따라하기";
            } else {
                chatLog[room] = chatLog[room] + "\n\nsender: " + sender + "\nmsg: " + msg + "\nreply: " + data + "\ntype: 따라하기";
            }
        }
    }

    else if (msg == commends[7]) {
        replier.reply("수동학습 DB : " + getChatCount(room, true) + "개\n자동학습 DB : " + getChatCount(room) + "개");
    }
    else if (msg == commends[8]) {
        if (chatLog[room] == null) {
            replier.reply("저장된 로그가 없습니다.");
        } else {
            replier.reply("[Jbot Log]" + Utils.compress() + "\n\n" + chatLog[room])
        }
    }

    //수동 학습 (배우는 부분)
    else if (msg.startsWith(commends[9])) {
        var result = "방법을 알려드릴게요.\n 커멘드는 1. /가르치기, 2. /학습제거 3. /학습내용 입니다.\n"
            + "/가르치기는 챗봇에게 특정 단어를 알려주고, 그단어가 채팅에 등록될 경우 학습된 단어로 응답하는 방법이에요.\n ex/가르치기 [내용]:[학습할 단어]\n";
        result += "/학습제거 [단어] 학습된 단어를 제거하는 명령어 입니다.\n";
        result += "/학습내용 을 입력하시면 제가 학습한 단어들을 알려드려요."
        replier.reply(result);
        // var cmd = msg.split(" ")
        // var data = msg.replace(cmd[0] + " ", "");
        // var chat = data.split("=");
        // saveChat(room, chat[0], chat[1], true);
        //replier.reply(chat[0] + "(이)라고 하면, " + chat[1] + "(이)라고 하도록 배웠습니다.");
    }

    //본인 이름 부르면 반응
    else if (msg == "봇" || msg == "챗봇" || msg.startsWith("제이봇") || msg.startsWith("Jbot")) {
        var rr = Math.floor(Math.random() * 4);
        if (rr == 0) {
            replier.reply("나 찾은거야?");
        } else if (rr == 1) {
            replier.reply("너희한테 반응 같은 걸... 할 리가 없잖아.");
        } else if (rr == 2) {
            replier.reply("무슨일이에요?");
        } else if (rr == 3) {
            replier.reply("절 찾으셨나요?");
        }
    } else if (msg == commends[10]) {
        replier.reply("<다음중 선택하세요>" + "\n" + "/로또추천" + "\n" + "/로또확인" + "\n" + "/연금추천" + "\n" + "/연금확인");
    } else if (msg == "/로또추천" || msg == "/로또확인" || msg == "/연금추천" || msg == "/연금확인") {
        replier.reply(getLotto(msg));
    } else if (msg.startsWith(commends[11])) {
        var front = msg.split(" ")[0];
        var data = msg.replace(front + " ", "");
        var result = Utils.getWeather(data);
        if (result == null) replier.reply(data + "(이)가 어딘지 몰라서 날씨 정보 불러오기 실패");
        else replier.reply("[" + data + " 날씨 정보]\n" + result);

    } else if (msg == commends[12]) {
        var result = getChatRank(rankData);
        replier.reply(result);
    } else if (msg.startsWith(commends[13])) {
        var result = getFortune(msg);
        replier.reply(result);
    } else if (msg == commends[14]) {
        var result = Utils.getCovid();
        if (result == null) replier.reply("코로나 정보 불러오기 실패");
        else replier.reply(result);
    } else if (msg == commends[15]) {
        var result = getlocalcodiv();
        if (result == null) replier.reply("코로나 지역 정보 불러오기 실패");
        else replier.reply(result);
    } else if (msg == commends[16]) {
        var result = vachine();
        if (result == null) replier.reply("백신 정보 불러오기 실패");
        else replier.reply(result);
    } else if (msg.startsWith(commends[17])) {
        var result = SearchLines(msg);
        replier.reply(result);
    } else if (a[1].startsWith(commends[18])) {
        a[1] = a[1].slice(6);
        learnlingWord[room][a[1].split(':')[0]] = a[1].split(':')[1];
        replier.reply("기억할게요");
    } else if (a[1] == commends[19]) {
        for (var member in learnlingWord[room]) delete learnlingWord[room][member];
        replier.reply("학습한 모든 내용을 삭제했어요.");
    } else if (a[1].startsWith(commends[19] + ' ')) {
        replier.reply("학습한 [" + a[1].slice(6) + "]을(를) 삭제했어요.");
        delete learnlingWord[room][a[1].slice(6)];

    } else if (a[1] == commends[20]) {
        //if (learnlingWord != {} && learnlingWord.length > 0) {
        if (learnlingWord[room] != {}) {
            a[4].reply(Object.keys(learnlingWord[room]).map((e, i) => e + "이라고 하면 " + learnlingWord[room][e]).join('\n'));
        } else {
            a[4].reply("학습된 내용이 없습니다.");
        }

    } else if (msg.startsWith(commends[21])) {
        var cmd = msg.split(" ");
        var type = cmd[1];
        var data = msg.replace(cmd[0] + " " + cmd[1] + " ", "");
        var result = type[0] + " : " + data + "\n" + type[1] + " : ";
        if (type == "영한") {
            result += NMT("en", "ko", data);
        } else if (type == "한영") {
            result += NMT("ko", "en", data);
        } else if (type == "한중") {
            result += NMT("ko", "zh-CN", data);
        } else if (type == "중한") {
            result += NMT("zh-CN", "ko", data);
        } else if (type == "한일") {
            result += NMT("ko", "ja", data);
        } else if (type == "일한") {
            result += NMT("ja", "ko", data);
        } else {
            result = "번역 인식 실패하였습니다. \n형식은 /번역 [번역타입] [내용]\n"
                + "지원 번역타입\n영한 / 한영 / 한중(간체) / 중한(간체) / 한일 / 일한 입니다.\n" +
                "ex) /번역 영한 cat";
        }
        replier.reply(result);
    } else if (msg == commends[22]) {

    } else {//리액션 모음
        var k = Math.floor(Math.random() * 10);
        if (msg.includes("멈춰") || msg.includes("조용") || msg.includes("닥쳐") || msg.includes("쉿")) {
            replier.reply("네 쥐 죽은듯이 있을게요..ㅠㅠ");
        } else if (msg.includes("잘자") || msg.includes("굳밤" || "굿밤") || msg.includes("굿나잇" || "굳나잇") || msg.includes("주무세요")) {
            replier.reply("오늘도 고생 많으셨어요! 좋은 꿈꾸고 내일 봐요!");
        } else if (k == 0) {
            var i = Math.floor(Math.random() * reactions.length);
            replier.reply(reactions[i]);
        } else if (k == 1) {
            replier.reply("내가 지금 대화에 껴도 되는건가?");
        }

    }

    // //자동 학습 (반응 안할 것들 거르는 부분)
    // var skip = ["사진", "동영상", "(이모티콘)", "음성메시지", "카카오톡 프로필"];
    // for (var n = 1; n < 5; n++) {
    //     if (msg == skip[n]) {
    //         return;
    //     }
    // }

    // //자동 학습 (배우는 부분)
    // if (preChat[room] != null) {
    //     saveChat(room, preChat[room], msg);
    // }

    // //수동 학습 (말하는 부분)
    // var noReplied = true;
    // if (Math.floor(Math.random() * 3) == 0) {
    //     var chat = readChat(room, msg, true);
    //     if (chat != null) {
    //         replier.reply(chat);
    //         if (chatLog[room] == null) {
    //             chatLog[room] = "sender: " + sender + "\nmsg: " + msg + "\nreply: " + chat + "\ntype: 수동 학습";
    //         } else {
    //             chatLog[room] = chatLog[room] + "\n\nsender: " + sender + "\nmsg: " + msg + "\nreply: " + chat + "\ntype: 수동 학습";
    //         }
    //     }
    // }

    // //자동 학습 (말하는 부분)
    // if (noReplied && Math.floor(Math.random() * 10) < 3) {
    //     var chat = readChat(room, msg);
    //     if (chat != null) {
    //         replier.reply(chat);
    //         if (chatLog[room] == null) {
    //             chatLog[room] = "sender: " + sender + "\nmsg: " + msg + "\nreply: " + chat + "\ntype: 자동 학습";
    //         } else {
    //             chatLog[room] = chatLog[room] + "\n\nsender: " + sender + "\nmsg: " + msg + "\nreply: " + chat + "\ntype: 자동 학습";
    //         }
    //     }
    // }

    //나머지
    preChat[room] = msg;

}

function getLotto(msg) {

    if (msg == "/로또추천") {
        var lotto = [];
        for (var n = 0; n < 6; n++) {
            var ran = Math.floor(Math.floor(Math.random() * 45) + 1);
            if (lotto.includes(ran)) n--;
            else lotto.push(ran);
        }
        return "/로또추천 : " + lotto.sort((a, b) => a - b).join(", ");
    }

    else if (msg == "/로또확인") {
        var data = org.jsoup.Jsoup.connect("https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=" + "로또").get();
        var result = "🍀 ";
        var number = data.select("div.num_box") + "\n";
        var round = data.select("a[class=_lotto-btn-current]") + "";
        number = number.replace(/<[^>]+>/g, "");
        number = number.split(",");
        round = round.replace(/<[^>]+>/g, "");
        round = round.split("\n");
        result += round + "\n" + number[0].substring(0, number[0].length - 12);
        return result;
    }

    else if (msg == "/연금확인") {
        var data = org.jsoup.Jsoup.connect("https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=연금복권확인").get();
        var result = "🍀 ";
        var number = data.select("div.lottery_win") + "\n";
        var round = data.select("a[class=_lottery-btn-current]") + "";
        number = number.replace(/<[^>]+>/g, "");
        number = number.split(",");
        round = round.replace(/<[^>]+>/g, "");;
        round = round.split("\n")
        result += round + "\n" + number[0].substring(0, number[0].length - 7);
        return result;
    }

    else if (msg == "/연금추천") {
        var yeon1 = Math.floor(Math.random() * 5) + 1;
        var yeon2 = [];
        for (var n = 0; n < 6; n++) {
            var rand = Math.floor(Math.random() * 9) + 1;
            if (yeon2.includes(rand)) n--;
            else yeon2.push(rand);
        }
        return "/연금추천 : " + yeon1 + "조 " + yeon2.join(", ");
    }
}

Utils.getWeather = function (pos) {
    try {
        var data = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=" + pos.replace(/ /g, "+") + "+날씨").get();
        data = data.select("div.status_wrap");
        var temp = data.select("strong").get(0).text();
        temp = temp.replace("현재 온도", "온도 : ").replace("°", "℃");
        var hum = data.select("li.type_humidity").select("span").get(0).text();
        var state = data.select("div.weather_main").get(0).text();
        var dust = data.select("li.sign1").get(0);
        dust = dust.select("span.figure_text").text() + " (" + dust.select("span.figure_result").text() + ")";
        var result = "상태 : " + state + "\n" + temp + "\n습도 : " + hum + "%\n미세먼지 : " + dust;
        return result;
    } catch (e) {
        Log.error("날씨 정보 불러오기 실패\n" + e);
        return null;
    }
};

function getWeatherInfo(pos) {
    try {
        var data = Utils.getWebText("https://m.search.naver.com/search.naver?query=" + pos + "%20날씨");
        data = data.replace(/<[^>]+>/g, ""); //태그 삭제
        data = data.split("월간")[1]; //날씨 정보 시작 부분의 윗부분 삭제
        data = data.split("시간별 예보")[0]; //날씨 정보 끝 부분의 아래쪽 부분 삭제
        data = data.trim(); //위아래에 붙은 불필요한 공백 삭제
        data = data.split("\n"); //엔터 단위로 자름  ​

        description = data[33].split("어제보다")[1].trim();
        descript_tempa1 = description.split("° ")[0];
        descript_tempa2 = description.split("요")[0];
        descript_state = description.split("요")[1];

        Temperature = data[6].split("온도")[1].trim();

        var results = [];
        results[0] = "☆ 어제보다 " + descript_tempa2 + "요! ☆";
        results[1] = "현재온도 : " + Temperature + " / 체감온도 : " + data[30].trim();
        results[2] = "최저온도 : " + data[23].trim() + "/ 최고온도 : " + data[16].trim();
        results[3] = data[49].trim() + " : " + data[50].trim(); //미세
        results[4] = data[62].trim() + " : " + data[63].trim();  //초미세
        results[5] = "습도 : " + data[94].trim() + " " + data[89].trim() + "%";
        results[6] = "바람 : " + data[107].trim() + " " + data[102].trim() + "m/s";
        results[7] = data[81].trim() + " / " + data[82].trim(); //자외선
        var result = "[" + pos + " 날씨 정보] " + "  《" + descript_state + "》\n" + results.join("\n");

        return result; //결과 반환

    } catch (e) {
        return null;
    }
}

function getChatRank(rankData) {
    let total = Object.keys(rankData).reduce((a, b) => a + rankData[b], 0);
    let sort = Object.keys(rankData).sort((a, b) => rankData[b] - rankData[a]).slice(0, 150);
    let map = sort.map((e, i) => ++i + "위 [" + rankData[e] + "회, " + (rankData[e] / total * 100).toFixed(2) + "%] : " + e);
    return "『 ☞ Chat Rank 』" + FV + "\n\nTotal : " + total + "\n\n" + line + "\n\n" + map.join("\n\n") + "\n\n" + line;

}

function getFortune(msg) {
    var url = org.jsoup.Jsoup.connect("https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=" + msg.substr(4) + "운세").get();
    var main = url.select("#yearFortune > div > div.detail > p:nth-child(3)").text();
    var year1 = url.select("#yearFortune > div > dl:nth-child(5) > dt:nth-child(9)").text();
    var year1Text = url.select("#yearFortune > div > dl:nth-child(5) > dd:nth-child(10)").text();
    var year2 = url.select("#yearFortune > div > dl:nth-child(5) > dt:nth-child(7)").text();
    var year2Text = url.select("#yearFortune > div > dl:nth-child(5) > dd:nth-child(8)").text();
    var year3 = url.select("#yearFortune > div > dl:nth-child(5) > dt:nth-child(5)").text();
    var year3Text = url.select("#yearFortune > div > dl:nth-child(5) > dd:nth-child(6)").text();
    var year4 = url.select("#yearFortune > div > dl:nth-child(5) > dt:nth-child(3)").text();
    var year4Text = url.select("#yearFortune > div > dl:nth-child(5) > dd:nth-child(4)").text();
    return "[※ 오늘의 " + msg.substr(4) + " 운세]\n" + main + "\n\n" + year1 + " | " + year1Text
        + "\n\n" + year2 + " | " + year2Text + "\n\n" + year3 + " | " + year3Text + "\n\n" + year4 + " | " + year4Text;

}

Utils.getCovid = function () {
    try {
        var data = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=코로나").get();
        var totalData = data.select("div.status_info");

        var Tinfo = {};
        Tinfo[0] = totalData.select("li.info_01");
        Tinfo[1] = totalData.select("li.info_03");
        Tinfo[2] = totalData.select("li.info_04");
        Tinfo[3] = totalData.select("li.info_02");

        var Tresult = "누적" + Tinfo[0].select("strong").get(0).text().replace("환자", "") + " : " + Tinfo[0].select("p").get(0).text()
            + "(" + Tinfo[0].select("em").get(0).text() + (parseInt(Tinfo[0].select("p").get(0).text()) > 0 ? "▲" : "-") + ")\n";

        Tresult += Tinfo[1].select("strong").get(0).text() + " : " + Tinfo[1].select("p").get(0).text()
            + "(" + Tinfo[1].select("em").get(0).text() + (parseInt(Tinfo[1].select("p").get(0).text()) > 0 ? "▲" : "-") + ")\n";

        Tresult += Tinfo[2].select("strong").get(0).text().replace("망", "  망").replace("자", "  자") + " : " + Tinfo[2].select("p").get(0).text()
            + "(" + Tinfo[2].select("em").get(0).text() + (parseInt(Tinfo[2].select("p").get(0).text()) > 0 ? "▲" : "-") + ")\n";

        Tresult += Tinfo[3].select("strong").get(0).text() + " : " + Tinfo[3].select("p").get(0).text()
            + "(" + Tinfo[3].select("em").get(0).text() + (parseInt(Tinfo[3].select("p").get(0).text()) > 0 ? "▲" : "-") + ")";

        var todays = org.jsoup.Jsoup.connect("http://ncov.mohw.go.kr/bdBoardList_Real.do?").ignoreContentType(true).ignoreHttpErrors(true).get();
        var Todaydata = todays.select("div.content")

        var Cresult = "[" + Todaydata.select("span.t_date").text();
        var temp = Cresult.split(")");

        Cresult = temp[0].replace("(", "").replace(")", "") + "] 코로나 감염 현황\n신규확진 : ";


        var table = Todaydata.select("dd.ca_value").select("ul > li > p");
        table = table.text().split(" ");


        var total = table[1];
        var korea = table[2];
        var oversea = table[3];


        Cresult += total + "명\n" + "국내발생 : " + korea + "명 | 해외유입 : " + oversea + "명";

        var result = Cresult + "\n-------------------------------------- \n" + Tresult;
        return result;
    } catch (e) {
        Log.error("코로나 정보 불러오기 실패\n" + e);
        return null;
    }
};

function getlocalcodiv() {
    var rtimecoronaurl = "https://apiv2.corona-live.com/stats.json?timestamp=" + new Date().valueOf();

    var rtimecoronares = org.jsoup.Jsoup.connect(rtimecoronaurl).ignoreContentType(true).ignoreHttpErrors(true).get().wholeText();

    const rtimecoronaobj = JSON.parse(rtimecoronares);

    var rtimecity = new Array('서울', '부산', '인천', '대구',

        '광주', '대전', '울산', '세종', '경기', '강원',

        '충북', '충남', '경북', '경남', '전북', '전남',

        '제주', '검역');

    var rtimeabs = "";

    var total = new Array(0, 0);

    var rtimemsg = "‼️실시간 확진자 현황‼️\n";

    var rtimemsg2 = "";

    for (idx in rtimecoronaobj.current) {


        if (rtimecoronaobj.current[idx].cases[1] < 0) {

            rtimeabs = Math.abs(rtimecoronaobj.current[idx].cases[1]) + "▲";

        } else if (rtimecoronaobj.current[idx].cases[1] > 0) {

            rtimeabs = rtimecoronaobj.current[idx].cases[1] + "▼";

        } else {

            rtimeabs = rtimecoronaobj.current[idx].cases[1];

        }

        rtimemsg2 += "\n" + rtimecity[idx] + "\n확진자 : " + rtimecoronaobj.current[idx].cases[0] + "\n전일대비 : " + rtimeabs + "\n";

        total[0] += rtimecoronaobj.current[idx].cases[0] * 1;

        total[1] += rtimecoronaobj.current[idx].cases[1] * 1;

    }

    if (total[1] < 0) {

        total[1] = Math.abs(total[1]) + "▲";

    } else if (total[1] > 0) {

        total[1] = total[1] + "▼";

    } else {

        total[1] = total[1];

    }


    var today = new Date();
    var date = (today.getMonth() + 1) + '/' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes();
    var dateTime = date + ' ' + time;

    return dateTime + "기준 \n" + rtimemsg + "\n합계\n실시간 확진자 수 : " + total[0] + "\n전일대비 : " + total[1] + "\u200b".repeat(500) + "\n" + rtimemsg2

}

function vachine() {
    //API 로딩 및 배열 선언
    var vac = org.jsoup.Jsoup.connect("https://nip.kdca.go.kr/irgd/cov19stats.do").parser(org.jsoup.parser.Parser.xmlParser()).get().select("item"), firstCnt = [], secondCnt = [];
    //배열에 API 데이터 대입
    for (var i = 0; i < vac.size(); i++) {
        firstCnt[i] = vac.select("firstCnt").get(i).text().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    for (var i = 0; i < vac.size(); i++) {
        secondCnt[i] = vac.select("secondCnt").get(i).text().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    //출력
    return "[국내 코로나19 백신접종 현재 현황]\n1차 접종 수\n" + firstCnt[2] + "명(금일 +" + firstCnt[0] + ")\n2차 접종 수\n" + secondCnt[2] + "(금일 +" + secondCnt[0] + ")";


}

function SearchLines(msg) {
    var url = org.jsoup.Jsoup.connect("https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=" + msg.substr(6) + " 노래 제목 찾기").get();
    var singer = url.select("#main_pack > section.sc_new.cs_music_lyrics_search > div > div.api_cs_wrap > div > div > div > div.music_lyrics_result._music_result > div.inner_box > ul > li:nth-child(1) > div.body > div.info_area > span").text();
    var song = url.select("#main_pack > section.sc_new.cs_music_lyrics_search > div > div.api_cs_wrap > div > div > div > div.music_lyrics_result._music_result > div.inner_box > ul > li:nth-child(1) > div.body > div.info_area > strong > a").text();
    var singer2 = url.select("#main_pack > section.sc_new.cs_music_lyrics_search > div > div.api_cs_wrap > div > div > div > div.music_lyrics_result._music_result > div.inner_box > ul > li:nth-child(2) > div.body > div.info_area > span").text();
    var song2 = url.select("#main_pack > section.sc_new.cs_music_lyrics_search > div > div.api_cs_wrap > div > div > div > div.music_lyrics_result._music_result > div.inner_box > ul > li:nth-child(2) > div.body > div.info_area > strong > a").text();
    var song3 = url.select("#main_pack > section.sc_new.cs_music_lyrics_search > div > div.api_cs_wrap > div > div > div > div.music_lyrics_result._music_result > div.inner_box > ul > li:nth-child(3) > div.body > div.info_area > strong > a").text();
    var singer3 = url.select("#main_pack > section.sc_new.cs_music_lyrics_search > div > div.api_cs_wrap > div > div > div > div.music_lyrics_result._music_result > div.inner_box > ul > li:nth-child(3) > div.body > div.info_area > span").text();
    var singer4 = url.select("#main_pack > section.sc_new.cs_music_lyrics_search > div > div.api_cs_wrap > div > div > div > div.music_lyrics_result._music_result > div.inner_box > ul > li:nth-child(4) > div.body > div.info_area > span").text();
    var song4 = url.select("#main_pack > section.sc_new.cs_music_lyrics_search > div > div.api_cs_wrap > div > div > div > div.music_lyrics_result._music_result > div.inner_box > ul > li:nth-child(4) > div.body > div.info_area > strong > a").text();
    var singer5 = url.select("#main_pack > section.sc_new.cs_music_lyrics_search > div > div.api_cs_wrap > div > div > div > div.music_lyrics_result._music_result > div.inner_box > ul > li._li.last_list > div.body > div.info_area > span").text();
    var song5 = url.select("#main_pack > section.sc_new.cs_music_lyrics_search > div > div.api_cs_wrap > div > div > div > div.music_lyrics_result._music_result > div.inner_box > ul > li._li.last_list > div.body > div.info_area > strong > a").text();

    return "[●" + msg.substr(6) + "(이)가 포함 된 노래입니다●]\n♡" + singer + "의\n " + song + "\n♡" + singer2 + "의\n " + song2 + "\n♡" + singer3 + "의\n " + song3 + "\n♡" + singer4 + "의 " + song4 + "\n♡" + singer5 + "의\n " + song5 + "\n\n이정도 있을거에요~ ^-^♡";

}

function getCmd(cmd) {
    var result = "";
    for (var i = 0; i < cmd.length; i++) {

        result += cmd[i] + "\n";
    }
    return result;
}
const BufferedReader = java.io.BufferedReader;
const DataOutputStream = java.io.DataOutputStream;
const InputStreamReader = java.io.InputStreamReader;
const HttpURLConnection = java.net.HttpURLConnection;
const URL = java.net.URL;
const URLEncoder = java.net.URLEncoder;
NMT = (source, target, text) => {
    clientId = "yEBjj4cf3cSROZ12eQDy";
    clientSecret = "rXGxDsmYgl";
    try {
        text = encodeURI(text);
        apiURL = "https://openapi.naver.com/v1/papago/n2mt";
        url = new URL(apiURL);
        con = url.openConnection();
        con.setRequestMethod("POST");
        con.setRequestProperty("X-Naver-Client-Id", clientId);
        con.setRequestProperty("X-Naver-Client-Secret", clientSecret);
        postParams = "source=" + source + "&target=" + target + "&text=" + text;
        con.setDoOutput(true);
        wr = new DataOutputStream(con.getOutputStream());
        wr.writeBytes(postParams);
        wr.flush();
        wr.close();
        br = new BufferedReader(new InputStreamReader(con.getInputStream()));
        var inputLine;
        var res = "";
        while ((inputLine = br.readLine()) != null) res += inputLine;
        br.close();
        return JSON.parse(res).message.result.translatedText;
    } catch (e) {
        return "***번역 오류***";
    }
}

function getCurrentTime(type) {
    var date = new Date();
    var result = "";
    if (type == 1) {//yyyy/mm/dd hh:mm;
        result = date.getFullYear + "/" + (date.getMonth + 1) + "/" + date.getDate + " " + date.getHours + ":" + date.getMinutes;
    } else if (type == 2) { // yyyy-mm-dd hh:mm;
        result = date.getFullYear + "-" + (date.getMonth + 1) + "-" + date.getDate + " " + date.getHours + ":" + date.getMinutes;
    } else if (type == 3) {//년월일 시분
        result = date.getFullYear + "년 " + (date.getMonth + 1) + "월 " + date.getDate + "일 " + date.getHours + "시 " + date.getMinutes + "분";
    } else if (type == 3) {
        result = (date.getMonth + 1) + "월 " + date.getDate + "일 " + date.getHours + "시 " + date.getMinutes + "분";
    } else {
        //default
        result = date;
    }
    return result;
}