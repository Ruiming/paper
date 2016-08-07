import { ADD_QUESTION, ADD_OPTION, SET_PAPER_TITLE, SET_QUESTION_TITLE, SET_OPTION_TITLE, MODIFY_QUESTION,
         REMOVE_OPTION, REMOVE_QUESTION } from '../action/action'
import _ from 'underscore'
import { combineReducers } from 'redux'

function questionsReducer(state=[], action) {
    let paper = [];
    _.extend(paper, state);
    switch(action.type) {
        case ADD_QUESTION:
            paper.push({
                title: '',
                type: action.questionType,
                content: ['','','','']
            });
            return paper;
        case REMOVE_QUESTION:
            return _.filter(paper, (value, index) => {
                return index !== action.questionId;
            });
        case MODIFY_QUESTION:
            _.map(action.options, (value, key)=>{
                paper[action.questionId][key] = value;
            });
            return paper;
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
