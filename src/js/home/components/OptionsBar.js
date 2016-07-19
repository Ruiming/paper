var React = require('react');
var Title = require('./Title');
var Option = require('./Option');

var OptionsBar = React.createClass({

    render: function() {
        return <section>
            <Title title={this.props.title} />
            <div className="option-action">
                <button className="action"
                        onClick={this.props.addOption(this.props.questionId)}>
                    Add Option
                </button>
                <button className="action"
                        onClick={this.props.removeQuestion(this.props.questionId)}>
                    Remove Question
                </button>
            </div>
            <div className="option">
                {this.props.content.map((st, j) => {
                    return <Option content={st}
                                   type={this.props.type}
                                   checked={false}
                                   setTitle={this.props.setTitle}
                                   removeOption={this.props.removeOption}
                                   questionId={this.props.questionId}
                                   optionId={j}
                                   key={j} />;
                })}
            </div>
        </section>
    }
});

module.exports = OptionsBar;
