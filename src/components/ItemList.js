import { Container } from "semantic-ui-react"
import Item from "./Item"
import classes from './ItemList.module.css'


export default function ItemList(props) {

  
  return (
    <Container>
      <div className={classes.ItemList}>
        
        {props.items.map(item => (<Item  key={item.id} item={item}></Item>))}
      </div>
    </Container>

  )
}
