import { findAllByDisplayValue } from "@testing-library/react";

export const initialState = {
    user: null,
    userPlaylists: [],
    spotify: null,
    otherUser: null,
    otherUserPlaylists: [],
    // remove after debuging
    token: 'BQDMuwuSXOO-c5G61FI_HHEt9lI6AanypwRPFixL03cUeNOFiwx3qbtYlAQpk2PPl4tOzUzAJBf1Itv9jXJx-YZ8F8q_DcTJb1jfehbRHWZ7Xj1MNp2bjgPLjee9ooh4RH03i6PGZZjyKYFL8ULddKWiK4m6RZs6PSlC0teQLzh8zqZo'
};

const reducer = (state, action) => {
    // console.log(action);

    // Action -> type, [payload]

    switch (action.type) {
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token,
            };
        case "SET_SPOTIFY":
            return {
                ...state,
                spotify: action.spotify,
            };
        case 'SET_USER':
            return {
                ...state,
                user: action.user,
            };
        case 'SET_OTHER_USER':
            return {
                ...state,
                otherUser: action.otherUser,
            };
        case 'SET_PLAYLISTS':
            return {
                ...state,
                playlists: action.playlists,
            };
        case 'SET_OTHER_USER_PLAYLISTS':
            return {
                ...state,
                otherUserPlaylists: action.otherUserPlaylists,
            };
        default:
            return state;
    }
}

export default reducer;