import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addQuestion, addOption, setPaperTitle, setQuestionTitle, setOptionTitle, removeQuestion, removeOption } from '../action/action'
import Header from '../components/Header'
import NewQuestionBar from '../components/NewQuestionBar'
import OptionsBar from '../components/OptionsBar'

class App extends Component {
    render() {
        const { dispatch, title, questions } = this.props;
        return <div ref="paper" className="container">
            <div className="page-header">
                <h1>问卷发布系统</h1>
            </div>
            <Header title={title}
                    setPaperTitle={(title) => dispatch(setPaperTitle(title))} />
            <NewQuestionBar row="2" addQuestion={(type) => dispatch(addQuestion(type))} />
            <div className="col-md-10">
                <ul className="list-group">
                    {questions.map(function(question, i) {
                        return <OptionsBar content={question.content}
                                           title={question.title}
                                           questionId={i}
                                           key={i}
                                           type={question.type}
                                           setOptionTitle={(questionId, optionId, newTitle) => dispatch(setOptionTitle(questionId, optionId, newTitle))}
                                           setQuestionTitle={(questionId, newTitle) => dispatch(setQuestionTitle(questionId, newTitle))}
                                           removeQuestion={(questionId) => dispatch(removeQuestion(questionId))}
                                           addQuestion={() => dispatch(addQuestion())}
                                           removeOption={(questionId, optionId) => dispatch(removeOption(questionId, optionId))}
                                           addOption={(questionId) => dispatch(addOption(questionId))}
                        />
                    }.bind(this))
                    }
                </ul>
            </div>
        </div>
    }
}

function select(state) {
    return {
        paper: state.paper,
        questions: state.questions
    }
}

export default connect(select)(App);
