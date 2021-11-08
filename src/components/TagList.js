import classes from "./TagList.module.css";
import Tag from "./Tag";

let TagList = (props) => {
  console.log("props.tags", props.tags);
  return (
    <div className={classes.tagList + " " + props.className}>
      {props.tags.map((tag) => {
        return <Tag tag={tag} />;
      })}
    </div>
  );
};

export default TagList;
