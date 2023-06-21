import React from "react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
// Base menu layout from https://react.semantic-ui.com/collections/menu/#variations-borderless

export default function Header() {
  return (
    <Menu size="massive" borderless style={ {backgroundColor: "#242323" } }>
      <Menu.Item>
        <Link style={ {color: "white"} } to="/">MySportStats</Link>
      </Menu.Item>
      <Menu.Menu position="right">
        {Auth.loggedIn() ? (
          <>
            <Menu.Item >
              <Link style={ {color: "white"} } to="/stats">Stats</Link>
            </Menu.Item>
            <Menu.Item>
              <Link style={ {color: "white"} } to="/dashboard">Dashboard</Link>
            </Menu.Item>
            <Menu.Item as={"li"} onClick={Auth.logout}>
              <Link style={ {color: "white"} } to="/">Logout</Link>
            </Menu.Item>
          </>
        ) : (
          <Menu.Item >
            <Link style={ {color: "white"} } to="/login">Login</Link>
          </Menu.Item>
        )}
      </Menu.Menu>
    </Menu>
  );
}
