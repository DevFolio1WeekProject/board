import Item from "./Item"



export default function ItemList(props) {

  
  return (
    <div>
      aa
      {props.items.map(item => (<Item  key={item.id} item={item}></Item>))}
    </div>

  )
}
