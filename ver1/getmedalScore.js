if (msg == "도쿄" || msg == "올림픽" || msg == "도쿄올림픽" || msg == "도쿄 올림픽" || msg == "메달") {

    //올림픽 우리나라 순위

    var grade = org.jsoup.Jsoup

        .connect("https://search.naver.com/search.naver?where=nexearch&sm=tab_etc&mra=blM4&pkid=6011&qvt=0&query=%EB%8F%84%EC%BF%84%20%EC%98%AC%EB%A6%BC%ED%94%BD")

        .get().select("div[class=sub_title] > span[class=txt]").text();



    //우리나라 금메달 갯수

    var gold = org.jsoup.Jsoup

        .connect("https://search.naver.com/search.naver?where=nexearch&sm=tab_etc&mra=blM4&pkid=6011&qvt=0&query=%EB%8F%84%EC%BF%84%20%EC%98%AC%EB%A6%BC%ED%94%BD")

        .get()

        .select("div[class=medal_info] > span[class=ico_medal gold]")

        .text().replace(/[^0-9]/g, '');



    //우리나라 은메달 갯수

    var silver = org.jsoup.Jsoup

        .connect("https://search.naver.com/search.naver?where=nexearch&sm=tab_etc&mra=blM4&pkid=6011&qvt=0&query=%EB%8F%84%EC%BF%84%20%EC%98%AC%EB%A6%BC%ED%94%BD")

        .get()

        .select("div[class=medal_info] > span[class=ico_medal silver]")

        .text().replace(/[^0-9]/g, '');



    //우리나라 동메달 갯수

    var bronze = org.jsoup.Jsoup

        .connect("https://search.naver.com/search.naver?where=nexearch&sm=tab_etc&mra=blM4&pkid=6011&qvt=0&query=%EB%8F%84%EC%BF%84%20%EC%98%AC%EB%A6%BC%ED%94%BD")

        .get()

        .select("div[class=medal_info] > span[class=ico_medal bronze]")

        .text().replace(/[^0-9]/g, '');



    Kakao.send(room, {

        "link_ver": "4.0",

        "template_id": 템플릿아이디,

        "template_args": {

            "grade": grade,

            "gold": gold,

            "silver": silver,

            "bronze": bronze

        }

    }, "custom");



}

