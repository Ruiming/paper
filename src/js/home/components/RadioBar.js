var React = require('react');
var Title = require('./Title');
var Radio = require('./Radio');

var RadioBar = React.createClass({

    render: function() {
        return <section>
            <Title title={this.props.title} />
            <div className="radio">
                {this.props.content.map((st, j) => {
                    return <Radio content={st.content}
                                  checked={st.checked}
                                  setTitle={this.props.setTitle}
                                  questionId={this.props.questionId}
                                  optionId={j}
                                  key={j} />;
                })}
            </div>
        </section>
    }
});

module.exports = RadioBar;
