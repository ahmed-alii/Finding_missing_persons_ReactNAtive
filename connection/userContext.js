import React from "react";
const UserContext = React.createContext({
    loggedIn: false,
    setLoggedin: () => {}
});

export default UserContext;