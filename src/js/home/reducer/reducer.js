import { ADD_QUESTION, ADD_OPTION, SET_PAPER_TITLE, SET_QUESTION_TITLE, REMOVE_OPTION, REMOVE_QUESTION } from '../action/action'
import { combineReducers } from 'redux'

const initialState = {
    paper: {
        title: 'asd',
        time: "2016-7-19",
        author: "Ruiming",
    },
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
function questionsReducer(state=initialState.questions, action) {
    switch(action.type) {
        case ADD_QUESTION:
            return [
                ...state,
                {
                    title: '',
                    type: 'checkbox',
                    content: ['','','','']
                }
            ];
        case REMOVE_QUESTION:
            return state;
        case ADD_OPTION:
        case REMOVE_OPTION:
        case SET_QUESTION_TITLE:
            return [
                ...state.slice(0, action.questionId),
                questionReducer(state[action.questionId], action),
                ...state.slice(action.questionId+1)
            ];
        default:
            return state;
    }
}
function paperReducer(state=initialState.paper, action) {
    switch(action.type) {
        case SET_PAPER_TITLE:
            return Object.assign({}, state, {
                title: action.value
            });
        default:
            return state;
    }
}
function questionReducer(state=[], action) {
    let paper = state;
    switch(action.type) {
        case ADD_OPTION:
            paper.content.push('');
            return paper;
        case REMOVE_OPTION:
            paper.questions[action.questionId].content.splice(action.optionId, 1);
            if(paper.questions[i].content.length === 0) {
                paper.questions.splice(action.questionId, 1);
            }
            return paper;
        case SET_QUESTION_TITLE:
            paper.questions[action.questionId].title = action.value;
            return paper;
        default:
            return state;
    }
}

var paperApp = combineReducers({
    paper: paperReducer,
    questions: questionsReducer
});

export default paperApp;