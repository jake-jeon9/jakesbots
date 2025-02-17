const scriptName = "네이버 가사검색 노래찾기";



function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {

    if (msg.startsWith("/노래찾기 ")) {

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



        replier.reply("[●" + msg.substr(6) + "(이)가 포함 된 노래입니다●]\n♡" + singer + "의\n " + song + "\n♡" + singer2 + "의\n " + song2 + "\n♡" + singer3 + "의\n " + song3 + "\n♡" + singer4 + "의 " + song4 + "\n♡" + singer5 + "의\n " + song5 + "\n\n이정도 있을거에요~ ^-^♡");



    }

}