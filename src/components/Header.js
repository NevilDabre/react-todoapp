import React from 'react'
import styled from 'styled-components'

const Section = styled.div`
    display:grid;
    margin-bottom: 50px;
    border: 2px solid black;
    background-color:grey;
`

const Title = styled.h1`
    text-align: center;
    font-size:1.5em;
    color:aliceblue
`

class Header extends React.Component {
    render() {
        return (
            <Section>
                <Title>Yet Another To-Do List!</Title>
            </Section>
        )
    }
}

export default Header