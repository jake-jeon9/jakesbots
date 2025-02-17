response = (room, msg, sender, isGroupChat, replier, ImageDB, packageName) -> 
    if msg is "/코로나"
        data = Utils.parse "http://ncov.mohw.go.kr/"
        data = data.select "ul.liveNum"
        data = data.select "span"
        result = "\n누적확진 : " + data.get(0).ownText() + data.get(2).text().replace("전일대비", "")
        result += "\n격리해제 : " + data.get(3).text() + " " + data.get(4).text()
        result += "\n치료 중 : " + data.get(6).text() + " " + data.get(7).text()
        result += "\n사망 : " + data.get(8).text() + " " + data.get(9).text()
        replier.reply result