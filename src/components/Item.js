import classes from './Item.module.css';


export default function Item (props) {
  console.log(props.item);
  return <div className={classes.Item}>
    <h3>title: {props.item.title}</h3>
    <div>body: {props.item.body}</div>
    
  </div>
}

