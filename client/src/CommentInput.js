import axios from "axios";


//submit 버튼이 눌렸을 때 동작
function handleSubmit(postid){
    const collectedData={
        comment:document.querySelector(".commentBox").value,
        commenter:document.querySelector(".commenterBox").value
    }
    console.log(collectedData);
    //데이터를 post메소드로 전송
    axios.post(`http://localhost:8080/post/${postid}`,collectedData)
    .then(alert("success!"))
    .then(clearText());
}

function clearText(){
    document.querySelector(".commenterBox").value='';
    document.querySelector(".commentBox").value='';
}

//기본 input 폼
function CommentInput(props){

    return(
        //props로 postid를 받아와 handleSubmit에 넘겨주어 적절한 위치로 post 요청을 보냄
        <div>
            <input type="text" placeholder="comment" className="commentBox"></input>
            <input type="text" placeholder="writer" className="commenterBox"></input>
            <button onClick={()=>handleSubmit(props.postid)}>enter</button>
        </div>
    )
}

export default CommentInput;