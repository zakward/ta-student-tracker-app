import React, { useContext, useState } from 'react';
import { UserContext } from "./context/UserProvider"


function AuthForm({btnText, submit, isMember, setIsMember}) {

  const { signup, login } = useContext(UserContext)

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setInput(prevInput => {
      return {
        ...prevInput,
        [name]: value
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    submit(input)
  }

  const toggleMemberStatus = () => {
    setIsMember(!isMember)
  }

  console.log(input)
  return (
    <form id = "auth-form" onSubmit = {handleSubmit}>
      <input onChange = {handleChange} placeholder='name' name="name" value = {input.name} />
      <input onChange = {handleChange} placeholder='email' name="email" value = {input.email} />
      <input onChange = {handleChange} placeholder='password' type="password" name="password" value = {input.password} />
      <button>{btnText}</button>
      <p style = {{ height: "25px", width: "200px"}} onClick = {toggleMemberStatus}>{isMember ? "Click to create an account!!" : "Click to log in!!"}</p>
      
    </form>
  );
}

export default AuthForm;