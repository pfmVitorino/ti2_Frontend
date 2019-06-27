import React, { Component } from 'react';
import './popUp.css'

class Popup extends Component{
    constructor(props){
    super(props);
    this.popupClose = this.popupClose.bind(this);
   
    }
   
    // chamar a função que fecha o popUp

    popupClose(){
      this.props.popupClose();

    }

   
    
    render(){
        return(
            <div className="Popup">
              <img src = {this.props.image} />
              <h1> {this.props.user}</h1>
              <h2> {this.props.date}</h2>
              <h2> {this.props.subtitle}</h2>
              <h2> {this.props.likes}</h2>
              
              {
                this.props.comments.map(
                    function(c){
                        // retorna todos os elementos 
                        // vai devolver o texto, o user e a data do comentário
                      return([
                          <h4>{c.text}</h4>,
                          <h4>{c.user.name}</h4>,
                          <h4>{c.postedAt}</h4>
                         
                      ]);
                     }.bind(this))
                
              }
              
              <button onClick={this.popupClose}>❌</button>
            
            </div>

        );
    }
}
export default Popup;