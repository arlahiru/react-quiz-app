import React, { Component } from 'react';

function ActionButtonBar(props){

    return (
    <div style={{overflow:"auto"}}>
        <div style={{float:"right"}}>
            <button type="button" id="prevBtn" onClick={props.handleSubmit}>Submit</button>
            <button type="button" id="nextBtn" onClick={props.handleNext}>Next</button>
        </div>
   </div>
  )
};

export default ActionButtonBar;