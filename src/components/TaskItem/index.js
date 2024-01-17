import './index.css'

const TaskItem = props => {
  const {taskDetails} = props
  const {taskInput, tagInput} = taskDetails

  return (
    <li className="each-task-container">
      <p className="task-name"> {taskInput} </p>
      <p className="task-tag-button">{tagInput}</p>
    </li>
  )
}

export default TaskItem
