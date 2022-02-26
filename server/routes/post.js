const express = require('express');
const router=express.Router();
const {Post}=require("../models/index");//require models/post 를 하는게 아니고, index안에 정의된 post를 사용해야 시퀄라이즈 메소드 사용 가능

//get, 이런거는 req.param으로 쿼리스트링으로
router.get("/",async(req,res)=>{
    try{
    const posts=await Post.findAll({});
    console.log(posts);
    res.status(200).send(posts);
    }
    catch(err){
        console.log(err);
        res.status(500);
    }
});

//개별 게시글 불러오기
router.get("/:id",async(req,res,next)=>{
    try{
        const post = await Post.findAll({
            where:{
                id:req.params.id
            }
        });
        if(post.length===0){
            next(new Error("index out of range"));
        }
        res.status(200).send(post);
    }
    catch(err){
        console.log(err);
        res.status(500);
    }
});

//작성자 기준 게시글 불러오기
/*router.get("/:writer",async(req,res,next)=>{
    try{
        const post =await Post.findAll({
            where:{
                writer:req.params.writer
            }
        });
        if(post.length===0){
            next(new Error("writer not found"));
        }
        res.status(200).send(post);
    }
    catch(err){
        console.log(err);
        res.status(500);
    }
})*/

//insert
router.post("/",async(req,res)=>{
    try{
        const data=await Post.create({
            writer:req.body.writer,
            title:req.body.title,
            content:req.body.content
        })
        console.log(data);
        res.status(201);
    }
    catch(err){
        console.log(err);
        res.status(500);//500번대, err의 종류에 따라 상세하게 나누기
    }
    
});

//update
router.put("/",async(req,res)=>{
    try{
        const updatePost=await Post.update({content: req.body.updated_content},{where:{id:req.body.id}})
        console.log(updatePost);
        res.status(202);
    }
    catch(e){
        console.log(e);
        res.status(500);
    }
})

router.put("/hit",async(req,res)=>{
    try{
        const updateHit=await Post.update({hit:req.body.hit},{where:{id:req.body.id}});
        res.status(201);
    }
    catch(e){
        console.log(e)
        res.status(404);
    }
})

//delete
router.delete("/",async(req,res)=>{
    try{
        const deletePost=await Post.destroy({where:{id:req.body.id}});
        console.log(deletepost);
        res.status(200)
    }
    catch(e){
        console.log(e);
        res.status(404);
    }
})

//예외처리
router.use((err,req,res,next)=>{
    res.status(404).json({ message: err.message })
})


module.exports=router;