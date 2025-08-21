const initialState = {
    reservationHistory: [],
    parkings: [],  
};

const parkingReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_PARKINGS_SUCCESS':
            return {
                ...state,
                parkings: action.payload,  
            };
        case 'RESERVE_PARKING':
            const updatedParkings = state.parkings.map(parking => {
                if (parking.id === action.payload.parkingId) {
                    return {
                        ...parking,
                        availableSpots: parking.availableSpots - 1,
                    };
                }
                return parking;
            });
            return {
                ...state,
                reservationHistory: [...state.reservationHistory, action.payload],
                parkings: updatedParkings, 
            };
        case 'DELETE_RESERVATION':
            return {
                ...state,
                reservationHistory: state.reservationHistory.filter(
                    (reservation) => reservation.id !== action.payload
                ),
            };
        case 'UPDATE_RESERVATION':
            return {
                ...state,
                reservationHistory: state.reservationHistory.map((reservation) =>
                    reservation.id === action.payload.id ? action.payload : reservation
                ),
            };
        default:
            return state;
    }
};

export default parkingReducer;
