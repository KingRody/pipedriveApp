import * as PipedriveActionTypes from "../actionTypes/pipedriveApp";

export const fetchPeople = () => {
    return (dispatch, getState) => {

        const { currentPage } = getState();
        dispatch(fetchedStarted());

        fetch("https://rodolfocompany-860a35.pipedrive.com/v1/persons?api_token=479f2bc15058867bb7dcfdaade60fe25d27c55f4")
        .then(response => response.json())
        .then( data => {
            const people = data.data;
            dispatch(fetchedSuccess(people))
            dispatch(peopleInPage(currentPage, people))
        })
        .catch( error => dispatch(fetchedFailure(error)))
    }
}

export const fetchedStarted = () => {
    return {
        type: PipedriveActionTypes.FETCH_STARTED
    }
};

export const fetchedSuccess = people => {
    return {
        type: PipedriveActionTypes.FETCH_SUCCESS,
        people
    }
};

export const fetchedFailure = error => {
    return {
        type: PipedriveActionTypes.FETCH_FAILURE,
        error
    }
};

export const toggleModal = currentStatus => {
    return {
        type: PipedriveActionTypes.TOOGLE_MODAL,
        isDisplayed: !currentStatus
    }
};

export const personInModal = personID => {
    return {
        type: PipedriveActionTypes.SELECT_PERSON,
        personID
    }
};

export const currentPage = pageNumber => {
    return {
        type: PipedriveActionTypes.CURRENT_PAGE,
        currentPage: pageNumber
    }
}

export const peopleInPage = (pageNumber, array) => {
    
    return {
        type: PipedriveActionTypes.PEOPLE_IN_PAGE,
        indexStart: (pageNumber - 1) * 10,
        indexEnd: ((pageNumber - 1) * 10) + 10,
        array
    }
}

