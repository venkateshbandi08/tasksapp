import './index.css'

const TagItem = props => {
  const {tagName, onChangeActiveTag, isActive, tagId} = props
  const onClickTag = () => {
    onChangeActiveTag(tagId)
  }
  const tagStyle = isActive ? 'active-tag-style' : 'each-tag-style'
  return (
    <li className="each-tag-container">
      <button type="button" className={tagStyle} onClick={onClickTag}>
        {tagName}
      </button>
    </li>
  )
}

export default TagItem
