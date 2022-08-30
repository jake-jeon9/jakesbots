/*

시세 정보

업비트 API 코인정보

*/



function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName) {



    var cmd = msg.split(" ")[0];

    var keyword = msg.replace(cmd + " ", "");

    keyword = keyword.replace(" ", "");

    if (cmd == "/코인" || cmd == "/코")



        var arr_pos = keyword.split(",");



    for (var ii in arr_pos) {



        var url = "https://api.upbit.com/v1/market/all";



        var json = Utils.getWebText(url);

        json = json.replace(/(<([^>]+)>)/ig, "");



        datas = JSON.parse(json);

        for (var i in datas) {

            var keywordData = datas[i];

            var si = keywordData["korean_name"].replace(/(<([^>]+)>)/ig, " ");

            if (si == arr_pos[ii]) {

                var bitname = keywordData["market"].replace(/(<([^>]+)>)/ig, " ").split("-")[1];

            }

        }



        if (bitname == null || bitname == "") {

            replier.reply("검색어를 확인하세요.");

        } else {



            var url1 = "https://api.upbit.com/v1/ticker?markets=KRW-" + bitname;



            var json1 = Utils.getWebText(url1);

            json1 = json1.replace(/(<([^>]+)>)/ig, "");

            var keywords1 = new Array();

            datas1 = JSON.parse(json1);

            var keywordData1 = datas1[0];

            var trade_price = keywordData1["trade_price"];

            var signed_change_price = keywordData1["signed_change_price"];

            var signed_change_rate = keywordData1["signed_change_rate"];





            var day = new Date();

            var result = "<" + arr_pos[ii] + "(" + bitname + ") 시세정보>\n";

            result += "[" + (day.getMonth() + 1) + "월" + day.getDate() + "일 " + day.getHours() + "시" + day.getMinutes() + "분 기준]\n";

            result += "현재시세 : " + trade_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "원\n";

            result += "변동시세 : " + signed_change_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "원";

            result += "(" + (signed_change_rate * 100).toFixed(2) + "%)";



            if (result == null || result == "") replier.reply("검색어를 확인하세요.");

            else replier.reply(result);



        }

    }



}
