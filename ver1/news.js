importClass(org.jsoup.Jsoup);

function response(room, msg) {
    if (msg == "/뉴스") {
        let d = Jsoup.connect("https://c11.kr/pldn").get().select("div.ranking_thumb");
        Kakao.send(room, {
            "link_ver": "4.0",
            "template_id": 35808,
            "template_args": {
                "title1": d.eq(0).select("img").attr("title"),
                "title2": d.eq(1).select("img").attr("title"),
                "title3": d.eq(2).select("img").attr("title"),
                "title4": d.eq(3).select("img").attr("title"),
                "title5": d.eq(4).select("img").attr("title"),
                "img1": d.eq(0).select("img").attr("src").split("?")[0],
                "img2": d.eq(1).select("img").attr("src").split("?")[0],
                "img3": d.eq(2).select("img").attr("src").split("?")[0],
                "img4": d.eq(3).select("img").attr("src").split("?")[0],
                "img5": d.eq(4).select("img").attr("src").split("?")[0],
                "link1": "http://news.naver.com" + d.eq(0).select("a").attr("href"),
                "link2": "http://news.naver.com" + d.eq(1).select("a").attr("href"),
                "link3": "http://news.naver.com" + d.eq(2).select("a").attr("href"),
                "link4": "http://news.naver.com" + d.eq(3).select("a").attr("href"),
                "link5": "http://news.naver.com" + d.eq(4).select("a").attr("href")
            }
        }, "custom");
    }
}

const FS = FileStream, path = "/sdcard/user.json";
const user = JSON.parse(FS.read(path)) || {};

let list = [];

const INTER = setInterval(function () {
    let log = enex(), room;
    if (log && !list.includes(log._id)) {
        let { msg, userId, chatId } = log;
        if (room = getRoomName(chatId)) {
            if (msg.feedType == 4) {
                let name = msg.members[0].nickName;
                Api.replyRoom(room, name + "님 어서오세요!");
                user[userId] && Api.replyRoom(room, "이전 이름 : " + user[userId]);
            } else {
                let name = msg.member.nickName;
                Api.replyRoom(room, name + "님 안녕히가세요!");
                user[userId] = name;
                FS.write(path, JSON.stringify(user));
            }
            list.push(log._id);
            list = list.slice(-5);
        }
    }
}, 500);

function getRoomName(chat_id) {
    let cursor = db.rawQuery("SELECT * FROM chat_rooms WHERE id=?", [chat_id]);
    if (cursor.moveToNext()) {
        let link_id = cursor.getString(23);
        cursor = db2.rawQuery("SELECT name FROM open_link WHERE id=?", [link_id]);
        cursor.moveToNext();
        return cursor.getString(0);
    }
}

function enex() {
    let cursor = db.rawQuery("SELECT * FROM chat_logs ORDER BY _id DESC LIMIT 10", []);
    let result = [];
    cursor.moveToFirst();
    do {
        let v = JSON.parse(cursor.getString(13))
        if (v.origin.endsWith("MEM")) {
            let obj = {};
            let user_id = cursor.getString(4);
            let message = cursor.getString(5);
            obj._id = cursor.getString(0);
            obj.chatId = cursor.getString(3);
            obj.userId = cursor.getString(4);
            obj.msg = JSON.parse(decrypt(user_id, v.enc, message));
            result.push(obj);
        }
    } while (cursor.moveToNext());
    return result[0];
}

const onStartCompile = () => clearInterval(INTER);