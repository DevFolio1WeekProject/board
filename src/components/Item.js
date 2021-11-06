import { Card, Icon } from "semantic-ui-react";
import classes from "./Item.module.css";


let leftPad = (value) => {
  if(value >= 10){
    return value;
  }
  
  return `0${value}`;
}

let dateFormattedDateString = (date) => { //타입스크립트 썻으면 좋았을거 같다.
  let result = '';
  if(!date){
    return result;
  }
  
  let year = date.getFullYear();
  let month = leftPad(date.getMonth());
  let day = leftPad(date.getDate());
  let hours = leftPad(date.getHours());
  let minutes =  date.getMinutes();
  
  result = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes;

  
  
  return result;
}

export default function Item(props) {

  let formattedDate = dateFormattedDateString(new Date(props.item.createdAt));

  return (
    <div className={classes.Item}>
      <Card
        href={`/posts/${props.item.id}`}
        style={{ marginTop: "15px", marginBottom: "15px" }}
      >
        <Card.Content style={{ height: "65px" }} header={props.item.title} />
        <Card.Content style={{ height: "200px" }}>
          <div className={classes.desc + ' ' + classes.ellipsis}>{props.item.body}</div>
          <div className={classes.date}>{formattedDate}</div>
        </Card.Content>
        
        <Card.Content extra>
          <div className={classes.tag}>aa</div>
          
        </Card.Content>
      </Card>
    </div>
  );
}
