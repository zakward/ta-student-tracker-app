import React, {useState, useContext} from 'react';
import AuthForm from './AuthForm';
import { UserContext } from './context/UserProvider';

function Auth() {
    const { signup, login } = useContext(UserContext)

    const [input, setInput] = useState({
      name: "",
      email: "",
      password: ""
    })

    const [isMember, setIsMember] = useState(true)
  
    const handleChange = (e) => {
      const { name, value } = e.target
      setInput(prevInput => {
        return {
          ...prevInput,
          [name]: value
        }
      })
    }

    return (
      <>
        {
        isMember ?
        
            <AuthForm
            handleChange = {handleChange}
            submit = {login}
            btnText = "Login"
            isMember = {isMember}
            setIsMember = {setIsMember}
            input = {input}
            /> : 
            
            <AuthForm
            handleChange = {handleChange}
            submit = {signup}
            btnText = "Sign Up"
            isMember = {isMember}
            setIsMember = {setIsMember}
            input = {input}
            />
            }
      </>
      )
}

export default Auth;