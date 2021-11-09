import { useState } from "react";
import { Comment, TextArea } from "semantic-ui-react";
import { formatDate } from "../utils.js";
import styles from "./CommentComponent.module.css";

let leftPad = (value) => {
  if (value >= 10) {
    return value;
  }

  return `0${value}`;
};

let dateFormattedDateString = (date) => {
  //타입스크립트 썻으면 좋았을거 같다.
  let result = "";
  if (!date) {
    return result;
  }

  let year = date.getFullYear();
  let month = leftPad(date.getMonth());
  let day = leftPad(date.getDate());
  let hours = leftPad(date.getHours());
  let minutes = date.getMinutes();

  result = year + "-" + month + "-" + day + " " + hours + ":" + minutes;

  return result;
};

let CommentComponent = (props) => {
  console.log("props.comment", props.comment);
  const { comment, onAction } = props;
  const [newBody, setNewBody] = useState(comment.body);
  const [editMode, setEditMode] = useState(false);

  let updatedDate = dateFormattedDateString(new Date(props.comment.updatedAt));

  const handleEdit = (e) => {
    setEditMode(!editMode);

    if (editMode) {
      onAction(e, { body: newBody });
    }
  };
  return (
    <Comment className={styles.comment}>
      <Comment.Avatar src="/user.png" />
      <Comment.Content>
        {editMode ? (
          <TextArea
            value={newBody}
            onChange={(e) => setNewBody(e.target.value)}
          />
        ) : (
          <>
            <Comment.Author as="a">Anonymous</Comment.Author>
            <Comment.Metadata>
              <div>{formatDate(comment.updatedAt, true)}</div>
            </Comment.Metadata>
            <Comment.Text>{comment.body}</Comment.Text>
          </>
        )}
        <Comment.Actions>
          <a name="edit" onClick={handleEdit}>
            수정
          </a>
          <a name="delete" onClick={onAction}>
            삭제
          </a>
          {editMode && (
            <a
              name="cancel"
              onClick={() => {
                setNewBody(comment.body);
                setEditMode(false);
              }}
            >
              취소
            </a>
          )}
        </Comment.Actions>
      </Comment.Content>
    </Comment>
  );
};

export default CommentComponent;
