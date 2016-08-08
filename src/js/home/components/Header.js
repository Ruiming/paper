import React, { Component, PropTypes } from 'react'

/**
 * 问卷抬头部分
 */

class Header extends Component{
    render() {
        return <div className="row form-horizontal paper">
                <label className="control-label col-md-2" htmlFor="paper-title">问卷标题:</label>
                <div className="col-md-10">
                    <input type="text" className="form-control"
                           placeholder="请输入问卷标题"
                           id="paper-title" value={this.props.title}
                           onChange={(e) => this.setTitle(e)}
                    />
                </div>
        </div>
    }

    setTitle(e) {
        this.props.setPaperTitle(e.target.value);
    }
}

export default Header
