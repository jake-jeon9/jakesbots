
function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName) {

    if (msg == "/코로나") {
        var result = Utils.getCovid();
        if (result == null) replier.reply("코로나 정보 불러오기 실패");
        else replier.reply(result);
    } else if (msg == "/실시간코로나") {
        var result = getlocalcodiv();
        if (result == null) replier.reply("코로나 지역 정보 불러오기 실패");
        else replier.reply(result);
    } else if (msg == "/백신현황") {
        var result = vachine();
        if (result == null) replier.reply("백신 정보 불러오기 실패");
        else replier.reply(result);
    }
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