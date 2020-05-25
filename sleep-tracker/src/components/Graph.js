import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
 
const OuterDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
` 
const InnerDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
`
const H3 = styled.h3`
    border: 1px solid red;
    writing-mode: vertical-rl;
    text-orientation: upright;
`

function formatData(data) {
    return (data.map((item) => {
        return {...item, date: item.date.substring(0, item.date.length - 5)}
    }))
}


function Graph(props) {
    return (
        <OuterDiv>  
            {
            !props.userEntries ? <h2>Loading Graph...</h2> : 
            props.userEntries.length === 0 ? <h3>No Info To Display...</h3> : 
            <BarChart width={1900} height={200} data={formatData(props.userEntries)}>
                <CartesianGrid stroke="#ccc" />
                <Bar dataKey="total_time" fill="#42bcf5"/>
                <XAxis dataKey="date"/>
                <YAxis />
            </BarChart>
            }
            {!props.userEntries ? null : <h3>Dates(month-day)</h3>}
        </OuterDiv>
    )
}

export default connect((state) => {
    return {
        userEntries: state.userEntries
    }
})(Graph);