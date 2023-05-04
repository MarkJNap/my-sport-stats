import React from 'react';
import Auth from "../utils/auth";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <h1>
                <Link to="/">Header</Link></h1>
            <ul>
                <li>
                    <Link to='/stats'>Stats</Link>
                </li>
                <li>
                    <Link to='/dashboard'>Dashboard</Link>
                </li>
                {Auth.loggedIn() ? (
                <>
                  <li onClick={Auth.logout}><Link to="/">Logout</Link></li>
                </>
              ) : (
                <li><Link to='/signup'>Sign up</Link></li>
              )}
            </ul>
        </header>
    )
}