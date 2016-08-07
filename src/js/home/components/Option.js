import React, { Component, PropTypes } from 'react'

/**
 * 选项栏
 */

class Option extends Component{
    render() {
        let type = this.props.type;
        return <div className="input-group option">
            <span className="input-group-addon">
                <input type={type} checked={this.props.checked} />
            </span>
            <input type="text" className="form-control" placeholder={this.props.holder}
                  value={this.props.content}
                  onChange={(event) => this.setOptionTitle(event)}
            />
            <span className="input-group-btn">
                <button className="btn btn-default" type="button"
                        onClick={() => this.props.removeOption(this.props.questionId, this.props.optionId)}
                > Delete </button>
            </span>
        </div>
    }

    setOptionTitle(e) {
        this.props.setOptionTitle(this.props.questionId, this.props.optionId, e.target.value);
    }

}

module.exports = Option;
