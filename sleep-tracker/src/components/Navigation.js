import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Nav = styled.nav`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: end;
    width: 100%;
    padding: 0;
    height: 7vh;
    background: #9e9e9e;
    box-shadow:  0px 20px 41px #868686, 
                 0px -20px 41px #b6b6b6;
`

const StyledLink = styled(Link)`
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #424242;
    width: 5%;
    height: 70%;
    text-decoration: none;
    background-color: white;
    border-radius: 10px;
    background: linear-gradient(145deg, #a9a9a9, #8e8e8e);
    box-shadow:  4px 4px 8px #868686, 
                 -4px -4px 8px #b6b6b6;
    &:hover {
        background: white;
    }
`


function Navigation(props) {
    return (
        <>
            <Nav>
                <StyledLink to="/">Log out</StyledLink>
            </Nav>
        </>
    )
}

export default connect((state) => {
    return {
        name: state.name
    }
})(Navigation);