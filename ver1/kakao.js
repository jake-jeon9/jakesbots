
const myJsKey = "87132917082e4b1f4da1d56b937aaac3";
const Email = "hunyun11@naver.com";
const pw = "ofkorea1";

const kalingModule = require('kaling').Kakao();
const Kakao = new kalingModule();
Kakao.init(myJsKey);
Kakao.login(Email, pw);