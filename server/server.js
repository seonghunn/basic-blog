const express = require("express");
const db = require('./models');
const app = express();
const { Post } = require('./models');
const cors = require("cors");
const bodyParser =require("body-parser");
const { reset } = require("nodemon");
const indexRouter = require('./routes');
const postRouter = require('./routes/post');
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//bodyparser는 req.body 등의 입력을 정리하여 처리하게 해준다.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

db.sequelize.sync()
.then(()=>{
    console.log('DB CONNECTION SUCCESS')
})
.catch(console.error);//db connection

app.use('/',indexRouter);
app.use('/post',postRouter);

//예외처리
app.use((req,res)=>{
    res.status(404).send("Page not found");
})

var server = app.listen(8080, ()=> {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Server is working : PORT - ',port);
});

//db에 요청 날릴 떄 주석처리로 password 등을 가져오는 것을 주의 (!--는 주석처리 함)
//db에 쿼리를 날리기 전에 유효한 쿼리인지 검증하기
//user랑 게시글 join
//하나만 날릴 떄 : param, 여러 개 날릴 때 : 쿼리