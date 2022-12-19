import React from "react";

const AuthContext = React.createContext({
    isOpen: false,
    setIsOpen: () => {}
})

export default AuthContext