function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    if (msg.startsWith("/운세 ")) {
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
        replier.reply("[※ 오늘의 " + msg.substr(4) + " 운세]\n" + main + "\n\n" + year1 + " | " + year1Text
            + "\n\n" + year2 + " | " + year2Text + "\n\n" + year3 + " | " + year3Text + "\n\n" + year4 + " | " + year4Text);
    }
}
