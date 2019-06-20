import React from 'react'
import styled from 'styled-components'

const Label = styled.label`
    color:red;
    font-size:20px;
    margin:1em;
    padding:05ee;
    text-decoration: ${props=> props.status?'line-through':'underline'};
    `

    
class ToDoItem extends React.Component{
    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        const { name, is_completed, _id} = this.props.Item;
        return(
            <Label status={is_completed} onClick={()=>{ this.props.handleClick(_id, is_completed)}} >{name}</Label>
        )
    }
}

export default ToDoItem