/*
let url = "https://c11.kr/qsxm";
let data = Jsoup.connect(url).get();
data.select(".medal_info").text();


const kalingModule = require('kakaoLink').Kakao() 

const Kakao = new kalingModule(); Kakao.init("5664382943394932") 

Kakao.login('23@gmail.com','ㄷ'); var prefix = "!"; function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) { if(msg == prefix + "안녕"){ Kakao.send(room,{ "link_ver" : "4.0", "template_id" : ㅋ, "template_args" : { } }, "custom"); }}
    this.StatusCodes = {
        SUCCESS: 0,
        M_EXIST_TALK_USER: 10,
        M_EXIST_EMAIL: 11,
        M_WRONG_PASSWORD: 12,
        M_EXCEED_LOGIN_LIMIT: 13,
        M_EXCEED_CHECK_LIMIT: 15,
        M_CHECK_PHONE_NUMBER: 20,
        M_TEMPORARY_ERROR: 21,
        M_CHECK_STORY_NAME: 22,
        M_DUPLICATED_LOGIN_REQUEST: 23,
        M_NEED_CHECK_PHONE_NUMBER_WITH_DEACTIVATION_POPUP: 24,
        M_NEED_CHECK_QUIZ: 25,
        M_DORMANT_ACCOUNT: 26,
        M_RESTRICTED_ACCOUNT: 27,
        M_TWO_STEP_VERIFICATION_USER: 28,
        M_ALLOWED_COUNTRY: 29,
        M_ALREADY_OCCUPIED_ACCOUNT_BY_SOMEONE_ELSE: 30700,
        INTERNAL_ERROR: -500,
        NOT_FOUND: -404,
        MULTI_ACCOUNTS_FOUND: -479,
        CLIENT_NOT_FOUND: -400,
        CLIENT_DEACTIVATED: -421,
        UNAUTHORIZED: -401,
        ALREADY_EXISTS: -430,
        BAD_PARAMETERS: -440,
        ACCOUNT_ALREADY_EXISTS: -441,
        INVALID_EMAIL: -442,
        INVALID_PASSWORD: -443,
        INVALID_PASSCODE: -444,
        EXCEED_PASSCODE_LIMIT: -445,
        NOT_EXIST_ACCOUNT: -446,
        PASSCODE_CREATION_ERROR: -447,
        SEND_EMAIL_ERROR: -448,
        EXCEED_LOGIN_LIMIT: -449,
        MISMATCH_PASSWORD: -450,
        NEED_CAPTCHA: -481,
        CRYPTO_ERROR: -484,
        INVALID_STATUS: -460,
        BLOCKED_EMAIL: -461,
        ACCOUNT_ALREADY_VERIFIED: -462,
        INVALID_PHONE_NUMBER: -463,
        PHONE_NOT_FOUND: -464,
        VERIFY_ME_FAIL: -465,
        EXCEED_QUIZ_LIMIT: -466,
        INVALID_VERIFY_TOKEN: -467,
        EXPIRED_VERIFY_TOKEN: -468,
        INVALID_IP_ACCESS: -470,
        BLOCKED_DOMAIN: -471,
        EXCEED_REQUEST_LIMIT: -473,
        EXPIRED_PASSCODE: -474,
        CONTACT_CS: -498,
        BAD_REQUEST: -485,
        EXPIRED_ARS_CODE: -486,
        INVALID_ARS_CODE: -487,
        ARS_CODE_ALREADY_VALIDATED: -489,
        DORMANT: -488,
        UNACCEPTABLE_PASSWORD: -489,
        ADDITIONAL_AUTH_REQUIRED: -495,
        ADDITIONAL_AUTH_BLOCKED: -496,
        RESTRICTED_TALK: -497,
        TWO_STEP_VERIFICATION_REQUIRED: -451,
        TWO_STEP_VERIFICATION_BLOCKED: -452,
        ALLOWED_COUNTRY_REQUIRED: -435,
        ALLOWED_COUNTRY_BLOCKED: -436,
        ALLOWED_COUNTRY_WAIT: -437,
        ACCESS_RESTRICTED_BLOCKED: -476,
        ACCESS_RESTRICTED_PROTECTED_BY_USER: -477,
        ACCESS_RESTRICTED_PROTECTED_BY_KAKAO: -478,
        UNIFY_RESTRICTED_IP_BLOCKED: -480,
        PASSWORD_CHECK_REQUIRED: -490,
        REJECTED_DEACTIVATION: -491,
        TALK_CLIENT_UNKNOWN_ERROR: -1e4,
        INVALID_TALK_SESSION: -2e3,
        AGE_AUTH_STATUS_ERROR: -465,
        AGE_AUTH_NO_SUCH_USER: -468,
        NOT_AUTHORIZED_AGE: -450,
        LOWER_AGE_LIMIT: -451,
        ALREADY_AGE_AUTHORIZED: -452,
        EXCEED_AGE_CHECK_LIMIT: -453,
        AGE_AUTH_EXTERNAL_CALL_FAIL: -454,
        AGE_AUTH_RESULT_MISMATCH: -480,
        CI_RESULT_MISMATCH: -481,
        MISMATCH_ACCOUNT_INFO: -476,
        EXCEED_PREV_NAME_CHECK_LIMIT: -477,
        EXIST_CHANGE_NAME_INFO: -478,
        ACTIVE_CI_COUNT_LIMIT: -479,
        EXCEED_REQ_PASSCODE_TRY_COUNT: -485,
        EXCEED_VERIFY_PASSCODE_TRY_COUNT: -486,
        ACCOUNT_ALREADY_CONNECTED: -455,
        ACCOUNT_NOT_CONNECTABLE: -456,
        ACCOUNT_ALREADY_UNIFIED: -457,
        CANNOT_UNIFY_ACCOUNT: -458,
        EXCEED_UNIFY_LIMIT: -459,
        REQUIRE_UNIFY: -434,
        EC_ACCOUNT_LACKING_EMAIL: -310,
        EC_NON_EXISTING_DAUM_EMAIL: -311,
        EC_EMAILS_NOT_MATCHING: -312,
        EC_TARGET_ACCOUNT_OCCUPIED: -313,
        EC_PASSCODE_REQUIRED: -314,
        EC_DAUM_DOMAIN_EMAIL: -315,
        STRONG_AUTH_ALREADY_AUTHORIZED: -251,
        STRONG_AUTH_NO_INIT: -252,
        STRONG_AUTH_INVALID_INFO: -253,
        STRONG_AUTH_PASSCODE_MISMATCH: -254,
        REQUIRE_TERMS: -201,
        NOT_AUTHORIZED_TERMS: -202,
        COUNTRY_CODE_REQUIRED: -491,
        UNDER_AGE: -410,
        TALK_SUSPENDED: -411,
        EXCEED_GUARDIAN_LIMIT: -431,
        EXPIRE_GUARDIAN_TOKEN: -432,
        REQUIRE_GUARDIAN_AGREE: -433,
        NOT_YET_QR_VERIFIED: -428,
        QR_EXPIRED: -468,
        ONLY_NATIVE_ALLOWED: -415,
        NEED_KAKAO_TALK_LOGIN: -416,
        NEED_AGE_AUTH: -417,
        NEED_VERIFY_PHONE_NUMBER: -418,
        UNDER_AGE: -419,
        TOKEN_STATE_WAIT: -420,
        TOKEN_STATE_BLOCKED: -421,
        ALREADY_KAKAO_MAIL_EXISTS: -423,
        INVALID_KAKAO_ID: -427,
        SERVICE_CHECKING: -429
    }
[출처] 카카오링크 로그인? 에러코드 모음 (카카오톡 봇 커뮤니티) | 작성자 archethic


*/


