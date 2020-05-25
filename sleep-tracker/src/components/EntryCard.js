import React, { useState } from 'react';
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
    width: 10%;
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
    const [ editing, setEditing ] = useState(false);
    const [ formState, setFormState ] = useState({
        month: null,
        day: null,
        // MUST ADD YEAR onSubmit FUNCTION
        sleep_start: null,
        sleep_end: null,
        mood_score: null,
        // MUST ADD TOTAL_TIME onSubmit FUNCTION 
    });

    const handleChange = e => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    return (
        <OuterDiv>
            {
                editing ? 
                <form>
                    <InnerDiv> <P>Date: </P> 
                    <select name="month" onChange={handleChange} value={formState.month}>
                        <option>01</option>
                        <option>02</option>
                        <option>03</option>
                        <option>04</option>
                        <option>05</option>
                        <option>06</option>
                        <option>07</option>
                        <option>08</option>
                        <option>09</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                    </select>
                    <select name="day" onChange={handleChange} value={formState.day}>
                        <option>01</option>
                        <option>02</option>
                        <option>03</option>
                        <option>03</option>
                        <option>04</option>
                        <option>05</option>
                        <option>06</option>
                        <option>07</option>
                        <option>08</option>
                        <option>09</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                        <option>13</option>
                        <option>14</option>
                        <option>15</option>
                        <option>16</option>
                        <option>17</option>
                        <option>18</option>
                        <option>19</option>
                        <option>20</option>
                        <option>21</option>
                        <option>22</option>
                        <option>23</option>
                        <option>24</option>
                        <option>25</option>
                        <option>26</option>
                        <option>27</option>
                        <option>28</option>
                        {}
                    </select>
                    <select>
                        {/* ADD CURRENT YEAR IN STATE */}
                    </select>
                    </InnerDiv>
                    <InnerDiv> <P>Sleep Start: </P> </InnerDiv>
                    <InnerDiv> <P>Sleep End: </P> </InnerDiv>
                    <InnerDiv> <P>Total Time: </P> </InnerDiv>
                    <InnerDiv> <P>Mood Score: </P> 
                    <select>
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
                    <InnerDiv> <P>Total Time: </P> <DataP>{props.entry.total_time}</DataP> </InnerDiv>
                    <InnerDiv> <P>Mood Score: </P> <DataP>{props.entry.mood_score}</DataP> </InnerDiv>
                </>
            }
            { !editing ? <button onClick={() => setEditing(!editing)}>Edit</button> : <button onClick={() => setEditing(!editing)}>Save Changes</button> }
            <button onClick={() => props.deleteEntry(props.entry.user_id,props.entry.id)}>Delete</button>
        </OuterDiv>
    )
}

export default connect(null,{ deleteEntry: deleteEntry, getUserEntries: getUserEntries })(Entries);