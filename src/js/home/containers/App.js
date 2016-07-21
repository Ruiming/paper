import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addQuestion, addOption, setPaperTitle, setQuestionTitle, removeOption, removeQuestion } from '../action/action'
var Header = require('../components/Header');
var NewQuestionBar = require('../components/NewQuestionBar');
var OptionsBar = require('../components/OptionsBar');

class App extends Component {
    render() {
        console.log(this.props);
        const { dispatch, title, questions } = this.props;
        return <div ref="paper">
            <Header title={title}
                    setPaperTitle={(title) => dispatch(setPaperTitle(title))}
                />
            <NewQuestionBar addQuestion={(type) => dispatch(addQuestion(type))} />
            <section className="paper">
                <ul className="paper-list">
                    {questions.map(function(question, i) {
                        return <OptionsBar content={question.content}
                                           title={question.title}
                                           questionId={i}
                                           key={i}
                                           type={question.type}
                                           setTitle={(questionId) => dispatch(setQuestionTitle(questionId))}
                                           removeQuestion={(questionId) => dispatch(removeQuestion(questionId))}
                                           addQuestion={() => dispatch(addQuestion())}
                                           removeOption={(questionId, optionId) => dispatch(removeOption(questionId, optionId))}
                                           addOption={(questionId) => dispatch(addOption(questionId))}
                        />
                    }.bind(this))
                    }
                </ul>
            </section>
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
