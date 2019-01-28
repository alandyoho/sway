const INITIAL_STATE = { stations: [], homeStation: {}, workStation: {} };

export default userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "ADD_STATIONS":
            return { ...state, stations: action.stations };
        case "STORE_HOME_STATION":
            return { ...state, homeStation: action.station };
        case "STORE_WORK_STATION":
            return { ...state, workStation: action.station }
        default:
            return state
    }
};
