import React from "react";
import "../../App.css";
import { Button } from "./Button";
import "../css/HeroSection.css";


function HeroSection() {
    return (
      <div className='hero-container'>
        {/* <video src = {video} autoPlay loop muted />
        <h1>ADVENTURE AWAITS</h1>
        <p>What are you waiting for</p> */}

        <p>
        Welcome to CareBridge your connection to a hospitalized loved one in Alberta.  This is your one stop for updates on your loved one's hospital stay.
        </p> 
        <br/>
        <p>Click the link below to get updates on your loved one</p>
        <div className="hero-btns">
          <Button
            className="btns"
            buttonStyle="btn--outline"
            buttonSize="btn--large"
            path= '/CareBridge'>
          Patient Updates
          </Button>
        </div>
      </div>
    );
  }


export default HeroSection;
