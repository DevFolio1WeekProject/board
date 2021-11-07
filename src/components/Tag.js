import classes from "./Tag.module.css";


let Tag = (props) => {


  return<span className={classes.tag}>{props.tag}</span>
}

export default Tag;