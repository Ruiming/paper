import React, { Component, PropTypes } from 'react'

/**
 * 问卷创建问题栏
 */

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
        return  <div className="btn-group-vertical col-md-2 question">
                {this.state.type.map(function(type, i) {
                    return  <a href='javascript:;' className="btn btn-default" key={i}
                           onClick={() => this.props.addQuestion(type.text)} >
                            {type.name}
                        </a>;
                }.bind(this))}
            </div>
    }

}

module.exports = NewQuestionBar;
