export const ADD_QUESTION = 'ADD_QUESTION';
export const SET_PAPER_TITLE = 'SET_PAPER_TITLE';
export const SET_QUESTION_TITLE = 'SET_QUESTION_TITLE';
export const ADD_OPTION = 'ADD_OPTION';
export const REMOVE_QUESTION = 'REMOVE_QUESTION';
export const REMOVE_OPTION = 'REMOVE_OPTION';
export const SET_OPTION_TITLE = 'SET_OPTION_TITLE';

export function addQuestion(type) {
    return {
        type: ADD_QUESTION,
        questionType: type
    }
}
export function setPaperTitle(newTitle) {
    return {
        type: SET_PAPER_TITLE,
        value: newTitle
    }
}
export function setQuestionTitle(questionId, newTitle) {
    return {
        type: SET_QUESTION_TITLE,
        questionId: questionId,
        value: newTitle
    }
}
export function setOptionTitle(questionId, optionId, newTitle) {
    return {
        type: SET_OPTION_TITLE,
        questionId: questionId,
        optionId: optionId,
        value: newTitle
    }
}
export function addOption(questionId) {
    console.log(questionId);
    return {
        type: ADD_OPTION,
        questionId: questionId
    }
}
export function removeQuestion(questionId) {
    return {
        type: REMOVE_QUESTION,
        questionId: questionId
    }
}
export function removeOption(questionId, optionId) {
    return {
        type: REMOVE_OPTION,
        questionId: questionId,
        optionId: optionId
    }
}
