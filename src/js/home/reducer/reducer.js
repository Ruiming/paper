import { ADD_QUESTION, ADD_OPTION, SET_PAPER_TITLE, SET_QUESTION_TITLE, SET_OPTION_TITLE,
         REMOVE_OPTION, REMOVE_QUESTION } from '../action/action'
import { combineReducers } from 'redux'

function questionsReducer(state=[], action) {
    switch(action.type) {
        case ADD_QUESTION:
            return [
                ...state,
                {
                    title: '',
                    type: action.questionType,
                    content: ['','','','']
                }
            ];
        case REMOVE_QUESTION:
            return [
                ...state.slice(0, action.questionId),
                ...state.slice(action.questionId+1)
            ];
        case ADD_OPTION:
        case REMOVE_OPTION:
        case SET_QUESTION_TITLE:
        case SET_OPTION_TITLE:
            return [
                ...state.slice(0, action.questionId),
                questionReducer(state[action.questionId], action),
                ...state.slice(action.questionId+1)
            ];
        default:
            return state;
    }
}
function paperReducer(state=[], action) {
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
    let paper = Object.assign({}, state);
    switch(action.type) {
        case ADD_OPTION:
            paper.content.push('');
            return paper;
        case REMOVE_OPTION:
            paper.content.splice(action.optionId, 1);
            return paper;
        case SET_QUESTION_TITLE:
            paper.title = action.value;
            return paper;
        case SET_OPTION_TITLE:
            paper.content[action.optionId] = action.value;
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
