var React = require('react');

var Title = React.createClass({
    getInitialState: function() {
        return {
            title: ''
        }
    },

    changeHandel: function(event) {
        this.setState({title: event.target.value})
    },

    render: function() {
        return <div ref="title" className="title">
                <input type="text" placeholder="请输入标题"
                       defaultValue={this.state.title}
                       onChange={this.changeHandel}/>
            </div>
    }

});

module.exports = Title;
