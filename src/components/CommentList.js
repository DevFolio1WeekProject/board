import classes from "./CommentList.module.css";
import axios from "axios";
import {useState} from 'react';
import { Button, Comment, Form, Header } from "semantic-ui-react";
import CommentComponent from "./CommentComponent";

let CommentList = (props) => {
  console.log(props.comments);
  let [newReply, setNewReply] = useState('');
  //https://react.semantic-ui.com/views/comment/#types-comment
  let handleAddReplyClick = () => {
    axios.post('https://limitless-sierra-67996.herokuapp.com/v1/Comments',{
      postId: props.postId,
      body: newReply
    }).then(()=>{
      props.reloadCommentList()
      setNewReply('');
    })
  }

  let handleChangeReply = (e) => {
    setNewReply(e.target.value);
  }

  return (
    <Comment.Group className={classes.commentList}>
      <Header as="h3" dividing>
        Comments
      </Header>

      <Form reply>
        <Form.TextArea onChange={handleChangeReply} value={newReply}/>
        <Button content="댓글작성" labelPosition="left" icon="edit" primary onClick={handleAddReplyClick}/>
      </Form>

      {props.comments.map(comment => {
          return <CommentComponent comment={comment}/>
      })}
      
    </Comment.Group>
  );
};

export default CommentList;
