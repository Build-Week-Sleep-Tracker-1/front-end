import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Nav = styled.nav`
    background-color: #42bcf5;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: end;
    width: 100%;
    padding: 0;
    height: 5vh;
`

const StyledLink = styled(Link)`
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
    width: 5%;
    height: 90%;
    text-decoration: none;
    background-color: white;
    &:hover {
        background-color: #42bcf5;
        color: white;
    }
`


function Navigation(props) {
    return (
        <>
            <Nav>
                <StyledLink to="login">Log out</StyledLink>
            </Nav>
        </>
    )
}

export default connect((state) => {
    return {
        name: state.name
    }
})(Navigation);