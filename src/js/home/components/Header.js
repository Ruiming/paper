var React = require('react');

var Header = React.createClass({

    render: function() {
        return <div>
            <header className="header">
                <input className="paper-title" placeholder="请输入问卷标题"
                       value={this.props.title}
                       onChange={this.props.setPaperTitle()} />
            </header>
        </div>
    }
});

module.exports = Header;
