import React, {useState, useContext}from 'react';
import { UserContext } from './context/UserProvider';


function StudentForm() {

    const {addStudent} = useContext(UserContext)

    const initInputs = {
        firstName: "",
        lastName: "",
        currLevel: "",
        progressPoint: ""
    }

    const [inputs, setInputs] = useState(initInputs)

    const handleChange = (e) => {
        const {name, value} = e.target
        setInputs(prevInputs => {
            return {
                ...prevInputs,
                [name] : value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addStudent(inputs)
    }

    return (
        <form id = "student-form" onSubmit = {handleSubmit}>
            <label>Add a New Student</label>
            <input name = "firstName" value = {inputs.firstName} onChange = {handleChange} placeholder='first name' />
            <input name = "lastName" value = {inputs.lastName} onChange = {handleChange} placeholder='last name' />
            <input name = "currLevel" value = {inputs.currLevel} onChange = {handleChange} placeholder='current level' type = "number" />
            <input name = "progressPoint" value = {inputs.progressPoint} onChange = {handleChange} placeholder='progress point' type = "number" />
            <button>Add Student</button>
        </form>
      );
}

export default StudentForm;