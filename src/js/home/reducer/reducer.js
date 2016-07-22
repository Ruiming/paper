import { ADD_QUESTION, ADD_OPTION, SET_PAPER_TITLE, SET_QUESTION_TITLE, SET_OPTION_TITLE,
         REMOVE_OPTION, REMOVE_QUESTION } from '../action/action'
import { combineReducers } from 'redux'

/**
 * reducer，来源js数组的reduce功能，他接受一个初始状态和当前参数，返回一个新的状态
 * 过程:
 * 1. 用户在视图触发dispatch事件时
 * 2. redux相应用户操作生成action(根据我们指定的action文件)
 * 3. action传到store层，中间件可以在这一阶段做处理，比如记录日志
 * 4. action传state和action给reducer处理
 * 5. reducer返回一个新的state
 * 6. store读取reducer返回的内容，设置为新的状态
 *
 * 注意：
 * 1. action是唯一可以改变状态的途径，包括服务器来的推送和用户的触发，action进行预处理把脏数据筛选掉
 * 2. store是redux的最核心部分，管理着整个应用的状态。
 *    包括：应用状态初始化、状态修改、注册状态变化监听器、替换应用状态。
 *    例如dispatch发送一个的动作
 *    store.dispatch({
 *      type: ADD_TODO,
 *      msg: "This is a message."
 *    })
 *    发送一个动作直接传给reducer，reducer处理返回新的状态（或者返回原状态），store根据reducer返回的结果
 *    设置新的state。
 * 3. reducer进行模式匹配，匹配action.type后进行相应的处理
 * 4. action和reducer都是纯函数，因为相同参数输入无数次他们都返回同样的东西，他不使用和处理外部变量，在reducer中我们应该使用返回
 *    新的对象而不是在state上做修改，这样做的好处是在 react component 的 shouldComponentUpdate(nextProps, nextState) 里，
 *    可以直接拿当前 props 跟 nextProps 做 === 对比，如果相等，说明不用更新，如果不相等，则更新到视图。
 *    如果不是返回新 state，只是修改旧 state，我们就很难做到「回退/撤销」以及跟踪全局状态。
 *    对比两个数据是否一致，也无法用 ===，而得用 deepEqual 深度遍历来对比值，很耗费性能。
 */

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
    let paper = state;
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
