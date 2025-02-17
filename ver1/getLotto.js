function response(room, msg, sender, isGroupChat, replier) {

    if (msg == "복권") {

        replier.reply("<다음중 선택하세요>" + "\n" + "/로또추천" + "\n" + "/로또확인" + "\n" + "/연금추천" + "\n" + "/연금확인");

    }

    if (msg == "/로또추천") {

        var lotto = [];

        for (var n = 0; n < 6; n++) {

            var ran = Math.floor(Math.random() * 45) + 1;

            if (lotto.includes(ran)) n--;

            else lotto.push(ran);

        }

        replier.reply("/로또추천 : " + lotto.sort((a, b) => a - b).join(", "));

    }

    if (msg == "/로또확인") {

        var data = org.jsoup.Jsoup.connect("https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=" + "로또").get();

        var result = "🍀 ";

        var number = data.select("div.num_box") + "\n";

        var round = data.select("a[class=_lotto-btn-current]") + "";

        number = number.replace(/<[^>]+>/g, "");

        number = number.split(",");

        round = round.replace(/<[^>]+>/g, "");

        round = round.split("\n");

        result += round + "\n" + number[0].substring(0, number[0].length - 12);

        replier.reply(result);

    }

    if (msg == "/연금확인") {

        var data = org.jsoup.Jsoup.connect("https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=연금복권확인").get();

        var result = "🍀 ";

        var number = data.select("div.lottery_win") + "\n";

        var round = data.select("a[class=_lottery-btn-current]") + "";

        number = number.replace(/<[^>]+>/g, "");

        number = number.split(",");

        round = round.replace(/<[^>]+>/g, "");;

        round = round.split("\n")

        result += round + "\n" + number[0].substring(0, number[0].length - 7);

        replier.reply(result);

    }

    if (msg == "/연금추천") {

        var yeon1 = Math.floor(Math.random() * 5) + 1;

        var yeon2 = [];

        for (var n = 0; n < 6; n++) {

            var rand = Math.floor(Math.random() * 9) + 1;

            if (yeon2.includes(rand)) n--;

            else yeon2.push(rand);

        }

        replier.reply("/연금추천 : " + yeon1 + "조 " + yeon2.join(", "));

    }

}
