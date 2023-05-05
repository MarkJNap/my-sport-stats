import React from "react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
// Base menu layout from https://react.semantic-ui.com/collections/menu/#variations-borderless

export default function Header() {
  return (
    // OPTION: fixed="top" to fix the header in place
    <Menu size="massive" borderless fixed="top">
      <Menu.Item>
        <Link to="/">App Name!</Link>
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>
          <Link to="/stats">Stats</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>
        {Auth.loggedIn() ? (
          <>
            <Menu.Item onClick={Auth.logout}>
              <Link to="/">Logout</Link>
            </Menu.Item>
          </>
        ) : (
          <Menu.Item>
            <Link to="/login">Login</Link>
          </Menu.Item>
        )}
      </Menu.Menu>
    </Menu>
  );
}
