var React = require('react');
var Title = require('./Title');
var Radio = require('./Radio');

var RadioBar = React.createClass({

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
                <button className="action"
                        onClick={this.props.addQuestion('radio')}>
                    Add Radio Question
                </button>
            </div>
            <div className="radio">
                {this.props.content.map((st, j) => {
                    return <Radio content={st}
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

module.exports = RadioBar;
