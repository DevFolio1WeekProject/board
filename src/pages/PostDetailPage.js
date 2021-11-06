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
    axios.get('https://limitless-sierra-67996.herokuapp.com/v1/posts/' + location.pathname.split('/')[2]).then(res => {
      console.log(res);
      setPost(res.data);
    })

    axios.get('https://limitless-sierra-67996.herokuapp.com/v1/comments?postId=' + location.pathname.split('/')[2]).then(res => {
      console.log(res);
      setComments(res.data.results);
    })
  }, [])

  if(!post){
    return null;
  }

  console.log('post.body', post.body);
  let title = post.title.split('\\n').join('<br />').split('&lt;').join('<');
  let content = post.body.split('\\n').join('<br />').split('&lt;').join('<');
  
  console.log(comments);
  if(comments.length > 0 ){
//    alert('asdasds');

  }
  return <div>
    <Header/>
    <Container>
    <h1 dangerouslySetInnerHTML={{__html:title}}></h1>
    <hr/>
    <div>
      <TagList tags={post.tags}/>
    </div>
    <div dangerouslySetInnerHTML={{__html:content}}>
    </div>
    <CommentList comments={comments}/>
    </Container>
  </div>
    
  
};

export default PostDetailPage;
