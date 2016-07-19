var React = require('react');

var Option = React.createClass({
    render: function() {
        let type = this.props.type;
        console.log(type);
        return <div className={type}>
            <input type={type} checked={this.props.checked} />
            <input type="text" placeholder="选项"
                  value={this.props.content}
                  onChange={this.props.setTitle(this.props.questionId, this.props.optionId)} />
            <button className="action"
                   onClick={this.props.removeOption(this.props.questionId, this.props.optionId)} />
            </div>
    }

});

module.exports = Option;
