import axios from "axios";
import React, { useEffect,useState } from "react";
import {useParams} from "react-router-dom";

//textarea의 텍스트 삭제
function clearText(){
    document.querySelector(".update-box").value="";
}

//제목을 누르기 전까지는 보이지 않게
function handleDisplay(e,postdata){
        //document.getElementsByClassName("content-area").style.display="none"
        addHitnum(postdata);
        console.log(e.target.nextSibling);//context-area
        console.log(e.target.nextSibling.nextSibling);//update-area
        
}

function addHitnum({id, hit}){
    console.log(hit);
    hit=hit+1;//여러번 누르면 여러개가 올라가게 수정해야 함
    axios.put('http://localhost:8080/post/hit',{
        id:id,
        hit:hit
    })
}

//update
//onclick에서 이벤트 객체를 인자로 받음
function handleUpdate(e){
    console.log(e.target.parentElement.firstChild.value);//update 박스에 적혀져 있는 내용
    console.log(e.target.parentElement.parentElement.id);//버튼을 누른 게시글의 id
    axios.put('http://localhost:8080/post',{
        id:e.target.parentElement.parentElement.id,
        updated_content:e.target.parentElement.firstChild.value
    }).then(alert(`update post number ${e.target.parentElement.parentElement.id}`))
    .then(clearText())//텍스트 삭제
    
}

//delete
//onclick에서 이벤트 객체를 인자로 받음, delete 메소드에서 서버에서 데이터를 받으려면 data:{}를 만들어야 함
function handleDelete(e){
    console.log(e.target.parentElement.parentElement.id);
    axios.delete('http://localhost:8080/post',{
        data:{
            id:e.target.parentElement.parentElement.id
        }
    }).then(alert(`delete post number ${e.target.parentElement.parentElement.id}`))
}

//기본적인 게시글 구조
function Post(){
    //useParams는 url params를 가져오게 해줌
    const {id}=useParams();
    console.log(id);

    const [postdata, setpostdata]=useState([]);
    //api 서버로부터 데이터를 받아온 뒤, 그 데이터를 viewList에 넣는다
    useEffect(()=>{
        axios.get(`http://localhost:8080/post/${id}`).then((res)=>{
            setpostdata(res.data);
    })},[]);

    console.log(postdata[0]);
    
    return (
        <div>
            {postdata.map((data,idx)=>(
                        <div key={data.id} id={data.id}>
                        <h2 onClick={e=>handleDisplay(e,data)}>title:{data.title}</h2>
                        <span className="content-area" >
                        <h3>writer:{data.writer} created:{data.createdAt} hit:{data.hit}</h3>
                        <p>{data.content}</p>
                        </span>
                        <span className="update-area">
                            <textarea type="text" className="update-box" id={data.id}></textarea>
                            <button className="update-btn" onClick={e=>handleUpdate(e)}>update</button>
                            <button className="delete-btn" onClick={e=>handleDelete(e)} >delete</button>
                        </span>
                </div>
            ))
            }
        </div>
        )
};

export default Post;