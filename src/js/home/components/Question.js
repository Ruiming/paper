import React, { Component, PropTypes } from 'react'
import Option from './Option'

/**
 * 题目栏
 */
class Question extends Component{

    setQuestionTitle(e) {
        let value = e.target.value;
        this.props.setQuestionTitle(this.props.questionId, value);
    }

    render() {
        let part = {
            fill : <label className="checkbox-inline">
                <input type="checkbox" checked={this.props.question.fill}
                       onChange={() => this.props.modifyQuestion(this.props.questionId, {fill: !this.props.question.fill})} /> 必填
            </label>,
            min: <div className="form-inline">
                <label htmlFor="number">至少选:&nbsp;&nbsp;</label>
                <input type="number" id="number" className="form-control"
                       value={this.props.question.min || 2}
                       min="2"
                       max={this.props.question.max || this.props.question.content.length}
                       onChange={(event, key)=>this.modifyQuestion(event, 'min')}
                />
            </div>,
            max: <div className="form-inline">
                <label htmlFor="number">最多选:&nbsp;&nbsp;</label>
                <input type="number" id="number" className="form-control"
                       value={this.props.question.max || this.props.question.content.length}
                       min="2"
                       max={this.props.question.content.length}
                       onChange={(event, key)=>this.modifyQuestion(event, 'max')}
                />
            </div>,
            newOption: <div className="question-manage btn-group-vertical col-xs-2">
                <button className="btn btn-default"
                        onClick={() => this.props.addOption(this.props.questionId)}>
                    新增选项
                </button>
            </div>
        };
        return <li className="list-group-item row question">
            <div ref="title" className="question-title input-group col-xs-12">
                <input type="text" placeholder="请输入标题"
                       className="form-control"
                       value={this.props.question.title}
                       onChange={(event) => this.setQuestionTitle(event)} />
                <span className="input-group-btn">
                            <button className="btn btn-default" type="button" disabled={this.props.questionId === 0}
                                    onClick={() => this.changeOrder(-1)}>
                                <span className="glyphicon glyphicon-arrow-up" />
                            </button>
                            <button className="btn btn-default" type="button" disabled={this.props.questionId === this.props.count - 1}
                                    onClick={() => this.changeOrder(1)}>
                                <span className="glyphicon glyphicon-arrow-down" />
                            </button>
                            <button className="btn btn-default" type="button"
                                    onClick={() => this.props.removeQuestion(this.props.questionId)}>
                                <span className="glyphicon glyphicon-remove" />
                            </button>
                </span>
            </div>
            <div className="options col-xs-10">
                {this.props.question.content.map((st, j) => {
                    return <Option content={st}
                                   count={this.props.question.content.length}
                                   type={this.props.question.type}
                                   holder={`选项${j+1}`}
                                   checked={false}
                                   changeOrder={this.props.changeOrder}
                                   setOptionTitle={this.props.setOptionTitle}
                                   setQuestionTitle={this.props.setQuestionTitle}
                                   removeOption={this.props.removeOption}
                                   questionId={this.props.questionId}
                                   optionId={j}
                                   key={j} />;
                })}
            </div>
            {this.props.type !== 'textarea' && part.newOption}
            <div className="option-action form-horizontal col-xs-2">
                {this.props.type === 'checkbox' && part.max}
                {this.props.type === 'checkbox' && part.min}
                {part.fill}
            </div>
        </li>
    }

    modifyQuestion(event, key) {
        let obj = {};
        obj[key] = event.target.value;
        this.props.modifyQuestion(this.props.questionId, obj);
    }

    changeOrder(dir) {
        this.props.changeOrder(this.props.questionId, dir);
    }

}

export default Question
