# ext-messenger-api
- - -
# About

Bookdeal를 이용하여 도서 거래시 그에 대한 SMS 인증 문자 및 안내 카톡을 구매자나 판매자에게 보내는 third party API 입니다. 
동시에 sktelink에서는 '모두의 캠퍼스' 혹은 '북딜' 가입 시 인증 문자를 보내는 역할을 합니다.
기존의 sktelink와 biztalk 코드를 개편하고 하나의 API 서버로 통일 했습니다. 
(sktelink, biztalk 레포 링크로 연결 하기)

# Server Structure

![structure](https://i.imgur.com/sOLYEgR.png)

Batch Process Server에서 메세지 및 카카오톡을 보내는 주체는 Agent Program 입니다.

Database에 데이터가 들어가면 그 Database를 watch하는 batch process server에 의해 감지되고, SMS 및 카카오 알림톡 서비스를 제공하는 agent 회사는 해당 데이터를 감지하고 client에게 SMS 메세지 혹은 카카오톡을 보냅니다.


# Prerequisites

본 레포에서 사용하고 있는 Node.js 버전은 8.10.0 이며 패키지 관리 프로그램으로 `yarn`을 사용합니다.

# Environment
현재 코드가 동작되는 환경은 development와 production 두 가지가 존재합니다.

- development: nodemon으로 실행시킵니다.
- production: pm2로 실행시킵니다.

# How to run

```bash
git clone https://gitlab.com/univbook/ext-messenger-api.git
cd ext-messenger-api
yarn install
yarn start:dev
# 만약 운영 서버에서 돌리고 있다면, `yarn start:prod` 명령어를 사용해주세요.
```

# Feature

## Factory

- **lib/base64**

```js
function stringEncode(string) {
  const text = utf8.encode(string)
  const bytes = base64.encode(text)
  return bytes
}

function stringDecode(string) {
  const bytes = base64.decode(string)
  const text = utf8.decode(bytes)
  return text
}
```

POST로 받은 정보(request.body)는 Base64 인코딩 되어있으며, Base64 디코딩 한 뒤에 데이터베이스에 넣습니다. 그리고 그 과정에서 받은 결과값을 다시 Base64로 인코딩 한 뒤에 response를 보냅니다.

그리고 stringEncode는 utf8로 인코딩 후에 다시 base64 인코딩을 하며, stringDecode는 base64 인코딩 된 값을 받아서 디코딩을 하고 그 뒤에 utf8 디코딩을 합니다.

## Design Pattern

- 기본적으로 middleware 패턴을 차용하였으며, 특성에 맞게 다소 변형했습니다. 기존의 middleware 패턴에서는 각각의 middleware에서 응답값을 보내지만, 변형한 패턴에서는 middleware들의 응답값을 factory에서 모두 핸들링하여 응답값을 보냅니다.

![pattern](https://i.imgur.com/epcwxmZ.png) 

- factory는 resquest와 response에 대한 에러 처리 및 응답값(status code)을 설정하는 역할을 합니다.

- validator는 request로 받은 body값이 적절한 값인지에 대한 검증을 합니다.

- service는 validator 과정에서 에러가 발생하지 않는다면 비지니스 로직을 실행합니다.

# Unit Test

  **데이터베이스 연결 테스트**  

    ✓ 데이터베이스 이름이 파라미터로 넘어오지 않았을 때
    ✓ 데이터베이스 이름이 올바르지 않을 때
    ✓ 올바른 값을 넣었을 때

  **responseFactory 코드 테스트**  

    ✓ service 로직에서 에러가 발생했을 때
    ✓ service 로직이 정상적으로 작동했을 때

  **biztalk factory 코드 테스트**  

    ✓ MESSAGE에 base64 인코딩 문자열이 아닌 숫자 문자열이 들어갔을 때

  **biztalk service 코드 테스트**  

    ✓ Service Error 발생 시 error 잡아 내는가

  **biztalk validator 코드 테스트**  

    ✓ RECEIVER_NUMBER가 존재하지 않을 때
    ✓ SENDER_KEY에 문자열이 아닌 숫자가 왔을 때

  **sktelink factory 코드 테스트**  

    ✓ MESSAGE에 base64 인코딩 문자열이 아닌 숫자 문자열이 들어갔을 때

  **sktelink service 코드 테스트**  

    ✓ Service Error 발생 시 error 잡아 내는가

  **sktelink validator 코드 테스트**  

    ✓ RECEIVER가 존재하지 않을 때