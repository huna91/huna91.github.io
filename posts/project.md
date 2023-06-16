---
image: "post/1.jfif"
title: "페이지 개발 내용"
date: "2023-06-30"
---

# 개발환경

- ### Development Platform

  - Nextjs

- ### Design

  - css
  - styled-components

- ### Deployment

  - Vercel

# Contact 기능

- ### Voice

  - Client측 마이크 사용 소리 녹음
  - 녹음데이터 파일화 및 서버사이드 email 첨부 전달
  - 기능 동작 과정
    1. Client 마이크 권한 획득
    2. 정보 입력 후 녹음 버튼 활성화
    3. 마이크로 들어오는 값 음성데이터 저장 후 파일화
    4. 서버측으로 데이터 이동
    5. 파일 첨부 후 메일 전송

- ### Email

  - nodemailer api 사용
  - email 자동 입력
  - email 정규식 판별
  - 서버사이드 email 전송

- ### Phone

  - 네이버클라우드 플랫폼 문자전송 api 사용
  -

- ### Kakao

  - 카카오톡 메시지 api 사용

- ### Blockchain
  - web3 통신
  - 이더리움 Goerli 테스트 네트워크 컨트랙트 배포
  - 컨트랙트에 내용 기록

# Contents 기능

- 페이지 구동자만 포스트 작성 가능
- 마크다운 언어로 작성 후 페이지 출력 및 관리 가능
