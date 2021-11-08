import classes from "./CommentList.module.css";
import axios from "axios";
import { useState } from "react";
import { Button, Comment, Form, Header } from "semantic-ui-react";
import CommentComponent from "./CommentComponent";
import InfiniteScroll from "react-infinite-scroll-component";

let CommentList = (props) => {
  console.log(props.comments);
  const { comments, totalCommentCount } = props;
  let [newReply, setNewReply] = useState("");
  console.log('CommentList', props.hasMore);
  
  let handleAddReplyClick = () => {
    axios
      .post("https://limitless-sierra-67996.herokuapp.com/v1/Comments", {
        postId: props.postId,
        body: newReply,
      })
      .then(() => {
        props.addReply({createdAt: new Date(), updatedAt: new Date(), body: newReply});
        setNewReply("");
      });
  };

  let handleChangeReply = (e) => {
    setNewReply(e.target.value);
  };

  return (
    <Comment.Group className={classes.commentList}>
      <Header as="h3" dividing>
        {(totalCommentCount && totalCommentCount > 0 ? totalCommentCount : 0) + "개의 댓글"}
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
      <InfiniteScroll
        dataLength={comments.length}
        next={props.getCommentList}
        hasMore={props.hasMore}
        loader={<div>aa</div>}
      >
      <div className={classes.commentArea}>
        {comments.map((comment) => {
          return <CommentComponent key={comment.id} comment={comment} />;
        })}
      </div>
      </InfiniteScroll>
    </Comment.Group>
  );
};

export default CommentList;
