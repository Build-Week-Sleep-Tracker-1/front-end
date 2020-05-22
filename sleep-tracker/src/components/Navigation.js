import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Nav = styled.nav`
    background-color: #42bcf5;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`

function Navigation(props) {
    return (
        <>
            <Nav>
                <p>Welcome</p>
                <Link to="login">Log out</Link>
            </Nav>
        </>
    )
}

export default connect()(Navigation);