import React, { Component } from 'react';
import axios from 'axios';
import './Photograph.css';

class Photograph extends Component {
    constructor(props){
        super(props);
        this.Click = this.Click.bind(this);
    }
    Click(){
        // aceder à propriedade na Página principal
        this.props.Click(this.props.id);
    }
render (){

    return(

        // retornar a imagem
        // Ao clicar na imagem vai aparecer os detalhes de cada utilizador
    <div className = "Photograph" >
            <img src={'https://ipt-ti2-iptgram.azurewebsites.net/api/posts/' + this.props.id + '/image'}onClick={this.Click} />
    </div>
    );
   }

}
export default Photograph;