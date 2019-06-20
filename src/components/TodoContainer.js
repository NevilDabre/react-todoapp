import React from 'react'
import ToDoItem from './ToDoItem'
import axios from 'axios'
import styled from 'styled-components'

const Label = styled.label`
    display: ${props => props.message ? 'none' : ''};
    color: red,
    font-size: 18px;
`

class ToDoContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ToDoItemsList: null,
            itemName: '',
            message: ''
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit() {
        const { itemName, ToDoItemsList } = this.state

        if (itemName === null || itemName === '')
            return null

        let count = ToDoItemsList.find(item => item.name === itemName)
        if (count) {
            this.setState({ message: 'Item Already exists' })
        } else {
            let entity = {
                name: itemName
            }
            let addEntity = await axios.post('http://localhost:5000/todo', entity)
            this.setState({
                itemName: ''
            })

            if (addEntity) {
                axios.get('http://localhost:5000/todo')
                    .then(result => {
                        this.setState({
                            ToDoItemsList: result.data ? result.data : []
                        })
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        }
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    handleClick(id, is_completed) {
        let item = {
            is_completed: !is_completed
        }

        axios.patch(`http://localhost:5000/todo/${id}`, { item })
            .then(result => {
                let itemsList = this.state.ToDoItemsList.map(item => {
                    if (item._id === id) item.is_completed = !item.is_completed
                    return item
                })

                this.setState({
                    ToDoItemsList: itemsList
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    componentDidMount() {
        axios.get('http://localhost:5000/todo')
            .then(result => {
                console.log(result);
                this.setState({
                    ToDoItemsList: result.data ? result.data : []
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {

        const { ToDoItemsList } = this.state

        if (!ToDoItemsList)
            return <h1>There are no Items</h1>

        const toDoItemsList = ToDoItemsList.map((item, i) => {
            return <ToDoItem handleClick={this.handleClick} Item={item} key={i} />
        })

        return (
            <div>
                {this.state.itemName}
                <input name="itemName" type="text" value={this.state.itemName} onChange={this.handleChange} />
                <Label>{this.state.message}</Label>
                <button onClick={this.handleSubmit}>Add</button>
                {toDoItemsList}
            </div>
        )
    }
}

export default ToDoContainer