import {v4 as uuidv4} from 'uuid'
import {Component} from 'react'
import TagItem from '../TagItem'
import TaskItem from '../TaskItem'
import './index.css'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tagsList: props.tagsList,
      tasksList: [],
      taskInput: '',
      tagInput: '',
      isTagActive: false,
      activeTag: '',
    }
  }

  onHandleTaskInput = event => {
    this.setState({
      taskInput: event.target.value,
    })
  }

  onHandleTagInput = event => {
    this.setState({
      tagInput: event.target.value,
    })
  }

  onAddTask = event => {
    event.preventDefault()
    const {taskInput, tagInput, tasksList} = this.state
    const newItem = {
      id: uuidv4(),
      taskInput,
      tagInput,
    }
    const newTasksList = [...tasksList, newItem]
    this.setState({
      tasksList: newTasksList,
    })
    this.setState({
      taskInput: '',
      tagInput: '',
    })
  }

  onChangeActiveTag = tagName => {
    const {isTagActive} = this.state
    if (!isTagActive) {
      this.setState(prevState => ({
        isTagActive: !prevState.isTagActive,
        activeTag: tagName,
      }))
    } else {
      this.setState(prevState => ({
        isTagActive: !prevState.isTagActive,
        activeTag: '',
      }))
    }
  }

  getFilteredTasks = activeTag => {
    const {tasksList} = this.state
    const filteredTasks = tasksList.filter(
      eachItem => eachItem.tagInput === activeTag,
    )
    return filteredTasks
  }

  render() {
    const {
      tagsList,
      tasksList,
      taskInput,
      tagInput,
      isTagActive,
      activeTag,
    } = this.state
    let filteredTasks
    if (isTagActive) {
      filteredTasks = this.getFilteredTasks(activeTag)
    } else {
      filteredTasks = tasksList
    }
    return (
      <div className="bg-container">
        <form className="left-side-container" onSubmit={this.onAddTask}>
          <h1 className="main-heading"> Create a task!</h1>
          <div className="input-container">
            <label htmlFor="task-input" className="label-name">
              Task
            </label>
            <input
              id="task-input"
              className="input-box"
              placeholder="Enter the task here"
              onChange={this.onHandleTaskInput}
              value={taskInput}
            />
          </div>
          <div className="input-container">
            <label htmlFor="tag-input" className="label-name">
              Tags
            </label>
            <select
              className="input-box"
              id="tag-input"
              onChange={this.onHandleTagInput}
              value={tagInput}
            >
              <option selected value="HEALTH">
                Health
              </option>
              <option value="EDUCATION">Education</option>
              <option value="ENTERTAINMENT">Entertainment</option>
              <option value="SPORTS">Sports</option>
              <option value="TRAVEL">Travel</option>
              <option value="OTHERS">Others</option>
            </select>
          </div>
          <div className="button-container">
            <button type="submit" className="add-task-button">
              Add Task
            </button>
          </div>
        </form>
        <div className="right-side-container">
          <div className="tags-container">
            <h1 className="right-heading"> Tags </h1>
            <ul className="tags-list">
              {tagsList.map(eachItem => (
                <TagItem
                  tagName={eachItem.displayText}
                  tagId={eachItem.optionId}
                  key={eachItem.optionId}
                  onChangeActiveTag={this.onChangeActiveTag}
                  isActive={activeTag === eachItem.optionId}
                />
              ))}
            </ul>
          </div>
          <div className="tasks-container">
            <h1 className="right-heading"> Tasks </h1>
            {filteredTasks.length === 0 ? (
              <div className="no-tasks-container">
                <p className="no-tasks"> No Tasks Added Yet </p>
              </div>
            ) : (
              <ul className="tasks-list">
                {filteredTasks.map(eachItem => (
                  <TaskItem taskDetails={eachItem} key={eachItem.id} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Home
