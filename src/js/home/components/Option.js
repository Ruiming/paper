import React, { Component, PropTypes } from 'react'

/**
 * 选项栏
 */

class Option extends Component{
    render() {
        let type = this.props.type;
        switch(type) {
            case 'radio':
            case 'checkbox':
                return <div className="input-group option">
                <span className="input-group-addon">
                    <input type={type} checked={this.props.checked}/>
                </span>
                    <input type="text" className="form-control" placeholder={this.props.holder}
                           value={this.props.content}
                           onChange={(event) => this.setOptionTitle(event)}/>
                    <span className="input-group-btn">
                    <button className="btn btn-default" type="button" disabled={this.props.optionId === 0}
                            onClick={() => this.changeOrder(-1)}>
                        <span className="glyphicon glyphicon-arrow-up"/>
                    </button>
                    <button className="btn btn-default" type="button"
                            disabled={this.props.optionId === this.props.count - 1} onClick={() => this.changeOrder(1)}>
                        <span className="glyphicon glyphicon-arrow-down"/>
                    </button>
                    <button className="btn btn-default" type="button" disabled={this.props.count <= 2}
                            onClick={() => this.props.removeOption(this.props.questionId, this.props.optionId)}>
                        <span className="glyphicon glyphicon-remove"/>
                    </button>
                </span>
                </div>;
            case 'textarea':
                return <textarea className="form-control" placeholder="供用户填写" rows="3" readOnly="readOnly" />;
            default:
                return null;
        }
    }

    changeOrder(dir) {
        this.props.changeOrder(this.props.questionId, 0, this.props.optionId, dir);
    }

    setOptionTitle(e) {
        this.props.setOptionTitle(this.props.questionId, this.props.optionId, e.target.value);
    }

}

export default Option
