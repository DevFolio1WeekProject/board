import { Card, Icon } from "semantic-ui-react";
import classes from "./Item.module.css";

let leftPad = (value) => {
  if (value >= 10) {
    return value;
  }

  return `0${value}`;
};

let dateFormattedDateString = (date) => {
  
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

export default function Item(props) {
  let formattedDate = dateFormattedDateString(new Date(props.item.createdAt));
  
  let title = props.item.title.split("&lt;").join("<");
  if(props.item.tags.length > 0){
    
  }
  let content = props.item.body
    .split("\\n")
    .join("<br />")
    .split("&lt;")
    .join("<");

  return (
    <div className={classes.Item}>
      <Card
        href={`/posts/${props.item.id}`}
        style={{ marginTop: "15px", marginBottom: "15px" }}
      >
        <Card.Content style={{ height: "65px" }}>
          <div
            className={classes.header}
            dangerouslySetInnerHTML={{ __html: title }}
          />
        </Card.Content>
        <Card.Content style={{ height: "200px" }}>
          <div
            className={classes.desc + " " + classes.ellipsis}
            style={{}}
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
          <div className={classes.date}>{formattedDate}</div>
        </Card.Content>

        <Card.Content extra className={classes.tagList}>
          <div style={{width: '100%', overflow: 'hidden'}}></div>
          {
            props.item.tags.map(data=>{
              return <div className={classes.tag}>{data}</div>
            })
          }
          
        </Card.Content>
      </Card>
    </div>
  );
}
