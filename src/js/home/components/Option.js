import React, { Component, PropTypes } from 'react'

/**
 * 选项栏
 */

class Option extends Component{
    render() {
        let type = this.props.type;
        return <div className={type}>
            <input type={type} checked={this.props.checked} />
            <input type="text" placeholder={this.props.holder}
                  value={this.props.content}
                  onChange={(event) => this.setOptionTitle(event)}
            />
            <button className="action"
                   onClick={() => this.props.removeOption(this.props.questionId, this.props.optionId)}
            />
            </div>
    }

    setOptionTitle(e) {
        this.props.setOptionTitle(this.props.questionId, this.props.optionId, e.target.value);
    }

}

module.exports = Option;
