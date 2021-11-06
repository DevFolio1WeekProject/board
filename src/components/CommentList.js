import { Button, Comment, Form, Header } from "semantic-ui-react";
import CommentComponent from "./CommentComponent";

let CommentList = (props) => {
  console.log(props.comments);
  //https://react.semantic-ui.com/views/comment/#types-comment
  return (
    <Comment.Group>
      <Header as="h3" dividing>
        Comments
      </Header>

      {props.comments.map(comment => {
          return <CommentComponent comment={comment}/>
      })}



      <Form reply>
        <Form.TextArea />
        <Button content="Add Reply" labelPosition="left" icon="edit" primary />
      </Form>
    </Comment.Group>
  );
};

export default CommentList;
