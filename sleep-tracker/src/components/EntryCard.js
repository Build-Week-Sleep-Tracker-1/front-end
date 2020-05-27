import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { deleteEntry, getUserEntries, editEntry } from '../actions';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatThisDate, formatThisHour } from '../util/utilFunctions';


const OuterDiv = styled.div`
    background-color: white;
    border: 2px solid grey;
    border-radius: 5px;
    margin: .3%;
    padding: .5%;
    display: flex;
    flex-direction: column;
    width: 13%;
    transition: transform .2s;
    &:hover {
        transform: scale(1.07);
      } 
` 
const InnerDiv = styled.div`
    display: flex;
    align-items: center;
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
    const [ editing, setEditing ] = useState(false);
    const [ formState, setFormState ] = useState({
        date: "",
        sleep_start: "",
        sleep_end: "",
        mood_score: "",
    });

    const formatData = () => {
        const [ formatedDate, totalHours ] = formatThisDate(formState.date, formState.sleep_start.getHours(), formState.sleep_end.getHours())

        return (
            {
                ...formState,
                date: formatedDate,
                sleep_start: formatThisHour(formState.sleep_start.getHours()),
                sleep_end: formatThisHour(formState.sleep_end.getHours()),    
                mood_score: parseInt(formState.mood_score),
                total_time: totalHours 
            }
        )
    }

    const cancelChanges =() => {
        setEditing(!editing)
        setFormState({
            ...formState,
            date: "",
            sleep_start: "",
            sleep_end: "",
            mood_score: "",
        })
    } 

    const handleChange = e => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        if ((formState.date === "") || (formState.sleep_start === "") || (formState.sleep_end === "") || (formState.mood_score === "")) {
            alert("PLEASE FILL IN ALL THE BOXES!")
            setEditing(!editing);
        } else {
            console.log("submitted");
            console.log(formatData());
            props.editEntry(props.entry.user_id, props.entry.id, formatData()); 
            setEditing(!editing);
            setFormState({
                ...formState,
                date: "",
                sleep_start: "",
                sleep_end: "",
                mood_score: ""
            });
        }
    }

    return (
        <OuterDiv>
            {
                editing ? 
                <form>
                    <InnerDiv> 
                        <P>Date: </P> 
                        <DatePicker name="date" selected={formState.date} onChange={dateSelected => setFormState({...formState, date: dateSelected})} placeholderText="Day Sleep Started"/>
                    </InnerDiv>
                    <InnerDiv> 
                        <P>Sleep Start: </P> 
                        <DatePicker 
                            selected={formState.sleep_start}
                            onChange={time => setFormState({...formState, sleep_start: time})}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={60}
                            timeCaption="Sleep Start"
                            dateFormat="h:mm aa"
                            placeholderText="Time Sleep Started"
                        />
                    </InnerDiv>
                    <InnerDiv> 
                        <P>Sleep End: </P>
                        <DatePicker 
                            selected={formState.sleep_end}
                            onChange={time => setFormState({...formState, sleep_end: time})}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={60}
                            timeCaption="Sleep End"
                            dateFormat="h:mm aa"
                            placeholderText="Time Sleep Ended"
                        />
                    </InnerDiv>
                    <InnerDiv> 
                        <P>Mood Score: </P> 
                    <select name="mood_score" onChange={handleChange} value={formState.mood_score}>
                        <option></option>
                        <option value={4} >😃 4</option>
                        <option value={3} >🙂 3</option>
                        <option value={2} >😐 2</option>
                        <option value={1} >🙁 1</option>
                    </select>
                    </InnerDiv>  
                </form>
                :
                <>
                    <InnerDiv> <P>Date: </P> <DataP>{props.entry.date}</DataP> </InnerDiv>
                    <InnerDiv> <P>Sleep Start: </P> <DataP>{props.entry.sleep_start}</DataP> </InnerDiv>
                    <InnerDiv> <P>Sleep End: </P> <DataP>{props.entry.sleep_end}</DataP> </InnerDiv>
                    <InnerDiv> <P>Total Time Slept: </P> <DataP>{props.entry.total_time}</DataP> </InnerDiv>
                    <InnerDiv> <P>Mood Score: </P> <DataP>{props.entry.mood_score}</DataP> </InnerDiv>
                </>
            }
            { !editing ? <button onClick={() => setEditing(!editing)}>Edit</button> : 
                <>
                    <button onClick={() => handleSubmit()}>Save Changes</button> 
                    <button onClick={() => cancelChanges()}>Cancel</button>
                </>
            }
            <button onClick={() => props.deleteEntry(props.entry.user_id,props.entry.id)}>Delete</button>
        </OuterDiv>
    )
}

export default connect(null,{ deleteEntry: deleteEntry, getUserEntries: getUserEntries, editEntry: editEntry })(Entries);