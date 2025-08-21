import axios from 'axios';

export const fetchParkings = () => async (dispatch) => {
    dispatch({ type: 'FETCH_PARKINGS_REQUEST' });
    try {
        const response = await axios.get('/data/parkings.json');
        dispatch({ type: 'FETCH_PARKINGS_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'FETCH_PARKINGS_FAILURE', payload: error.message });
    }
};



export const reserveParking = (reservation) => ({
    type: 'RESERVE_PARKING',
    payload: reservation,
});

export const deleteReservation = (id) => ({
    type: 'DELETE_RESERVATION',
    payload: id,
});

export const updateReservation = (updatedReservation) => ({
    type: 'UPDATE_RESERVATION',
    payload: updatedReservation,
});
