<p align="center">

</p>

## 🔖 소개
> **MY Portfolio**
> <br>
> 포트폴리오를 정해진 템플릿에 맞게 쉽게 만드는 서비스 입니다
> 
<p align="center">

</p>

<br>

## 구현 기능
### 서비스 계층 성능 모니터링과 에러 로깅 구현
모든 서비스 구현체 메서드 실행 전후를 감지하여, 처리 시간이 1초를 초과하는 경우에는 SLOW QUERY로 기록하고  
예외 발생 시에는 해당 정보를 별도 로깅하도록 구성하였습니다. 구현시 ThreadLocal을 사용하지 않으면 멀티스레드 환경에서  
실행 시간이 꼬이는 문제가 있어 ThreadLocal<Long>으로 시작 시간을 관리했습니다. 예외 발생 시에도 로그를  
저장해야 했기 때문에, @AfterThrowing 어드바이스를 별도로 정의하여 예외 정보를 안정적으로 수집할 수 있도록 구현했습니다.
[관련 내용 개발 기록](https://velog.io/@bell-ho/AOP%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-%EB%A1%9C%EA%B7%B8-%EC%B6%94%EC%A0%81-%EA%B8%B0%EB%8A%A5)

### 포트폴리오 생성
### 포트폴리오 공유

<br>

## ERD
![my_portfolio](https://github.com/user-attachments/assets/8d77b165-048f-48bb-994d-559b829aa3d8)

<br>

## 📚 기술스택

| 분야           | 사용 기술                                      | 비고 |
| -------------- |--------------------------------------------| ---- |
| FrontEnd       | React, Next.js, SSR, Next-Auth, React-Query, javascript, MUI |
| BackEnd        | SpringBoot, JPA                                    |
| Database       | MySql                                      |
| Cloud Services | AWS EC2, AWS S3, AWS RDS, AWS ROUTE53                            |

<br>

## 작업 내역
#### 2023
* 04/28
  * 커스텀 에러 핸들러 개발
* 04/03
  * 프로젝트 제작 기간 선택 기능 date-picker 적용
* 03/31
  * 포트폴리오의 PROJECT에 사용한 스킬 등록 기능 개발
  * 프로젝트 관련 이미지 등록, 수정, 삭제 개발
  * 프로젝트 주요 기능 등록 기능 개발
* 03/28
  * 사용자 스택 추가 기능 개발
* 03/27
  * 포트폴리오 대표 이미지 업로드 기능 개발
* 03/24
  * 포트폴리오 목록, 생성 화면 수정
  * 미들웨어 추가
* 03/23
  * 로그인, 회원생성 로직 수정
* 03/22
  * 포트폴리오 제작 화면 개발
  * CONTACT 섹션 개발
  * PROJECT 섹션 개발
  * SKILL 섹션 개발
* 03/21
  * 로그인, 회원가입 기능 개발
  * Entity 설계
  * 프로젝트 기본 세팅
