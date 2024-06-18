### 공공데이터포털에서 제공하는 이미지가 없으면 이미지 없음 사진으로 대체 -> 이미지 URL을 검사하여 이미지 파일명이 없는지 검사 (// 이미지 검사)

### 첫 방문 시 엡 소개 컴포넌트 렌더링 (로컬스토리지 사용)

# 문제 해결
## 1. 지도를 클릭 했을때 변경된 state값(currentRegion)이 읽어지지 않는 문제
## 원인 : useEffect는 렌더링 시 최초 1번만 실행됨
## 해결 : 또 다른 useEffect 생성 (// 산 API 호출)
## 잘못된 해결 : [currentRegion]으로 currentRegion값이 변경 될 때 마다 실행 시키면 성능 저하를 유발함

## 2. active 이벤트는 있지만 선택된 지도의 색상 변경 기능은 제공하지 않음
## 해결 : 지도의 데이터를 객체화 시켜 선택된 값의 색상을 직접 변경

## 3. 첫 클릭에만 ListContainer 컴포넌트 slideIn @keyframes으로 opacity 효과 적용
## 해결 : styled-components의 props 활용

# 에러 해결
## 1. If you want to write it to the DOM, pass a string instead
## 원인 : styled-components props 사용 시 React DOM이 알지 못하는 키워드로 인식
## 해결 : props로 전달하는 속성 변수명 앞에 '$' 작성