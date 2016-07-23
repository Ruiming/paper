webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(198);
	__webpack_require__(202);
	__webpack_require__(200);
	module.exports = __webpack_require__(201);


/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _redux = __webpack_require__(34);

	var _reactDom = __webpack_require__(47);

	var _reactRedux = __webpack_require__(186);

	var _reducer = __webpack_require__(195);

	var _reducer2 = _interopRequireDefault(_reducer);

	var _App = __webpack_require__(197);

	var _App2 = _interopRequireDefault(_App);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var initialState = {
	    paper: {
	        title: 'asd',
	        time: "2016-7-19",
	        author: "Ruiming"
	    },
	    questions: [{
	        title: '',
	        type: 'radio',
	        content: ['', '', '', '']
	    }, {
	        title: '',
	        type: 'checkbox',
	        content: ['', '', '', '']
	    }]
	};
	/**
	 * redux主要围绕store进行，只能有一个store，但作为reducer的paperApp可以合并多个reducer
	 * 每个reducer控制store不同部分,
	 * createStore传入两个参数，分别是reducer和初始对象，初始对象应该和reducer匹配
	 */
	var store = (0, _redux.createStore)(_reducer2.default, initialState);
	var rootElement = document.getElementById('index');
	(0, _reactDom.render)(_react2.default.createElement(
	    _reactRedux.Provider,
	    { store: store },
	    _react2.default.createElement(_App2.default, null)
	), rootElement);

/***/ },

/***/ 195:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _action = __webpack_require__(196);

	var _redux = __webpack_require__(34);

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	/**
	 * reducer，来源js数组的reduce功能，他接受一个初始状态和当前参数，返回一个新的状态
	 * 过程:
	 * 1. 用户在视图触发dispatch事件时
	 * 2. redux相应用户操作生成action(根据我们指定的action文件)
	 * 3. action传到store层，中间件可以在这一阶段做处理，比如记录日志
	 * 4. action传state和action给reducer处理
	 * 5. reducer返回一个新的state
	 * 6. store读取reducer返回的内容，设置为新的状态
	 *
	 * 注意：
	 * 1. action是唯一可以改变状态的途径，包括服务器来的推送和用户的触发，action进行预处理把脏数据筛选掉
	 * 2. store是redux的最核心部分，管理着整个应用的状态。
	 *    包括：应用状态初始化、状态修改、注册状态变化监听器、替换应用状态。
	 *    例如dispatch发送一个的动作
	 *    store.dispatch({
	 *      type: ADD_TODO,
	 *      msg: "This is a message."
	 *    })
	 *    发送一个动作直接传给reducer，reducer处理返回新的状态（或者返回原状态），store根据reducer返回的结果
	 *    设置新的state。
	 * 3. reducer进行模式匹配，匹配action.type后进行相应的处理
	 * 4. action和reducer都是纯函数，因为相同参数输入无数次他们都返回同样的东西，他不使用和处理外部变量，在reducer中我们应该使用返回
	 *    新的对象而不是在state上做修改，这样做的好处是在 react component 的 shouldComponentUpdate(nextProps, nextState) 里，
	 *    可以直接拿当前 props 跟 nextProps 做 === 对比，如果相等，说明不用更新，如果不相等，则更新到视图。
	 *    如果不是返回新 state，只是修改旧 state，我们就很难做到「回退/撤销」以及跟踪全局状态。
	 *    对比两个数据是否一致，也无法用 ===，而得用 deepEqual 深度遍历来对比值，很耗费性能。
	 */

	function questionsReducer() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	    var action = arguments[1];

	    switch (action.type) {
	        case _action.ADD_QUESTION:
	            return [].concat(_toConsumableArray(state), [{
	                title: '',
	                type: action.questionType,
	                content: ['', '', '', '']
	            }]);
	        case _action.REMOVE_QUESTION:
	            return [].concat(_toConsumableArray(state.slice(0, action.questionId)), _toConsumableArray(state.slice(action.questionId + 1)));
	        case _action.ADD_OPTION:
	        case _action.REMOVE_OPTION:
	        case _action.SET_QUESTION_TITLE:
	        case _action.SET_OPTION_TITLE:
	            return [].concat(_toConsumableArray(state.slice(0, action.questionId)), [questionReducer(state[action.questionId], action)], _toConsumableArray(state.slice(action.questionId + 1)));
	        default:
	            return state;
	    }
	}
	function paperReducer() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	    var action = arguments[1];

	    switch (action.type) {
	        case _action.SET_PAPER_TITLE:
	            return Object.assign({}, state, {
	                title: action.value
	            });
	        default:
	            return state;
	    }
	}
	function questionReducer() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	    var action = arguments[1];

	    var paper = state;
	    switch (action.type) {
	        case _action.ADD_OPTION:
	            paper.content.push('');
	            return paper;
	        case _action.REMOVE_OPTION:
	            paper.content.splice(action.optionId, 1);
	            return paper;
	        case _action.SET_QUESTION_TITLE:
	            paper.title = action.value;
	            return paper;
	        case _action.SET_OPTION_TITLE:
	            paper.content[action.optionId] = action.value;
	            return paper;
	        default:
	            return state;
	    }
	}

	var paperApp = (0, _redux.combineReducers)({
	    paper: paperReducer,
	    questions: questionsReducer
	});

	exports.default = paperApp;

