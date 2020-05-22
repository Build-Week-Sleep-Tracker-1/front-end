const initialState = {
    users: "Loading users...",
    welcomeMessage: "Loading message..."
}


export const reducer = (state = initialState, action) => {
    switch(action.type){

        case "REGISTER":
            console.log("POST_AUTH_REGISTER called from reducer", action.payload)
            return { ...state }
        case "LOGIN":
            console.log("LOGIN called from reducer", action.payload)
            return { ...state }
        case "GET_USERS":
            console.log("GET_USERS called from reducer", action.payload)
            return { ...state }
        case "GET_USER_ENTRIES":
            console.log("GET_USER_ENTRIES called from reducer", action.payload)
            return { ...state }
        case "GET_ENTRY":
            console.log("GET_ENTRY called from reducer", action.payload)
            return{ ...state }
        case "CREATE_ENTRY":
            console.log("CREATE_ENTRY called from reducer", action.payload)
            return({ ...state})
        case "EDIT_ENTRY":
            console.log("EDIT_ENTRY called from reducer", action.payload)
            return({ ...state})
        case "DELETE_ENTRY":
            console.log("DELETE_ENTRY called from reducer", action.payload)
            return({ ...state})
        default:
            return state;
    }
}