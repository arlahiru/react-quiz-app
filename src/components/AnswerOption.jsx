import React, { Component } from 'react';

function AnswerOption(props) {

    return (    
    <li className="answerOption">
        <input
        type="radio"
        className="radioCustomButton"
        name="radioGroup"
        /*checked={props.answerType === props.answer}*/
        id={props.answerKey}
        value={props.answerKey}
        onChange={props.onAnswerSelected}
        />
         <label className={props.selectedAnswer ? props.answerKey == props.correctAnswerKey ? "radioCustomLabelWCorrectAnswer":props.selectedAnswer==props.answerKey? "radioCustomLabelWrongAnswer":"radioCustomLabel" :"radioCustomLabel"} htmlFor={props.answerKey}>{props.answerContent}</label>
    </li>);
}
 
export default AnswerOption;