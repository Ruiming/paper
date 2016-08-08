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
        return <li className="list-group-item row question">
            <div ref="title" className="title col-xs-12">
                <input type="text" placeholder="请输入标题"
                       className="form-control"
                       value={this.props.question.title}
                       onChange={(event) => this.setQuestionTitle(event)}/>
            </div>
            <div className="col-xs-10">
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
            <div className="option-action btn-group-vertical col-xs-2">
                <button className="btn btn-default"
                        onClick={() => this.props.addOption(this.props.questionId)}
                >
                    新增选项
                </button>
                <button className="btn btn-default"
                        onClick={() => this.props.removeQuestion(this.props.questionId)}
                >
                    删除问题
                </button>
            </div>
            {(() => {
                if(this.props.type === 'checkbox') {
                    return <div className="option-action form-horizontal col-xs-2">
                    <div className="form-inline">
                        <label htmlFor="number">最多选:&nbsp;&nbsp;</label>
                        <input type="number" id="number" className="form-control"
                               value={this.props.question.max || this.props.question.content.length}
                               min="2"
                               max={this.props.question.content.length}
                               onChange={(event, key)=>this.modifyCheckboxMax(event, 'max')}
                        />
                    </div>
                    <div className="form-inline">
                        <label htmlFor="number">至少选:&nbsp;&nbsp;</label>
                        <input type="number" id="number" className="form-control"
                               value={this.props.question.min || 2}
                               min="2"
                               max={this.props.question.max || this.props.question.content.length}
                               onChange={(event, key)=>this.modifyCheckboxMax(event, 'min')}
                        />
                    </div>
                </div>
                }
            })()}
        </li>
    }

    modifyCheckboxMax(event, key) {
        let obj = {};
        obj[key] = event.target.value;
        this.props.modifyQuestion(this.props.questionId, obj);
    }

}

export default Question