/***/ },

/***/ 196:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.addQuestion = addQuestion;
	exports.setPaperTitle = setPaperTitle;
	exports.setQuestionTitle = setQuestionTitle;
	exports.setOptionTitle = setOptionTitle;
	exports.addOption = addOption;
	exports.removeQuestion = removeQuestion;
	exports.removeOption = removeOption;
	var ADD_QUESTION = exports.ADD_QUESTION = 'ADD_QUESTION';
	var SET_PAPER_TITLE = exports.SET_PAPER_TITLE = 'SET_PAPER_TITLE';
	var SET_QUESTION_TITLE = exports.SET_QUESTION_TITLE = 'SET_QUESTION_TITLE';
	var ADD_OPTION = exports.ADD_OPTION = 'ADD_OPTION';
	var REMOVE_QUESTION = exports.REMOVE_QUESTION = 'REMOVE_QUESTION';
	var REMOVE_OPTION = exports.REMOVE_OPTION = 'REMOVE_OPTION';
	var SET_OPTION_TITLE = exports.SET_OPTION_TITLE = 'SET_OPTION_TITLE';

	/**
	 * action可以对传参进行筛选，可以避免不必要的参数传入
	 * action返回一个plain object，必须包含type属性，然后reducer接收处理
	 *
	 */
	function addQuestion(type) {
	    return {
	        type: ADD_QUESTION,
	        questionType: type
	    };
	}
	function setPaperTitle(newTitle) {
	    return {
	        type: SET_PAPER_TITLE,
	        value: newTitle
	    };
	}
	function setQuestionTitle(questionId, newTitle) {
	    return {
	        type: SET_QUESTION_TITLE,
	        questionId: questionId,
	        value: newTitle
	    };
	}
	function setOptionTitle(questionId, optionId, newTitle) {
	    return {
	        type: SET_OPTION_TITLE,
	        questionId: questionId,
	        optionId: optionId,
	        value: newTitle
	    };
	}
	function addOption(questionId) {
	    return {
	        type: ADD_OPTION,
	        questionId: questionId
	    };
	}
	function removeQuestion(questionId) {
	    return {
	        type: REMOVE_QUESTION,
	        questionId: questionId
	    };
	}
	function removeOption(questionId, optionId) {
	    return {
	        type: REMOVE_OPTION,
	        questionId: questionId,
	        optionId: optionId
	    };
	}

/***/ },

