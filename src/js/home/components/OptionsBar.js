import React, { Component, PropTypes } from 'react'
import Option from './Option'

/**
 * 题目栏
 */
class OptionsBar extends Component{

    setQuestionTitle(e) {
        let value = e.target.value;
        this.props.setQuestionTitle(this.props.questionId, value);
    }

    render() {
        return <section className="row">
            <div ref="title" className="title form-group col-xs-12">
                <input type="text" placeholder="请输入标题"
                       className="form-control"
                       value={this.props.title}
                       onChange={(event) => this.setQuestionTitle(event)}/>
            </div>
            <div className="option-action btn-group-vertical col-xs-4">
                <button className="btn btn-default"
                        onClick={() => this.props.addOption(this.props.questionId)}
                    >
                    Add Option
                </button>
                <button className="btn btn-default"
                        onClick={() => this.props.removeQuestion(this.props.questionId)}
                    >
                    Remove Question
                </button>
            </div>
            <div className="option col-xs-8">
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

}

module.exports = OptionsBar;
