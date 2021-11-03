


export default function Item (props) {
  console.log(props.item);
  return <div>
    <div>title: {props.item.title}</div>
    <div>body: {props.item.body}</div>
    
  </div>
}

