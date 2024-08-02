import React, { useContext, useState } from 'react';
import axios from "axios"
import Student from '../Student';
export const UserContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

function UserProvider(props) {

    const initState = {
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || "",
        students: [],
        errMsg: ''
    }

    const [userState, setUserState] = useState(initState)
    const [myStudents, setMyStudents] = useState([])
    const [allStudents, setAllStudents] = useState([])


    const signup = async (creds) => {
        try {
            const res = await axios.post("/api/auth/signup", creds)
            const { user, token } = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            setUserState(prevUserState => {
                return {
                    ...prevUserState,
                    user: user,
                    token: token
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const login = async (creds) => {
        try {
            const res = await axios.post("api/auth/login", creds)
            const { user, token } = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            setUserState(prevUserState => {
                return {
                    ...prevUserState,
                    user: user,
                    token: token
                }
            })

        } catch (error) {
            console.log(error)
        }
    }

    const logout = () => {
        try {
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            setUserState({
                user: {},
                token: "",
                issues: []
            })
        } catch (error) {
            console.log(error)
        }
    }

    const getMyStudents = () => {
        userAxios.get("/api/protected/students/mystudents")
        .then(res => setMyStudents(res.data))
        .catch(err => console.log(err))
    }

    const getAllStudents = () => {
        userAxios.get("/api/protected/students")
        .then(res => setAllStudents(res.data))
        .catch(err => console.log(err))
    }

    const addStudent = (newStudent) => {
        userAxios.post("/api/protected/students", newStudent)
            .then(res => setMyStudents(prevMyStudents => {
                return [
                    ...prevMyStudents,
                    res.data
                ]
            }))
    }

    const submitEdits = (id, edits) => {
        userAxios.put(`/api/protected/students/${id}`, edits)
            .then(res => setMyStudents(prevMyStudents => {
                return prevMyStudents.map(student => student._id === id ? res.data : student)
            }))   
        // .then(res = setMyStudents(prevMyStudents => prevMyStudents.map(student => student._id === id ? res.data : student)))
            .catch(err => console.log(err))
        }

        const deleteStudent = (id) => {
            userAxios.delete(`/api/protected/students/${id}`)
                .then(res => setMyStudents(prevMyStudents => prevMyStudents.filter(student => student._id !== id)))
                .catch(err => console.log(err))
            }


    return (
        <UserContext.Provider value={{
            ...userState,
            signup,
            login, 
            logout,
            myStudents,
            getMyStudents,
            getAllStudents,
            allStudents,
            addStudent, 
            submitEdits,
            deleteStudent
        }}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserProvider;