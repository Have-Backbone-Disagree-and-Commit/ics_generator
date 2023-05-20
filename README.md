<div align="center">

![header](https://capsule-render.vercel.app/api?type=soft&color=random&text=ICS%20Generator)

</div>

<div>
  
  # 📌 Introduction
  - 취업 공고에 대한 데이터를 받아 서류 접수 시작일, 서류 접수 마감일을 기반으로 <strong>캘린더 파일(.ics)을 생성</strong>하는 마이크로 서버
  
  # 💻 Main Functions
  - ./ics_gen/routes/index.js
    - Express.js를 사용하여 "/ics_gen" 엔드포인트를 정의
  
    - 클라이언트가 POST 요청을 보내면, 해당 엔드포인트에서는 받은 데이터(서류 접수 시작일, 서류 접수 마감일 등)를 기반으로 캘린더 파일(.ics)을 생성
  
  - ./ics_gen/app.js
    - ./ics_gen/routes/index.js에 정의된 router를 이용하여 캘린터 파일을 생성 후, ./ics_gen/generatedFiles에 캘린더 파일 저장
  
  - ./ics_gen/generatedFiles
    - 퍼블릭 디렉토리
    - 해당 디렉토리에 저장된 캘린더 파일을 외부에서 URL을 통해 접근

</div>
