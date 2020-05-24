import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';
 
const Div = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
` 

function formatData(data) {
    return (data.map((item) => {
        return {...item, date: item.date.slice(0, 5)}
    }))
}


function Graph(props) {
    return (
        <Div>
            {
            !props.userEntries ? <h2>Loading Graph...</h2> : 
            props.userEntries.length === 0 ? <h3>No Info To Display...</h3> : 
            <BarChart width={1900} height={200} data={formatData(props.userEntries)}>
                <Bar dataKey="total_time" fill="#42bcf5"/>
                <XAxis dataKey="date"/>
                <YAxis />
            </BarChart>
            }
        </Div>
    )
}

export default connect((state) => {
    return {
        userEntries: state.userEntries
    }
})(Graph);