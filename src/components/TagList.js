import Tag from "./Tag";


let TagList = (props) => {

  console.log('props.tags', props.tags);
  return(
    <div>{props.tags.map(tag => {
      return <Tag tag={tag}/>
    })}</div>
  )
}

export default TagList;