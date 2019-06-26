import React, { Component } from 'react';

class Popup extends Component{
    render(){
        return(
            <div className="Popup">
              <img src = {this.props.image} />
              <h1> {this.props.user}</h1>
              <h2> {this.props.date}</h2>
              <h2> {this.props.subtitle}</h2>
              <h2> {this.props.likes}</h2>
            </div>

        );
    }
}
export default Popup;