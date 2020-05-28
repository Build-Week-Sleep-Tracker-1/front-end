import React, { useState } from 'react';
import { connect } from 'react-redux';
import EntryCard from './EntryCard';
import AddEntry from './AddEntry';
import styled from 'styled-components';

const Div = styled.div`
    padding-top: .5%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding-bottom: .5%;
`

const ButtonDiv = styled.div`
    margin-left: .5%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const AddButton = styled.button`
    height: 96%;
    font-size: 3rem;
    color: #111d57;
    border-radius: 10px;
    background: linear-gradient(145deg, #5bc6ff, #4da7db);
    box-shadow:  3px 3px 6px #489dcf, 
                 -3px -3px 6px #62d5ff;
    &:hover {
        background: white;
    }
`

function Entries(props) {
    const [ addEntry, setAddEntry ] = useState(false);

    return (
        <>
            <Div>
                {
                !props.userEntries ? <h3>Loading Entries...</h3> : 
                props.userEntries.length === 0 ? <h3>Click here to add an entry =></h3> :
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