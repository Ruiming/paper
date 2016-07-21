import React, { Component, PropTypes } from 'react'

class Title extends Component {
    render() {
        return <div ref="title" className="title">
                <input type="text" placeholder="请输入标题"
                       value={this.props.title}
                       onChange={this.props.setTitle}/>
            </div>
    }

}

module.exports = Title;
