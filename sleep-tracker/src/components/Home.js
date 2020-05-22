import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getUsers, login, getUserEntries, register, getEntry, createEntry, editEntry, deleteEntry } from '../actions';
import Navigation from './Navigation';

function Home(props) {

    return (
        <>
            <Navigation/>
            <button onClick={props.getUsers}>getUsers</button>
            <button onClick={() => props.login({ username: "johndoe1", password: "123" })}>Login</button>
            <button onClick={() => props.register({ username: "guyperson", password: "123", name: "guy person", age: 20 })}>Register</button>
            <button onClick={() => props.getUserEntries(1)}>getUserEntries</button>
            <button onClick={() => props.getEntry(1, 1)}>getEntry</button>
            <button onClick={() => props.createEntry(1, {date: "05-21-2020", sleep_start: "10pm", sleep_end: "5am", total_time: 7, mood_score: 3})}>createEntry</button>
            <button onClick={() => props.editEntry(1, 9, {date: "05-21-2020", sleep_start: "10pm", sleep_end: "6am", total_time: 8, mood_score: 4})}>editEntry</button>
            <button onClick={() => props.deleteEntry(1, 9)}>deleteEntry</button>
        </>
    )
}

export default connect((state) => {
    return {
        users: state.users
    }
}, { getUsers: getUsers, login: login, getUserEntries: getUserEntries, register: register, getEntry: getEntry, createEntry: createEntry, editEntry: editEntry, deleteEntry: deleteEntry })(Home);