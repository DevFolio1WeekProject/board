import classes from "./CommentList.module.css";
import axios from "axios";
import { useState } from "react";
import { Button, Comment, Form, Header } from "semantic-ui-react";
import CommentComponent from "./CommentComponent";

let CommentList = (props) => {
  console.log(props.comments);
  const { comments } = props;
  let [newReply, setNewReply] = useState("");
  //https://react.semantic-ui.com/views/comment/#types-comment
  let handleAddReplyClick = () => {
    axios
      .post("https://limitless-sierra-67996.herokuapp.com/v1/Comments", {
        postId: props.postId,
        body: newReply,
      })
      .then(() => {
        props.reloadCommentList();
        setNewReply("");
      });
  };

  let handleChangeReply = (e) => {
    setNewReply(e.target.value);
  };

  return (
    <Comment.Group className={classes.commentList}>
      <Header as="h3" dividing>
        {(comments && comments.length > 0 ? comments.length : 0) + "개의 댓글"}
      </Header>

      <Form reply>
        <Form.TextArea
          rows={2}
          placeholder="댓글을 작성하세요"
          onChange={handleChangeReply}
          value={newReply}
          className={classes.commentInput}
        />
        <Button
          content="댓글 작성"
          labelPosition="left"
          icon="edit"
          primary
          onClick={handleAddReplyClick}
          floated="right"
        />
      </Form>

      <div className={classes.commentArea}>
        {comments.map((comment) => {
          return <CommentComponent comment={comment} />;
        })}
      </div>
    </Comment.Group>
  );
};

export default CommentList;
