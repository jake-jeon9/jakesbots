const chat = {};
const line = "═".repeat(20);
const FV = "\u200b".repeat(500);


function response(room, msg, sender, igc, replier) {
    chat[room] || (chat[room] = {});
    chat[room][sender] || (chat[room][sender] = 0);

    chat[room][sender] += 1;
    let data = chat[room];

    if (msg == "!채팅순위") {
        let total = Object.keys(data).reduce((a, b) => a + data[b], 0);
        let sort = Object.keys(data).sort((a, b) => data[b] - data[a]).slice(0, 150);
        let map = sort.map((e, i) => ++i + "위 [" + data[e] + "회, " + (data[e] / total * 100).toFixed(2) + "%] : " + e);
        replier.reply("『 🗣️ Chat Rank 』" + FV + "\n\nTotal : " + total + "\n\n" + line + "\n\n" + map.join("\n\n") + "\n\n" + line);
    }
}
