var React = require('react');

var Radio = React.createClass({
    render: function() {
       return <div className="radio">
           <input type="radio" checked={this.props.checked} />
           <input type="text" placeholder="选项"
                  value={this.props.content}
                  onChange={this.props.setTitle(this.props.questionId, this.props.optionId)} />
           </div>
    }

});

module.exports = Radio;
