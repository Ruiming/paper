var React = require('react');

var Header = React.createClass({

    getInitialState: function() {
        return {
            title: '问卷1'
        }
    },

    render: function() {
        return <div>
            <header className="header">
                <input className="paper-title" placeholder="问卷标题" defaultValue={this.state.title} />
            </header>
        </div>
    }
});

module.exports = Header;
