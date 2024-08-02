import React, {useContext, useEffect} from 'react';
import { UserContext } from "./context/UserProvider"
import StudentForm from './StudentForm';
import Student from "./Student"

function Profile() {

   const {user, myStudents, getMyStudents} = useContext(UserContext)

   useEffect(()=> {
      getMyStudents()
   }, [])

   const myStudentElements = myStudents.map(student => {
      return (
         <Student {...student}/>
      )
   })
    return ( 
        <div id = "profile">
           <h1>Welcome {user.name[0].toUpperCase() + user.name.slice(1)}!</h1> 
           <StudentForm />
           <h1>My Students</h1>
           {myStudentElements}
        </div>
     );
}

export default Profile;
