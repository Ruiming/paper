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
                                   type={this.props.question.type}
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
                return <div className="option-action btn-group-vertical col-xs-2">
                    <div className="form-group">
                        <label htmlFor="number">限选:</label>
                        <input type="number" id="number" className="form-control"
                               value={this.props.question.max || this.props.question.content.length}
                               min="2"
                               max={this.props.question.content.length}
                               onChange={(event)=>this.modifyCheckboxMax(event)}
                        />
                    </div>
                </div>
                }
            })()}
        </li>
    }

    modifyCheckboxMax(event) {
        let obj = {max: event.target.value};
        this.props.modifyQuestion(this.props.questionId, obj);
    }

}

module.exports = OptionsBar;