/***/ 197:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(186);

	var _action = __webpack_require__(196);

	var _Header = __webpack_require__(198);

	var _Header2 = _interopRequireDefault(_Header);

	var _NewQuestionBar = __webpack_require__(199);

	var _NewQuestionBar2 = _interopRequireDefault(_NewQuestionBar);

	var _OptionsBar = __webpack_require__(200);

	var _OptionsBar2 = _interopRequireDefault(_OptionsBar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var App = function (_Component) {
	    _inherits(App, _Component);

	    function App() {
	        _classCallCheck(this, App);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(App).apply(this, arguments));
	    }

	    _createClass(App, [{
	        key: 'render',
	        value: function render() {
	            var _props = this.props;
	            var dispatch = _props.dispatch;
	            var title = _props.title;
	            var questions = _props.questions;

	            return _react2.default.createElement(
	                'div',
	                { ref: 'paper' },
	                _react2.default.createElement(_Header2.default, { title: title,
	                    setPaperTitle: function setPaperTitle(title) {
	                        return dispatch((0, _action.setPaperTitle)(title));
	                    }
	                }),
	                _react2.default.createElement(_NewQuestionBar2.default, { addQuestion: function addQuestion(type) {
	                        return dispatch((0, _action.addQuestion)(type));
	                    } }),
	                _react2.default.createElement(
	                    'section',
	                    { className: 'paper' },
	                    _react2.default.createElement(
	                        'ul',
	                        { className: 'paper-list' },
	                        questions.map(function (question, i) {
	                            return _react2.default.createElement(_OptionsBar2.default, { content: question.content,
	                                title: question.title,
	                                questionId: i,
	                                key: i,
	                                type: question.type,
	                                setOptionTitle: function setOptionTitle(questionId, optionId, newTitle) {
	                                    return dispatch((0, _action.setOptionTitle)(questionId, optionId, newTitle));
	                                },
	                                setQuestionTitle: function setQuestionTitle(questionId, newTitle) {
	                                    return dispatch((0, _action.setQuestionTitle)(questionId, newTitle));
	                                },
	                                removeQuestion: function removeQuestion(questionId) {
	                                    return dispatch((0, _action.removeQuestion)(questionId));
	                                },
	                                addQuestion: function addQuestion() {
	                                    return dispatch((0, _action.addQuestion)());
	                                },
	                                removeOption: function removeOption(questionId, optionId) {
	                                    return dispatch((0, _action.removeOption)(questionId, optionId));
	                                },
	                                addOption: function addOption(questionId) {
	                                    return dispatch((0, _action.addOption)(questionId));
	                                }
	                            });
	                        }.bind(this))
	                    )
	                )
	            );
	        }
	    }]);

	    return App;
	}(_react.Component);

	function select(state) {
	    return {
	        paper: state.paper,
	        questions: state.questions
	    };
	}

	exports.default = (0, _reactRedux.connect)(select)(App);

/***/ },

/***/ 198:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Header = function (_Component) {
	    _inherits(Header, _Component);

	    function Header() {
	        _classCallCheck(this, Header);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Header).apply(this, arguments));
	    }

	    _createClass(Header, [{
	        key: "render",
	        value: function render() {
	            var _this2 = this;

	            return _react2.default.createElement(
	                "div",
	                null,
	                _react2.default.createElement(
	                    "header",
	                    { className: "header" },
	                    _react2.default.createElement("input", { type: "text", className: "paper-title", placeholder: "请输入问卷标题",
	                        value: this.props.title,
	                        onChange: function onChange(e) {
	                            return _this2.setTitle(e);
	                        }
	                    })
	                )
	            );
	        }
	    }, {
	        key: "setTitle",
	        value: function setTitle(e) {
	            this.props.setPaperTitle(e.target.value);
	        }
	    }]);

	    return Header;
	}(_react.Component);

	module.exports = Header;

/***/ },

/***/ 199:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var NewQuestionBar = function (_Component) {
	    _inherits(NewQuestionBar, _Component);

	    function NewQuestionBar(props, context) {
	        _classCallCheck(this, NewQuestionBar);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NewQuestionBar).call(this, props, context));

	        _this.state = {
	            type: [{ text: 'radio', name: '单选题' }, { text: 'checkbox', name: '多选题', limit: 0 }]
	        };
	        return _this;
	    }

	    _createClass(NewQuestionBar, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { className: 'question-center' },
	                _react2.default.createElement(
	                    'ul',
	                    { className: 'questions' },
	                    this.state.type.map(function (type, i) {
	                        var _this2 = this;

	                        return _react2.default.createElement(
	                            'li',
	                            { key: i },
	                            _react2.default.createElement(
	                                'a',
	                                { href: 'javascript:;', onClick: function onClick() {
	                                        return _this2.props.addQuestion(type.text);
	                                    } },
	                                type.name
	                            )
	                        );
	                    }.bind(this))
	                )
	            );
	        }
	    }]);

	    return NewQuestionBar;
	}(_react.Component);

	module.exports = NewQuestionBar;

