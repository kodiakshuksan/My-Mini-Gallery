import React, { createContext, useReducer, useContext } from 'react';
import {
    LOGIN,
    LOGOUT,
    CREATE_ART,
    GET_ALL_ART,
    GET_ARTIST,
    UPDATE_ARTIST
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
        case GET_ALL_ART:
            return {
                ...state,
                arts: action.arts,
                genre: action.genre
            }
        case GET_ARTIST:
            return {
                ...state,
                artist: action.artist
            }
        case UPDATE_ARTIST:
            return {
                ...state,
                artist: action.artist,
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
        artist: {}
    })

    return <Provider value={[state, dispatch]} {...props} />
}

const useArtContext = () => {
    return useContext(ArtContext);
}

export { ArtProvider, useArtContext }
