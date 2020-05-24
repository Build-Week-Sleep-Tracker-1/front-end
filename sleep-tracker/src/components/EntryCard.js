import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { deleteEntry, getUserEntries } from '../actions'

const OuterDiv = styled.div`
    border: 2px solid grey;
    border-radius: 5px;
    margin: .3%;
    padding: .5%;
    display: flex;
    flex-direction: column;
    width: 7%;
    transition: transform .2s;
    &:hover {
        transform: scale(1.07);
      } 
` 

const InnerDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between; 
`

const P = styled.p`
    font-weight: bold;
`

const DataP = styled.p`
    font-weight: bold;
    color: #42bcf5;
`

function Entries(props) {

    return (
        <OuterDiv>
            <InnerDiv> <P>Date: </P> <DataP>{props.entry.date}</DataP> </InnerDiv>
            <InnerDiv> <P>Sleep Start: </P> <DataP>{props.entry.sleep_start}</DataP> </InnerDiv>
            <InnerDiv> <P>Sleep End: </P> <DataP>{props.entry.sleep_end}</DataP> </InnerDiv>
            <InnerDiv> <P>Total Time: </P> <DataP>{props.entry.total_time}</DataP> </InnerDiv>
            <InnerDiv> <P>Mood Score: </P> <DataP>{props.entry.mood_score}</DataP> </InnerDiv>
            <button onClick={() => console.log(props.entry)}>Edit</button>
            <button onClick={() => props.deleteEntry(props.entry.user_id,props.entry.id)}>Delete</button>
        </OuterDiv>
    )
}

export default connect(null,{ deleteEntry: deleteEntry, getUserEntries: getUserEntries })(Entries);