/***/ },

/***/ 200:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _Title = __webpack_require__(201);

	var _Title2 = _interopRequireDefault(_Title);

	var _Option = __webpack_require__(202);

	var _Option2 = _interopRequireDefault(_Option);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var OptionsBar = function (_Component) {
	    _inherits(OptionsBar, _Component);

	    function OptionsBar() {
	        _classCallCheck(this, OptionsBar);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(OptionsBar).apply(this, arguments));
	    }

	    _createClass(OptionsBar, [{
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            return _react2.default.createElement(
	                'section',
	                null,
	                _react2.default.createElement(_Title2.default, { title: this.props.title, setTitle: function setTitle(event) {
	                        return _this2.setQuestionTitle(event);
	                    }
	                }),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'option-action' },
	                    _react2.default.createElement(
	                        'button',
	                        { className: 'action',
	                            onClick: function onClick() {
	                                return _this2.props.addOption(_this2.props.questionId);
	                            }
	                        },
	                        'Add Option'
	                    ),
	                    _react2.default.createElement(
	                        'button',
	                        { className: 'action',
	                            onClick: function onClick() {
	                                return _this2.props.removeQuestion(_this2.props.questionId);
	                            }
	                        },
	                        'Remove Question'
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'option' },
	                    this.props.content.map(function (st, j) {
	                        return _react2.default.createElement(_Option2.default, { content: st,
	                            type: _this2.props.type,
	                            holder: '选项' + (j + 1),
	                            checked: false,
	                            setOptionTitle: _this2.props.setOptionTitle,
	                            setQuestionTitle: _this2.props.setQuestionTitle,
	                            removeOption: _this2.props.removeOption,
	                            questionId: _this2.props.questionId,
	                            optionId: j,
	                            key: j });
	                    })
	                )
	            );
	        }
	    }, {
	        key: 'setQuestionTitle',
	        value: function setQuestionTitle(e) {
	            var value = e.target.value;
	            this.props.setQuestionTitle(this.props.questionId, value);
	        }
	    }]);

	    return OptionsBar;
	}(_react.Component);

	module.exports = OptionsBar;

/***/ },

/***/ 201:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Title = function (_Component) {
	    _inherits(Title, _Component);

	    function Title() {
	        _classCallCheck(this, Title);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Title).apply(this, arguments));
	    }

	    _createClass(Title, [{
	        key: "render",
	        value: function render() {
	            return _react2.default.createElement(
	                "div",
	                { ref: "title", className: "title" },
	                _react2.default.createElement("input", { type: "text", placeholder: "请输入标题",
	                    value: this.props.title,
	                    onChange: this.props.setTitle })
	            );
	        }
	    }]);

	    return Title;
	}(_react.Component);

	module.exports = Title;

/***/ },

/***/ 202:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Option = function (_Component) {
	    _inherits(Option, _Component);

	    function Option() {
	        _classCallCheck(this, Option);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Option).apply(this, arguments));
	    }

	    _createClass(Option, [{
	        key: "render",
	        value: function render() {
	            var _this2 = this;

	            var type = this.props.type;
	            return _react2.default.createElement(
	                "div",
	                { className: type },
	                _react2.default.createElement("input", { type: type, checked: this.props.checked }),
	                _react2.default.createElement("input", { type: "text", placeholder: this.props.holder,
	                    value: this.props.content,
	                    onChange: function onChange(event) {
	                        return _this2.setOptionTitle(event);
	                    }
	                }),
	                _react2.default.createElement("button", { className: "action",
	                    onClick: function onClick() {
	                        return _this2.props.removeOption(_this2.props.questionId, _this2.props.optionId);
	                    }
	                })
	            );
	        }
	    }, {
	        key: "setOptionTitle",
	        value: function setOptionTitle(e) {
	            this.props.setOptionTitle(this.props.questionId, this.props.optionId, e.target.value);
	        }
	    }]);

	    return Option;
	}(_react.Component);

	module.exports = Option;

/***/ }

});