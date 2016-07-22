import React, { Component, PropTypes } from 'react'

class NewQuestionBar extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            type: [
                {text: 'radio', name: '单选题'},
                {text: 'checkbox', name: '多选题', limit: 0},
            ]
        };
    }

    render() {
        return <div className="question-center">
            <ul className="questions">
                {this.state.type.map(function(type, i) {
                    return <li key={i}>
                                <a href='javascript:;' onClick={() => this.props.addQuestion(type.text)} >{type.name}</a>
                        </li>;
                }.bind(this))}
            </ul>
        </div>
    }

}

module.exports = NewQuestionBar;
