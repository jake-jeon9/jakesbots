
const myJsKey = "";
const Email = "";
const pw = "";

const kalingModule = require('kaling').Kakao();
const Kakao = new kalingModule();
Kakao.init(myJsKey);
Kakao.login(Email, pw);