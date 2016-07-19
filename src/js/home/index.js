var React = require('react');
var ReactDOM = require('react-dom');
var Header = require('./components/Header');
var RadioBar = require('./components/RadioBar');


var PaperContent = {
    title: "问卷",
    time: "2016-7-19",
    author: "Ruiming",
    questions: [{
        title: '问题1',
        type: 'radio',
        content: [
            "选项1",
            "选项2",
            "选项3",
            "选项4"
        ]
    }, {
        title: '问题2',
        type: 'radio',
        content: [
            "选项1",
            "选项2",
            "选项3",
            "选项4"
        ]
    }]
};

/**
 * 问卷设计制作
 */

var Paper = React.createClass({
    getInitialState: function() {
        return {
            PaperContent: PaperContent
        }
    },

    setTitleHandel: function(i, j) {
        return function(hash, event){
            this.setState(function(){
                console.log(event, hash, i, j);
                return PaperContent;
            });
        }.bind(this);
    },

    render: function() {
        return <div ref="paper">
            <Header title={PaperContent.title} />
            <section className="paper">
                <ul className="paper-list">
                    {PaperContent.questions.map(function(question, i) {
                        switch(question.type) {
                            case 'radio':
                                return <RadioBar content={question.content}
                                                 title={question.title}
                                                 questionId={i}
                                                 key={i}
                                                 setTitle={this.setTitleHandel} />
                        }
                    }.bind(this))}
                </ul>
            </section>
            </div>
    }

});

ReactDOM.render(<Paper />, document.getElementById('index'));
