# [프로젝트 회고](https://velog.io/@leetekwoo/1%EC%B0%A8-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%ED%9A%8C%EA%B3%A0)
![Soongo-logo](/public/images/logo/Soongo-logo.png)

# 숭고 프로젝트 소개

- 요즘 핫한 숨은 고수를 찾아주는 플랫폼 **숨고** 클론 프로젝트 **숭고**
- 2주 동안 5명의 팀원들과 직접 DB 모델링을 하고 서버/ 클라이언트를 개발 하였습니다.
- Notion, Slack, Figma, DBdigram.io, Github를 사용하여 프로젝트 기획/관리를 했습니다.

### 개발 인원 및 기간

- 개발 기간: 2022-03-28 ~ 2022-04-08
- 개발 인원: 프론트 2명, 백엔드 1명, 풀스택 2명
- [백엔드 github 링크](https://github.com/wecode-bootcamp-korea/justcode-4-1st-omm-back)

### 프로젝트 선정 이유

- 지금까지 위코드에서 배웠던 작업물과 비슷한 것이 아닌 무리하지 않을 정도의 색다른 도전하고 싶었습니다.
- 이 사이트는 회원 타입이 일반 회원, 고수 회원으로 이뤄져 있어서 권한에 대한 부분을 명확하게 구현할 수 있을 것 같아서 선정 하였습니다.
- 일반 회원과 고수 회원을 연결 해주는 컨셉에 매력을 느꼈습니다.

### 데모 이미지

- 메인 화면

![main](/public/images/thump/main.gif)

- 로그인

![login](/public/images/thump/login.gif)

- 회원가입

![signup](/public/images/thump/signup.gif)

- 받은견적

![recive](/public/images/thump/recive.gif)

- 고수찾기

![scrollpage](/public/images/thump/masterlist.gif)

# 적용 기술 및 구현 기능

### 적용 기술

> Front : React, sass, css module,
>
> Back : Node, Express, MySQL, bcrypt, jsonwebtoken, prisma, cors
>
> Common : RESTful API, MVC, Github, Slack

### 구현 기능

**메인 페이지**

- 배너, 고수, 서비스 슬라이드 구현
- 슬라이드 끝에 도달하면 화살표가 사라지도록 구현
- 카테고리 아이콘 구현

**헤더와 푸터**

- 로그인, 로그아웃시 화면 전환 기능 구현
- 반응형 레이아웃 구현

**로그인**

- 로그인 기능 구현
- 정규식에 따른 입력창 스타일 변화
- 로그인시 토큰 받아오는 기능 구현
- 반응형 레이아웃 구현

**회원가입**

- 일반 회원가입 / 고수 회원가입 분리하여 기능 구현
- 정규식에 따른 입력창 스타일 변화와
- 고수 회원가입에서 토큰 여부에 따라 다른 api로 전송하도록 기능 구현

**고수찾기 리스트**

- 고수정보를 리스트 api로 받아와서 구현
- 카테고리, 지역 필터링 기능 사용
- 무한 스크롤 기능 사용

**고수 상세정보**

- 고수정보를 api를 받아와서 구현
- 페이지 내의 스크롤 nav 구현

**고수 프로필**

- 고수정보 api를 받아와서 구현
- 고수정보를 수정할 수 있는 기능 구현

**받은 견적**

- 받은견적 구현
- 요청마감 기능 구현(timestamp값을 이용하여 만료날짜 설정)
- 받은견적 리스트 클릭 시 나오는 내부 고수리스트 구현

**레슨 요청서**

- 요청서 기능 구현
- step별로 폼 컴포넌트 재사용하도록 기능 구현

## Reference

- 이 프로젝트는 [숨고](http://soomgo.com/) 사이트를 참조하여 학습목적으로 만들었습니다.
- 실무수준의 프로젝트이지만 학습용으로 만들었기 때문에 이 코드를 활용하여 이득을 취하거나 무단 배포할 경우 법적으로 문제될 수 있습니다.
- 이 프로젝트에서 사용하고 있는 사진 대부분은 위코드에서 구매한 것이므로 해당 프로젝트 외부인이 사용할 수 없습니다.
