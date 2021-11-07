import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import { Container, Modal, Icon, Button } from "semantic-ui-react";
import Header from "../components/Header";
import TagList from "../components/TagList";
import CommentList from "../components/CommentList";

const PostDetailPage = props => {
  const history = useHistory();
  let location = useLocation();
  let [post, setPost] = useState(null);
  let [comments, setComments] = useState([]);
  
  let postId = location.pathname.split('/')[2];
  useEffect(()=>{
    axios.get('https://limitless-sierra-67996.herokuapp.com/v1/posts/' + postId).then(res => {
      
      setPost(res.data);
    })

    axios.get('https://limitless-sierra-67996.herokuapp.com/v1/comments?postId=' + postId).then(res => {
      setComments(res.data.results);
    })
  }, [])

  if(!post){
    return null;
  }

  let title = post.title.split('\\n').join('<br />').split('&lt;').join('<');
  let content = post.body.split('\\n').join('<br />').split('&lt;').join('<');

  if(comments.length > 0 ){
    
  }

  let reloadCommentList = () => {
    axios.get('https://limitless-sierra-67996.herokuapp.com/v1/comments?postId=' + postId).then(res => {
      setComments(res.data.results);
    }) 
  }

  return <div>
    <Header/>
    <Container>
    <h1 dangerouslySetInnerHTML={{__html:title}}></h1>
    
    <TagList tags={post.tags}/>
    
    <div dangerouslySetInnerHTML={{__html:content}}>
    </div>
    <CommentList comments={comments} postId={postId} reloadCommentList={reloadCommentList}/>
    </Container>
  </div>
    
  
};

export default PostDetailPage;
