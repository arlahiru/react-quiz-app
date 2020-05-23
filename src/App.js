import React, { Component } from 'react';
import quizQuestions from './api/quizQuestions';
import Quiz from './components/Quiz';
import Result from './components/Result';
import logo from './svg/logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      selectedAnswer: '',
      onSelectAnswer: '',
      correctAnswerKey: '',
      answersCount: {},
      result: 0
    };

    this.onAnswerSelected = this.onAnswerSelected.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

  componentDidMount() {
    const shuffledAnswerOptions = quizQuestions.map(question =>
      this.shuffleArray(question.answers)
    );
    this.setState({
      question: quizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0],
      correctAnswerKey: quizQuestions[0].correctAnswerKey
    });
  }

  shuffleArray(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  onAnswerSelected(event) {
    this.state.onSelectAnswer = event.currentTarget.value;
  }

  handleNext(event) {
    if(this.state.selectedAnswer)   { 
      if (this.state.questionId < quizQuestions.length) {
        setTimeout(() => this.setNextQuestion(), 300);
      } else {
        setTimeout(() => this.setResults(this.getResults()), 300);
      }
    }else{
      alert("Please submit your answer before go to next question")
    }
  }

  handleSubmit(event) {
    if(this.state.selectedAnswer)   { 
      alert("You have already submit your answer. Please go to next question.")
    }
    else if(this.state.onSelectAnswer)   { 
      this.setUserAnswer(this.state.onSelectAnswer);
    }else {
      alert("Please select an answer to submit")
    }
  }

  setUserAnswer(answer) {
    this.setState((state, props) => ({
      answersCount: {
        ...state.answersCount,
        [answer]: (state.answersCount[answer] || 0) + 1
      },
      selectedAnswer: answer
    }));
    if(answer == this.state.correctAnswerKey){
      this.state.result += 20;
    }
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answerOptions: quizQuestions[counter].answers,
      correctAnswerKey: quizQuestions[counter].correctAnswerKey,
      selectedAnswer: '',
      onSelectAnswer : ''
    });
  }

  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map(key => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);

    return answersCountKeys.filter(key => answersCount[key] === maxAnswerCount);
  }

  setResults(result) {
    if (result.length === 1) {
      this.setState({ result: result[0] });
    } else {
      this.setState({ result: 'Undetermined' });
    }
  }

  renderQuiz() {
    return (
      <Quiz
        onSelectAnswer = {this.state.onSelectAnswer}
        selectedAnswer={this.state.selectedAnswer}
        answerOptions={this.state.answerOptions}
        correctAnswerKey={this.state.correctAnswerKey}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={quizQuestions.length}
        onAnswerSelected={this.onAnswerSelected}
        handleNext={this.handleNext}
        handleSubmit={this.handleSubmit}
      />
    );
  }

  renderResult() {
    return <Result quizResult={this.state.result} />;
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>සිංහල Quiz App</h2>
        </div>
        {this.state.questionId == 5 ? this.renderResult() : this.renderQuiz()}
      </div>
    );
  }

}

export default App;
