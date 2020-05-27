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
    margin-bottom: 0;
    padding-bottom: 0;
` 
const H3 = styled.h3`
    margin-bottom: 3%;
`
const P = styled.h1`
    font-weight: bold;
    flex-direction: row;
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
    width: 20%;
    height: 100%;   
    background-color: white;
`

function formatData(data) {
    return (data.map((item) => {
        return {...item, date: item.date.substring(0, item.date.length - 5)}
    }))
}


function Graph(props) {
    return (
        <OuterDiv>
            {!props.name ? <p>Loading welcome...</p> : 
                <P>{props.name.toLowerCase()
                                .split(' ')
                                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                                .join(' ')
                }
                </P>
            }  
            {
            !props.userEntries ? <h2>Loading Graph...</h2> : 
            props.userEntries.length === 0 ? <h3>No Info To Display...</h3> : 
            <BarChart width={1900} height={200} data={formatData(props.userEntries)} >
                <CartesianGrid stroke="#ccc" />
                <Bar dataKey="total_time" fill="#42bcf5" />
                <XAxis dataKey="date" />
                <YAxis label={{ value: 'Hours', angle: -90, position: 'center' }}/>
            </BarChart>
            }
            {!props.userEntries ? null : <H3>Dates(month-day)</H3>}
        </OuterDiv>
    )
}

export default connect((state) => {
    return {
        name: state.name,
        userEntries: state.userEntries
    }
})(Graph);