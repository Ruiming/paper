import React, { Component, PropTypes } from 'react'

class Header extends Component{
    render() {
        return <div>
            <header className="header">
                <input type="text" className="paper-title" placeholder="请输入问卷标题"
                       value={this.props.title}
                       onChange={(e) => this.setTitle(e)}
                />
            </header>
        </div>
    }

    setTitle(e) {
        this.props.setPaperTitle(e.target.value);
    }
}

module.exports = Header;
