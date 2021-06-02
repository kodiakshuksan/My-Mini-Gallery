import React, { createContext, useReducer, useContext } from 'react';
import {
    LOGIN,
    LOGOUT,
    CREATE_ART
} from "./actions"

const ArtContext = createContext();
const { Provider } = ArtContext;


const reducer = (state,action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                user: action.user
            }
        case LOGOUT:
            return {
                ...state,
                user: {}
            }
        case CREATE_ART:
            return {
                ...state,
                art: [action.art, ...state.arts]
            }
            default:
                return state
    }
}

const ArtProvider = ({ value = {}, ...props }) => {
    const [state, dispatch] = useReducer(reducer, {
        arts: [],
        user: {},
    })

    return <Provider value={[state, dispatch]} {...props} />
}

const useArtContext = () => {
    return useContext(ArtContext);
}

export { ArtProvider, useArtContext }
