import React, {useEffect, useContext} from 'react';
import { UserContext } from './context/UserProvider';
import Student from './Student';


function Public() {

    const {allStudents, getAllStudents} = useContext(UserContext)

    useEffect(()=> {
        getAllStudents()
    }, [])

    const studentElements = allStudents.map(student => {
        return (
            <Student {...student} />
        )
    })
    return ( 
        <div id = "public">
        <h1>All Students</h1>
        {studentElements}
        </div>
     );
}

export default Public;