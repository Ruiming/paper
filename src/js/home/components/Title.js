var React = require('react');

var Title = React.createClass({
    render: function() {
        return <div ref="title" className="title">
                <input type="text" placeholder="请输入标题"
                       value={this.props.title}
                       onChange={this.props.setTitle}/>
            </div>
    }

});

module.exports = Title;
