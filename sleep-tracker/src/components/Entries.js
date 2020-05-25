import React from 'react';
import { connect } from 'react-redux';
import EntryCard from './EntryCard';
import styled from 'styled-components';

const DivTop = styled.div`
    padding-top: .5%;
    border-top: 5px solid grey;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`
const DivBottom = styled.div`
    border-bottom: 5px solid grey;
    padding-bottom: .5%;
`

function Entries(props) {
    return (
        <>
            <DivTop>
                {
                !props.userEntries ? <h3>Loading Entries...</h3> : 
                props.userEntries.length === 0 ? <h3>No Entries To Display...</h3> :
                props.userEntries.map((item)=> {
                    return <EntryCard key={item.id} entry={item}/>
                })}
            </DivTop>
            <DivBottom>

            </DivBottom>
        </>  
    )
}

export default connect((state) => {
    return {
        userEntries: state.userEntries
    }
})(Entries);