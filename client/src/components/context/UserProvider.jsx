import React, { useContext, useState } from 'react';
import axios from "axios"
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

    return (
        <UserContext.Provider value={{
            ...userState,
            signup,
            login, 
            logout
        }}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserProvider;