
const scriptname = '끝말잇기';
function isWord(word) {
    let a = org.jsoup.Jsoup.connect('https://stdict.korean.go.kr/search/searchResult.do').data('searchKeyword', word).post();
    let result = '';
    for (i = 0; i < a.select('ul[class=\'result\'] > li').size(); i++) {
        result += a.select('ul[class=\'result\'] > li').get(i).text();
        result += '\n\n';
    }
    if (!result) return false;
    if (result.includes('「명사」')) return true;
    else return false;
}

let game = {};
function response(room, msg, sender, isGroupChat, replier) {
    if (!game.players) game.players = [];
    if (msg == '!끝말잇기 참가') {
        if (game.started) {
            replier.reply('이미 시작되어 있습니다.');
            return;
        }
        if (game.players.includes(sender)) {
            replier.reply('이미 참가되어 있습니다.');
            return;
        }
        replier.reply('참가되었습니다!');
        game.players.push(sender);
    }
    if (msg == '!끝말잇기 시작') {
        if (game.started) {
            replier.reply('이미 시작되어 있습니다.');
            return;
        }
        if (!game.players.includes(sender)) {
            replier.reply('게임에 참가하세요.');
            return;
        }
        if (game.players.length <= 1) {
            replier.reply('혼자선 게임을 플레이하실 수 없습니다.');
            return;
        }
        replier.reply('게임이 시작되었습니다.');
        game.started = true;
        game.words = [];
        let a = '가나다라마바사아자차카타파하';
        let b = a[Math.random() * a.length | 0];
        game.first = b;
        game.players = game.players.sort(() => Math.random() - 0.5);
        replier.reply('시작 단어는 ' + b + ', 첫 차례는 ' + game.players[0] + ' 님입니다.');
        return;
    }
    if (game.started) {
        if (game.players[0] == sender) {
            msg = msg.trim();
            let f = msg[0];
            if (game.first != f) {
                replier.reply('현재 글자는 ' + game.first + '입니다.');
                return;
            }
            if (msg.length <= 1) {
                replier.reply('한 글자를 초과하는 단어만 가능합니다.');
                return;
            }
            if (game.words.includes(msg)) {
                replier.reply('이미 했던 단어입니다.');
                return;
            }
            if (!isWord(msg)) {
                replier.reply(msg + ': 사용 불가한 단어입니다.');
                replier.reply(sender + ' 님이 탈락하셨습니다!');
                game.players.shift();
                if (game.players.length == 1) {
                    replier.reply('승자는 ' + game.players[0] + ' 님입니다!');
                    game = {};
                    return;
                }
                let a = '가나다라마바사아자차카타파하';
                let b = a[Math.random() * a.length | 0];
                game.first = b;
                game.players = game.players.sort(() => Math.random() - 0.5);
                replier.reply('시작 단어는 ' + b + ', 첫 차례는 ' + game.players[0] + ' 님입니다.');
                game.words = [];
                return;
            }
            replier.reply(sender + ' 님이 ' + msg + ' 단어를 입력하셨습니다.');
            let a = game.players.shift();
            {
                replier.reply('부호는 사용 불가합니다.');
                return;
            }
            {
                replier.reply('ㄹ이 끝으로 나오면ㅇ으로 바꿀 수 있습니다.');
                return;
            }
            game.players.push(a);
            game.first = msg.slice(-1);
            game.words.push(msg);
            replier.reply('차례는 ' + game.players[0] + ' 님이고, 글자는 ' + game.first + '입니다.');
        }
    }
}