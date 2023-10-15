const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended:true}));

var assignments = [
    {id:'0', title : '[과제] 미니프로젝트', name : '웹프로그래밍,', info:'정진우 교수, 2023-06-04',detail:'화이팅', myAssign:'null'},
    {id:'1', title : '[과제] CSS 학과 홈페이지 리뉴얼 프로젝트',  name : '웹프로그래밍,', info:'정진우 교수, 2023-05-21', detail : '파일을 압축하여 제출해주세요.', myAssign:'null'},
    {id:'2', title : '[과제] 로또 번호 추천 애플리케이션 만들기',  name : '모바일프로그래밍,', info:'정진우 교수, 2023-05-13',detail : '비디오도 첨부해쥬세요.', myAssign:'null'},
    {id:'3', title : '[과제] 액티비티 레이아웃 구현',  name : '모바일프로그래밍,', info:'정진우 교수, 2023-04-13',detail : '열심히 하세요.', myAssign:'null'},
    {id:'4', title : '[과제] 탭 레이아웃 구현',  name : '모바일프로그래밍,', info:'정진우 교수, 2023-03-28', detail : '이제 시작입니다.', myAssign:'null'},
    {id:'5', title : '[과제] Assignment1 : DecisionTree', name : '데이터마이닝,', info:'심재웅 교수, 2023-04-12', detail : '지각 제출 없습니다.', myAssign:'null'},
    {id:'6', title : '[과제] Assignment2 : RandomForest',  name : '데이터마이닝,', info:'심재웅 교수, 2023-03-13', detail : '시각화 포함해주세요.', myAssign:'null'},
    {id:'7', title : '[과제] Math Review 2',  name : '추계과정,', info:'심민규 교수, 2023-04-30', detail : 'Office hour 공지사항 참고하세요', myAssign:'null'},
    {id:'8', title : '[과제] Math Review 1',  name : '추계과정,', info:'심민규 교수, 2023-04-02', detail : '어렵죠', myAssign:'null'},
    {id:'9', title : '[과제] Case Study', name : '추계과정,', info:'심민규 교수, 2023-05-15', detail : '과제 10% 들어갑니다.', myAssign:'null'}
];

app.get('/', (req, res) => res.sendFile(__dirname+"/index.html"));

app.get('/ajax/assignments', (req, res) => {
  res.json(assignments)
});

//사용자가 선택한 필터 조건과 검색어를 서버로 전송하여 서버에서 해당 조건에 맞는 데이터를 필터링하여 응답
//요청의 쿼리 파라미터인 filterType과 searchInput을 가져옴
//filteredAssignments 변수는 assignments 배열을 필터링하여 조건에 맞는 과제만을 담은 배열
app.get('/search', (req, res) => {
  const filterType = req.query.filterType;
  const searchInput = req.query.searchInput;

  // 검색 필터링 로직 구현
  const filteredAssignments = assignments.filter(assignment => {
    if (filterType === 'assignmentName') {
      return assignment.title.includes(searchInput);
    }
    if (filterType === 'lectureName') {
      return assignment.name.includes(searchInput);
    }
  });
  // 검색 결과 전송
  res.json(filteredAssignments);
});

app.post('/submit', (req, res) => {
  // 사용자로부터 전송된 과제 데이터를 처리하는 로직을 구현
  // 값 받아오기
  var submittedAssignment = req.body.myAssignment;
  var liId = req.body.liId;
  console.log("Server received the request.");
  console.log("Submitted Assignment:", submittedAssignment);
  console.log("liId:", liId);

  var targetAssignment = assignments.find(a => a.id === liId);
  if (targetAssignment) {
    targetAssignment.myAssign = submittedAssignment;
    
  }
  // myAssign 속성이 존재하는 객체들만으로 이루어진 새로운 배열 생성
  assignmentsWithMyAssign = assignments.filter(a => a.myAssign !== 'null');

  console.log(targetAssignment);
  console.log(assignmentsWithMyAssign);

  res.sendStatus(200)
});

app.get('/complete', function(req, res) {
  res.json(assignmentsWithMyAssign)
});

// router parameter 처리를 위한 GET API 생성
app.get('/ajax/:id', (req, res) => res.json(assignments[req.params.id]));

app.use((req,res,next)=>{
    res.status(404).send('<h1>Sorry, Page Not Found</h1>');
    console.log('404 Error sent')
  });

// express app의 연결 수신 (3000번 포트)
app.listen(8080, () => {
    console.log('Server running at port:8080'); 
  });