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

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName) {
    var cmd = msg.split(" ")[0];
    var data = msg.replace(cmd + " ", "");
    if (cmd == "/날씨") {
        var result = Utils.getWeather(data);
        if (result == null) replier.reply("날씨 정보 불러오기 실패");
        else replier.reply("[" + data + " 날씨 정보]\n" + result);
    }
}


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