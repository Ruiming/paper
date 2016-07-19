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
                let count = paper.questions[i].content.length;
                paper.questions[i].content.push(`选项${count+1}`);
                return paper;
            })
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
                                                 setTitle={this.setTitleHandel}
                                                 addOption={this.addOptionHandel} />
                        }
                    }.bind(this))}
                </ul>
            </section>
            </div>
    }

});

ReactDOM.render(<Paper />, document.getElementById('index'));
