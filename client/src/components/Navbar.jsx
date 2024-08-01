import React, {useContext} from 'react';
import {Link} from "react-router-dom"
import { UserContext } from './context/UserProvider';

function Navbar() {

    const {logout} = useContext(UserContext)
    return (
        <nav>
            <Link to = "profile"><button>Profile</button></Link>
            <Link to = "public"><button>Public</button></Link>
            <button onClick = {logout}>Logout</button>
        </nav>
     );
}

export default Navbar;