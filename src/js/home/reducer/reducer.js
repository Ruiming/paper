import { ADD_QUESTION } from '../action/action'
import { combineReducers } from 'redux'

const initialState = {
    title: '',
    time: "2016-7-19",
    author: "Ruiming",
    questions: [{
        title: '',
        type: 'radio',
        content: ['', '', '', '']
    }, {
        title: '',
        type: 'checkbox',
        content: ['','','','']
    }]
};
function questions(state = initialState, action) {
    switch(action.type) {
        case ADD_QUESTION:
            return [
                    ...state.questions,
                    {
                        title: '',
                        type: 'radio',
                        content: ['', '', '', '']
                    }
                ];
        default:
            return state;
    }
}

const paperApp = combineReducers({
    questions
});

export default paperApp;
