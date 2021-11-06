import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Container } from "semantic-ui-react";
import Header from "../components/Header";
import TagList from "../components/TagList";
import CommentList from "../components/CommentList";

const PostDetailPage = () => {
  let location = useLocation();
  let [post, setPost] = useState(null)
  let [comments, setComments] = useState([]);
  console.log(location.pathname.split('/')[2]);
  useEffect(()=>{
    console.log(location.pathname.split('/')[2]);
    
    axios.get('https://limitless-sierra-67996.herokuapp.com/v1/posts/' + location.pathname.split('/')[2]).then(res => {
      console.log(res);
      setPost(res.data);

    })

    axios.get('https://limitless-sierra-67996.herokuapp.com/v1/comments/postId=' + location.pathname.split('/')[2]).then(res => {
      console.log(res);
      setComments(res.data);

    })
  }, [])
  if(!post){
    return null;
  }

  return <div>
    <Header/>
    <Container>
    <h2>{post.title}</h2>
    <div>
      <TagList tags={post.tags}/>
    </div>
    <div dangerouslySetInnerHTML={{__html: post.body}}>
      
    </div>
    <CommentList comments={comments}/>
    </Container>
  </div>
    
  
};

export default PostDetailPage;
