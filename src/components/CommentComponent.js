import { Comment } from "semantic-ui-react";


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
    console.log('props.comment', props.comment);
    let comment = props.comment;

    let updatedDate = dateFormattedDateString(new Date(props.comment.updatedAt));


  return (
    <Comment>
      <Comment.Content>
        
        <Comment.Metadata>
          <div>{updatedDate}</div>
        </Comment.Metadata>
        <Comment.Text>{comment.body}</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
  );
};

export default CommentComponent;
