import React from 'react';
import { connect } from 'react-redux';

function RecommendedSleep(props) {

    const recommendedAmount = (entries) => {
        const highestMoodEntries =  entries.filter(item => {
            return item.mood_score === 4
        })

        let totalTimeArray = []

        highestMoodEntries.map(item => {
            return totalTimeArray.push(item.total_time)
        })
        
        return Math.min(...totalTimeArray);
    }

    return (
        <>
        <h2>We recommend you sleep: </h2>
        {!props.userEntries ? <h4>Loading recommended amount of sleep...</h4> : props.userEntries.length > 30 ? // should be < 30
            <h4>You currently have less than 30 entries. Once you have entered 30 or more entries we will 
                update this area with the recommended amount of hours that you should sleep.</h4> 
            : 
        <>
            <h4>{recommendedAmount(props.userEntries)} hours per night</h4>
            <p>Since it is the lowest amount of sleep that you need to be in your happiest mood. </p>
        </>}
        </>
    )
}

export default connect((state) => {
    return {
        userEntries: state.userEntries
    }
})(RecommendedSleep);