import React from "react";
import {Link} from 'react-router-dom'


export function NavBar(){
    return <header className="header">
        <nav className="nav">
            <ul>
                <li><Link className="link" to={"/"}></Link></li>
            </ul>
        </nav>
    </header>
}