전체소스:

const KalingModule = require('Kaling.js').Kakao();

const Kakao = new KalingModule();

Kakao.init("키");

Kakao.login('아이디', '비밀번호');

const Thread = java.lang.Thread;

const Jsoup = org.jsoup.Jsoup;

let status;

let loopStarted = false;

let stop = false;

let data_real = [];

let data_pre = [];

/*-- 변수 설정 --*/



let room_raw = ["방1 링크", "방2 링크", "방3 링크", "방4 링크"];//사용할 방 주소 순서대로 추가하시면 됩니다.

let room_names = ["방1", "방2", "방3", "방4"];//사용할 방 이름 정확하게 순서대로 추가하시면 됩니다.

let korean = true;//한국에서 접속할경우 true로 해두시면 응답속도가 더 빨라집니다. 접속이 아에 안되거나 해외에서 접속하시는분들은 false로 설정해주세요.

for (var count2 = 0; count2 < room_raw.length; count2++) {

    data_real.push({

        result: null
    });

    data_pre.push({

        result: null
    });

}

const source_name = "자동인사";//메봇에서의 소스 이름을 넣으셔야 합니다.

const utc = 1000;// 업데이트 시간 주기입니다; 단위는 ms 입니다; 1S=1000ms; 최소 500이상 - 최대 3000을 권장합니다;

const utce = 60000;//에러 발생시 다음 업데이트까지 대기시간입니다; 단위는 ms 입니다; 1S=1000ms; 최소 30000이상 - 최대 300000을 권장합니다.

/*-- 변수 설정 끝 --*/



