import React, { Component, PropTypes } from 'react'
var Title = require('./Title');
var Option = require('./Option');

class OptionsBar extends Component{
    render() {
        return <section>
            <Title title={this.props.title} setTitle={(event) => this.setQuestionTitle(event)}
            />
            <div className="option-action">
                <button className="action"
                        onClick={() => this.props.addOption(this.props.questionId)}
                    >
                    Add Option
                </button>
                <button className="action"
                        onClick={() => this.props.removeQuestion(this.props.questionId)}
                    >
                    Remove Question
                </button>
            </div>
            <div className="option">
                {this.props.content.map((st, j) => {
                    return <Option content={st}
                                   type={this.props.type}
                                   holder={`选项${j+1}`}
                                   checked={false}
                                   setOptionTitle={this.props.setOptionTitle}
                                   setQuestionTitle={this.props.setQuestionTitle}
                                   removeOption={this.props.removeOption}
                                   questionId={this.props.questionId}
                                   optionId={j}
                                   key={j} />;
                })}
            </div>
        </section>
    }

    setQuestionTitle(e) {
        let value = e.target.value;
        this.props.setQuestionTitle(this.props.questionId, value);
    }
}

module.exports = OptionsBar;
