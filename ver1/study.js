const data = {}, command = ['/가르치기 ', '/학습제거', '/학습내용', '/학습불러오기'];
const sdcard = File.getSdcardPath();


saveChat

function response() {

    let a = arguments;

    data[room] || (data[room] = {});

    if (a[1].startsWith(command[0])) {

        a[1] = a[1].slice(6);

        data[room][a[1].split(':')[0]] = a[1].split(':')[1];

    }



    if (Object.keys(data[room]).includes(a[1])) {

        a[4].reply(data[room][a[1]]);

    }



    if (a[1] == command[1]) Api.compile();



    if (a[1].startsWith(command[1] + ' ')) {

        delete data[room][a[1].slice(6)];

    }



    if (a[1] == command[2] && data != {}) {

        a[4].reply(Object.keys(data[room]).map((e, i) => e + "이라고 하면 " + data[room][e]).join('\n'));

    }

}
