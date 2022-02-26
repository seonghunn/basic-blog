import React,{useState,useEffect} from "react";
import axios from "axios";

//게시글 요소에 추가할 게 있다면 편리하게 하기 위해 submitType 배열 생성
const submitType=["title","writer"];

//submit 버튼이 눌렸을 때 동작
function handleSubmit(){
    const collectedData={
        title:document.querySelector(`.${submitType[0]}`).value,
        writer:document.querySelector(`.${submitType[1]}`).value,
        content:document.querySelector('.content').value
    }
    console.log(collectedData);
    //데이터를 post메소드로 전송
    axios.post('http://localhost:8080/post',collectedData)
    .then(alert("success!"))
    .then(clearText());
}

function clearText(){
    submitType.forEach((item)=>{
        document.querySelector(`.${item}`).value='';
    })
    document.querySelector(".content").value='';
}

//기본 input 폼
function PostInput(props){

    return(
        <div>
            <div>
        {submitType.map((data,index)=>(
        <div><input key={index} type="text" className={data} placeholder={data}></input></div>
        ))}
        </div>
        <textarea type="text" placeholder="content" className="content"></textarea><br></br>
        <button onClick={handleSubmit}>enter</button>
        </div>
    )
}

export default PostInput;