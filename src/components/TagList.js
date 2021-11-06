import Tag from "./Tag";


let TagList = (props) => {

  return(
    <div>{props.tags.map(tag => {
      return <Tag tag={tag}/>
    })}</div>
  )
}

export default TagList;