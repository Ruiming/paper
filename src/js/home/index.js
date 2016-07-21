var React = require('react');
var Header = require('./components/Header');
var NewQuestionBar = require('./components/NewQuestionBar');
var OptionsBar = require('./components/OptionsBar');

import { createStore } from 'redux'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import paperApp from './reducer/reducer'
import App from './containers/App'

let store = createStore(paperApp);
let rootElement = document.getElementById('index');
render (
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
);

//console.log(store.getState());
//let unsubscribe = store.subscribe(() => console.log(store.getState()));
//store.dispatch(addQuestion());
//unsubscribe();
// todo 使用redux

var PaperContent = {
    title: '',
    time: "2016-7-19",
    author: "Ruiming",
    questions: [{
        title: '',
        type: 'radio',
        content: ['', '', '', '']
    }, {
        title: '',
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
        return function(event) {
            let value = event.target.value;
            this.setState(function(){
                let paper = PaperContent;
                paper.questions[i].content[j] = value;
                return paper;
            });
        }.bind(this);
    },

    setPaperTitleHandel: function() {
        return function(event) {
            let value = event.target.value;
            this.setState(function() {
                let paper = PaperContent;
                paper.title = value;
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
                    title: '',
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
            <Header title={PaperContent.title} setPaperTitle={this.setPaperTitleHandel} />
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

