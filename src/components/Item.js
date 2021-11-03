import { Card, Icon, Image } from 'semantic-ui-react';
import classes from './Item.module.css';


export default function Item (props) {
  console.log(props.item);
  return <div className={classes.Item}>
    
    <Card>
    <Card.Content header={props.item.title} />
    <Card.Content description={props.item.body} />
    <Card.Content extra>
      <Icon name='user' />4 Friends
    </Card.Content>
  </Card>
  </div>
}

