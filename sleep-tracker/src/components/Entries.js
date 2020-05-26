import React, { useState } from 'react';
import { connect } from 'react-redux';
import EntryCard from './EntryCard';
import AddEntry from './AddEntry';
import styled from 'styled-components';

const Div = styled.div`
    padding-top: .5%;
    border-top: 5px solid grey;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    border-bottom: 5px solid grey;
    padding-bottom: .5%;
    background-color: #ccc;
`
const ButtonDiv = styled.div`
    margin-left: .5%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const AddButton = styled.button`
    height: 96%;
    border-radius: 5px; 
    font-size: 3rem;
    border: 2px solid #42bcf5;
    color: #42bcf5;
    &:hover {
        background-color: #42bcf5;
        color: white;
    }
`

function Entries(props) {
    const [ addEntry, setAddEntry ] = useState(false);

    return (
        <>
            <Div>
                {
                !props.userEntries ? <h3>Loading Entries...</h3> : 
                props.userEntries.length === 0 ? <h3>No Entries To Display...</h3> :
                props.userEntries.map((item)=> {
                    return <EntryCard key={item.id} entry={item}/>
                })}
                {props.userEntries && !addEntry ? <ButtonDiv><AddButton onClick={() => setAddEntry(!addEntry)} title="Add New Entry">+</AddButton></ButtonDiv> 
                    : 
                    addEntry ? <AddEntry setAddEntry={setAddEntry} addEntry={addEntry} /> : null}
            </Div>
        </>  
    )
}

export default connect((state) => {
    return {
        userEntries: state.userEntries
    }
})(Entries);