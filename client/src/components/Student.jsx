import React, {useState, useContext} from 'react';
import StudentForm from './StudentForm';
import { UserContext } from './context/UserProvider';


function Student({firstName, lastName, currLevel, progressPoint, instructorName, _id, assignedInstructor}) {

    const {submitEdits, deleteStudent, user} = useContext(UserContext)

    const [edits, setEdits] = useState({
        firstName: firstName || "",
        lastName: lastName || "",
        currLevel: currLevel || "",
        progressPoint: progressPoint || ""
    })

    const [isEditing, setIsEditing] = useState(false)

    const handleChange = (e) => {
        const {name, value} = e.target
        setEdits(prevEdits => {
            return {
                ...prevEdits,
                [name] : value
            }
        })
    }

    const toggleEdit = () => {
        setIsEditing(!isEditing)
    }

    const handleSubmitEdits = (e) => {
        e.preventDefault()
        submitEdits(_id, edits)
        toggleEdit()
    }

    const handleDeleteStudent = (e) => {
        deleteStudent(_id)
    }

    return ( 
        <div id = "student">
            <h1>Student</h1>
            <h2>First: {firstName}</h2>
            <h2>Last: {lastName}</h2>
            <h2>Current Level: {currLevel}</h2>
            <h2>Current Progress Point: {progressPoint}</h2>
            <h2>Assigned To: {instructorName}</h2>
           {assignedInstructor === user._id && (
            <>
                <button onClick = {toggleEdit}>Edit Student</button>
                <button onClick = {handleDeleteStudent}>Delete Student</button>
            </>
           ) }

          {isEditing &&
           <form onSubmit = {handleSubmitEdits}>
            <label>First Name</label><input name = "firstName" value = {edits.firstName} onChange = {handleChange} />
            <label>Last Name</label><input name = "lastName" value = {edits.lastName} onChange = {handleChange} />
            <label>Current Level</label><input name = "currLevel" value = {edits.currLevel} onChange = {handleChange} type = "number" />
            <label>Current Progress Point</label><input name = "progressPoint" value = {edits.progressPoint} onChange = {handleChange} type = "number" />
            <button>Submit Edits</button>
           </form>}
        </div>
     );
}

export default Student;