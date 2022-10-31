/* URL : /join */
export const joinUser = (req,res)=> {
    return res.send("<h1>Join page<h1>");
}

/* URL : /users/edit */
export const editUser = (req,res)=> {
    return res.send("Edit user page.");
}

/* URL : /users/delete */
export const deleteUser = (req,res)=> {
    return res.send("Delete user page.");
}

/* URL : /login */
export const login = (req,res)=> {
    return res.send(" Log in.");
}

/* URL : /users/logout */
export const logout = (req,res)=> {
    return res.send(" Log out.");
}

/* URL : /users/:uId/profile */
export const profile = (req,res)=> {
    return res.send(" Profile page.");
}
