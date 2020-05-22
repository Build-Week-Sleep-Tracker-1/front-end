import React from 'react';
import { connect } from 'react-redux';

function RecommendedSleep(props) {
    return (
        <>
        {!props.userEntries ? <h2>Loading recommended amount of sleep...</h2> : props.userEntries.length < 30 ? 
            <p>You have less than 30 entries</p> 
            : 
            <p>We recommended you sleep ... many hours.</p>}
        </>
    )
}

export default connect((state) => {
    return {
        userEntries: state.userEntries
    }
})(RecommendedSleep);