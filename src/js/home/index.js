var React = require('react');
var ReactDOM = require('react-dom');
var Header = require('./components/Header');
var NewQuestionBar = require('./components/NewQuestionBar');
var OptionsBar = require('./components/OptionsBar');


var PaperContent = {
    title: "问卷",
    time: "2016-7-19",
    author: "Ruiming",
    questions: [{
        title: '问题1',
        type: 'radio',
        content: ['', '', '', '']
    }, {
        title: '问题2',
        type: 'checkbox',
        content: ['','','','']
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

    _outputState: function() {
        console.log(PaperContent);
    },

    /**
     *
     * 更改选项标题
     * @param i 问题号
     * @param j 选项号
     * @returns {function(this:Paper)}
     */
    setTitleHandel: function(i, j) {
        return function(event){
            let value = event.target.value;
            this.setState(function(){
                let paper = PaperContent;
                paper.questions[i].content[j] = value;
                return paper;
            });
        }.bind(this);
    },

    addOptionHandel: function(i) {
        return function() {
            this.setState(function() {
                let paper = PaperContent;
                paper.questions[i].content.push('');
                return paper;
            })
        }.bind(this);
    },

    addQuestionHandel: function(type) {
        return function() {
            this.setState(function () {
                let paper = PaperContent;
                let question = {
                    title: "请输入标题",
                    type: type,
                    content: ['', '', '', '']
                };
                paper.questions.push(question);
                return paper;
            });
        }.bind(this)
    },

    removeQuestionHandel: function(i) {
        return function() {
            this.setState(function() {
                let paper = PaperContent;
                paper.questions.splice(i, 1);
                return paper;
            })
        }.bind(this);
    },

    removeOptionHandel: function(i, j) {
        return function() {
            this.setState(function() {
                let paper = PaperContent;
                paper.questions[i].content.splice(j, 1);
                if(paper.questions[i].content.length == 0) {
                    paper.questions.splice(i, 1);
                }
                return paper;
            });
        }.bind(this);
    },

    render: function() {
        return <div ref="paper">
            <Header title={PaperContent.title} />
            <NewQuestionBar addQuestion={this.addQuestionHandel}
            />
            <section className="paper">
                <ul className="paper-list">
                    {PaperContent.questions.map(function(question, i) {
                        return <OptionsBar content={question.content}
                                           title={question.title}
                                           questionId={i}
                                           key={i}
                                           type={question.type}
                                           setTitle={this.setTitleHandel}
                                           removeQuestion={this.removeQuestionHandel}
                                           addQuestion={this.addQuestionHandel}
                                           removeOption={this.removeOptionHandel}
                                           addOption={this.addOptionHandel} />
                        }.bind(this))
                    }
                </ul>
            </section>
            </div>
    }

});

ReactDOM.render(<Paper />, document.getElementById('index'));
