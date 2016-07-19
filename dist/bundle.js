webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(173);
	__webpack_require__(176);
	__webpack_require__(174);
	module.exports = __webpack_require__(175);


/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);
	var ReactDOM = __webpack_require__(34);
	var Header = __webpack_require__(173);
	var RadioBar = __webpack_require__(174);

	var PaperContent = {
	    title: "问卷",
	    time: "2016-7-19",
	    author: "Ruiming",
	    questions: [{
	        title: '问题1',
	        type: 'radio',
	        content: ["选项1", "选项2", "选项3", "选项4"]
	    }, {
	        title: '问题2',
	        type: 'radio',
	        content: ["选项1", "选项2", "选项3", "选项4"]
	    }]
	};

	/**
	 * 问卷设计制作
	 */

	var Paper = React.createClass({
	    displayName: 'Paper',

	    getInitialState: function getInitialState() {
	        return {
	            PaperContent: PaperContent
	        };
	    },

	    setTitleHandel: function setTitleHandel(i, j) {
	        return function (hash, event) {
	            this.setState(function () {
	                console.log(event, hash, i, j);
	                return PaperContent;
	            });
	        }.bind(this);
	    },

	    render: function render() {
	        return React.createElement(
	            'div',
	            { ref: 'paper' },
	            React.createElement(Header, { title: PaperContent.title }),
	            React.createElement(
	                'section',
	                { className: 'paper' },
	                React.createElement(
	                    'ul',
	                    { className: 'paper-list' },
	                    PaperContent.questions.map(function (question, i) {
	                        switch (question.type) {
	                            case 'radio':
	                                return React.createElement(RadioBar, { content: question.content,
	                                    title: question.title,
	                                    questionId: i,
	                                    key: i,
	                                    setTitle: this.setTitleHandel });
	                        }
	                    }.bind(this))
	                )
	            )
	        );
	    }

	});

	ReactDOM.render(React.createElement(Paper, null), document.getElementById('index'));

/***/ },

/***/ 173:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);

	var Header = React.createClass({
	    displayName: 'Header',


	    getInitialState: function getInitialState() {
	        return {
	            title: '问卷1'
	        };
	    },

	    render: function render() {
	        return React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'header',
	                { className: 'header' },
	                React.createElement('input', { className: 'paper-title', placeholder: '问卷标题', defaultValue: this.state.title })
	            )
	        );
	    }
	});

	module.exports = Header;

/***/ },

/***/ 174:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);
	var Title = __webpack_require__(175);
	var Radio = __webpack_require__(176);

	var RadioBar = React.createClass({
	    displayName: 'RadioBar',


	    render: function render() {
	        var _this = this;

	        return React.createElement(
	            'section',
	            null,
	            React.createElement(Title, { title: this.props.title }),
	            React.createElement(
	                'div',
	                { className: 'radio' },
	                this.props.content.map(function (st, j) {
	                    return React.createElement(Radio, { content: st.content,
	                        checked: st.checked,
	                        setTitle: _this.props.setTitle,
	                        questionId: _this.props.questionId,
	                        optionId: j,
	                        key: j });
	                })
	            )
	        );
	    }
	});

	module.exports = RadioBar;

/***/ },

/***/ 175:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);

	var Title = React.createClass({
	    displayName: 'Title',

	    getInitialState: function getInitialState() {
	        return {
	            title: ''
	        };
	    },

	    changeHandel: function changeHandel(event) {
	        this.setState({ title: event.target.value });
	    },

	    render: function render() {
	        return React.createElement(
	            'div',
	            { ref: 'title', className: 'title' },
	            React.createElement('input', { type: 'text', placeholder: '请输入标题',
	                defaultValue: this.state.title,
	                onChange: this.changeHandel })
	        );
	    }

	});

	module.exports = Title;

/***/ },

/***/ 176:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);

	var Radio = React.createClass({
	    displayName: "Radio",

	    render: function render() {
	        return React.createElement(
	            "div",
	            { className: "radio" },
	            React.createElement("input", { type: "radio", checked: this.props.checked }),
	            React.createElement("input", { type: "text", placeholder: "选项",
	                value: this.props.content,
	                onChange: this.props.setTitle(this.props.questionId, this.props.optionId) })
	        );
	    }

	});

	module.exports = Radio;

/***/ }

});