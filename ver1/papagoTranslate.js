const BufferedReader = java.io.BufferedReader
const DataOutputStream = java.io.DataOutputStream
const InputStreamReader = java.io.InputStreamReader
const HttpURLConnection = java.net.HttpURLConnection
const URL = java.net.URL
const URLEncoder = java.net.URLEncoder
NMT = (source, target, text) => {
  clientId = "아이디"
  clientSecret = "시크릿넘버"
  try {
    text = encodeURI(text);
    apiURL = "https://openapi.naver.com/v1/papago/n2mt";
    url = new URL(apiURL);
    con = url.openConnection();
    con.setRequestMethod("POST");
    con.setRequestProperty("X-Naver-Client-Id", clientId);
    con.setRequestProperty("X-Naver-Client-Secret", clientSecret);
    postParams = "source=" + source + "&target=" + target + "&text=" + text;
    con.setDoOutput(true);
    wr = new DataOutputStream(con.getOutputStream());
    wr.writeBytes(postParams);
    wr.flush();
    wr.close();
    br = new BufferedReader(new InputStreamReader(con.getInputStream()))
    var inputLine;
    var res = ""
    while ((inputLine = br.readLine()) != null) res += inputLine;
    br.close();
    return JSON.parse(res).message.result.translatedText
  } catch (e) {
    return "***번역 오류***"
  }
}

function response(room, msg, sender, _, replier) {

  if (msg.startsWith("!번역")) {
    start = msg.split(" ")[1]
    end = msg.split(" ")[2]
    text = msg.split(" ")
    text.splice(0, 3)
    text = text.join(" ")
    replier.reply(NMT(start, end, text))
  }
}
/*
node.js
var express = require('express');
var app = express();
var client_id = 'YOUR_CLIENT_ID';
var client_secret = 'YOUR_CLIENT_SECRET';
var query = "번역할 문장을 입력하세요.";
app.get('/translate', function (req, res) {
   var api_url = 'https://openapi.naver.com/v1/papago/n2mt';
   var request = require('request');
   var options = {
       url: api_url,
       form: {'source':'ko', 'target':'en', 'text':query},
       headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
   request.post(options, function (error, response, body) {
     if (!error && response.statusCode == 200) {
       res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
       res.end(body);
     } else {
       res.status(response.statusCode).end();
       console.log('error = ' + response.statusCode);
     }
   });
 });
 app.listen(3000, function () {
   console.log('http://127.0.0.1:3000/translate app listening on port 3000!');
 });
 한국어(ko)-영어(en), 한국어(ko)-일본어(ja), 한국어(ko)-중국어 간체(zh-CN),
 한국어(ko)-중국어 번체(zh-TW), 한국어(ko)-스페인어(es), 한국어(ko)-프랑스어(fr),
 한국어(ko)-러시아어(ru), 한국어(ko)-베트남어(vi), 한국어(ko)-태국어(th),
 한국어(ko)-인도네시아어(id), 한국어(ko)-독일어(de), 한국어(ko)-이탈리아어(it),

 중국어 간체(zh-CN) - 중국어 번체(zh-TW), 중국어 간체(zh-CN) - 일본어(ja),
  중국어 번체(zh-TW) - 일본어(ja),

  영어(en)-일본어(ja), 영어(en)-중국어 간체(zh-CN), 영어(en)-중국어 번체(zh-TW),
  영어(en)-프랑스어(fr)를 지원합니다.
* 처리한도 : 10,000글자/일
*/