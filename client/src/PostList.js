import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

function PostList(){
    const [viewList, setList]=useState([]);
    //api 서버로부터 데이터를 받아온 뒤, 그 데이터를 viewList에 넣는다
    useEffect(()=>{
        axios.get("http://localhost:8080/post").then((res)=>{
            console.log(res);
            setList(res.data);
        })
    },[]);

    //viewList라는 배열에 데이터들이 전부 들어갔으므로, map을 통해 안에 있는 모든 데이터에 대하여 Post를 생성한다
    return (<span>
    <ul>{viewList.map((data,index)=>(
        <li>
            <Link to={`/post/${data.id}`}>
            <h1>{data.title}</h1>{data.createdAt} hit: {data.hit}
            </Link>
        </li>
    ))}</ul>
    </span>)
}
export default PostList;