function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {

    if (!loopStarted) {

        loopStarted = true;

        while (!stop) {

            if (java.lang.Thread.interrupted() == true) {

                Api.off(source_name);

                return "stopped";

            }

            var success = updateData(); // 데이터 업데이트

            if (status == 403) {

                Api.off(source_name);

                return "stopped";

            }

            if (success) {

                for (let i = 0; i < room_raw.length; i++) {

                    if (data_pre[i].result != null) {

                        if (data_real[i].result.headcount > data_pre[i].result.headcount) {

                            Api.replyRoom(room_names[i], "어서오삼");

                            Kakao.send(room, {

                                "link_ver": "4.0",

                                "template_id": 템플릿 번호,

                                "template_args": {}
                            }, "custom");

                        } else if (data_real[i].result.headcount < data_pre[i].result.headcount)

                            Api.replyRoom(room_names[i], "");

                    }

                }

                /*for (let i = 0; i < room_raw.length; i++) {
                
                if (data_pre[i].result != null) {
                
                if (data_real[i].result.like > data_pre[i].result.like) 
                
                Api.replyRoom(room_names[i], "♥↗ \n\xa0하트:\xa0" + data_pre[i].result.like + "↗" + data_real[i].result.like);
                
                else if (data_real[i].result.like < data_pre[i].result.like) 
                
                Api.replyRoom(room_names[i], "♥↘ \n\xa0하트:\xa0" + data_pre[i].result.like + "↘" + data_real[i].result.like);
                
                }
                
                }*/



                Thread.sleep(utc); //업데이트 주기 입니다. (ms 단위) 

            } else {

                Thread.sleep(utce); // 연결 에러시 대기시간

            }

        }

    }

}

updateData = () => {

    let res;

    try {

        for (let i = 0; i < room_raw.length; i++) {

            data_pre[i] = data_real[i]; // copy previous data_pre to data_real

            if (korean) {

                res = Jsoup.connect("https://icn.develope.kr/search/room?room=" + room_raw[i]).header("Host", "api.develope.kr").ignoreContentType(true).ignoreHttpErrors(true).execute(); //강제로 ICN 엣지 연결.

            } else {

                res = Jsoup.connect("https://api.develope.kr/search/room?room=" + room_raw[i]).ignoreContentType(true).ignoreHttpErrors(true).execute(); //일반 모드.

            }

            status = res.statusCode();

            if (status != 200) {

                let a = "[오류]\xa0서버로부터\xa0정보를\xa0받아오지\xa0못했습니다.";

                if (status == 503) {

                    a = a + "\n현재\xa0서버가\xa0점검\xa0중입니다.\xa0자세한\xa0정보는\xa0https://api.develope.kr/\xa0을\xa0확인해주세요.\n" + utce / 1000 + "초\xa0후\xa0연결을\xa0다시\xa0시도합니다.";

                } else if (status == 403) {

                    a = a + "\n사용자의\xa0IP가\xa0서버로부터\xa0차단되었습니다.\xa0자세한\xa0사항은\xa0소스\xa0밑\xa0주석에\xa0작성되어있는\xa0연락처를\xa0통해\xa0문의해주세요.";

                } else {

                    a = a + "\n인터넷\xa0연결을\xa0확인해보시길\xa0바랍니다.\xa0계속\xa0안되는경우\xa0소스\xa0밑\xa0주석에\xa0작성되어있는\xa0연락처를\xa0통해\xa0질문하실수\xa0있습니다.\n" + utce / 1000 + "초\xa0후\xa0연결을\xa0다시\xa0시도합니다.";

                }

                a = a + "\nHTTP\xa0" + status + "\xa0ERROR";

                Log.e(a);

                return false;

            }

            let obj = JSON.parse(res.body());

            data_real[i] = obj;

        }

        return true;

    } catch (e) {

        Log.e("오류가\xa0발생했습니다.\xa0" + utce / 1000 + "초\xa0후\xa0연결을\xa0다시\xa0시도합니다.\n에러\xa0내0용:" + e);

        return false;

    }

};

function onStartCompile() {

    stop = true;

}


[출처] 입퇴장감지 소스 질문(카카오톡 봇 커뮤니티) | 작성자 본쥭

Kakao.send(room
    -> Kakao.send(room_names[i]
    
    2021.04.02. 02: 08 답글쓰기