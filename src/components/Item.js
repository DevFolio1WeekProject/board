import { Card, Icon, Image } from 'semantic-ui-react';
import classes from './Item.module.css';


export default function Item (props) {
  console.log(props.item);
  return <div className={classes.Item}>
    
    <Card href={`/posts/${props.item.id}`} style={{marginTop: '15px', marginBottom: '15px'}}>
    <Card.Content style={{height: '65px'}}header={props.item.title} />
    <Card.Content style={{height: '200px'}} description={props.item.body} />
    <Card.Content extra>
      <div></div>
      <Icon name='user' />4 Friends
    </Card.Content>
  </Card>
  </div>
}

