import React, { Component } from 'react';
import './popUp.css'

// classe resposável pela aparecimento do popup quando se clica na imagem
class Popup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            NewComment : ''
        }
        this.popupClose = this.popupClose.bind(this);
        this.MyCommentSub = this.MyCommentSub.bind(this);
        this.MyComment = this.MyComment.bind(this);

    }

    // chamar a função que fecha o popUp

    popupClose() {
        this.props.popupClose();

    }

// criar um novo comentário
MyComment (evt){
    this.setState ({
        NewComment: evt .target.value
    });
}

MyCommentSub (evt){
    evt.preventDefault();
    this.props.MyCommentSub(this.state.NewComment,this.props.idpost);
    this.setState({
        NewComment: ''
    })
}


    render() {
        return (
            <div className="Popup">
                <img src={this.props.image} />
                <h1>{"👤 "} {this.props.user}</h1>
                <h2>{"📅 "} {this.props.date.substring(0, this.props.date.indexOf("T"))}</h2>
                <h2> {}{this.props.subtitle}</h2>
                <h2>{"👍 "} {this.props.likes}</h2>
               

                {
                    this.props.comments.map(
                        function (c) {
                            // retorna todos os elementos 
                            // vai devolver o texto, o user e a data do comentário
                            return ([
                                <center>
                                    <table width="280" cellspacing="1" cellpadding="3" border="5" bgcolor="white">
                                        <tr>
                                            <td>
                                                <h4>{"📝"}{c.text}</h4>
                                            </td>
                                        </tr>
                                        <h4>{c.user.name}</h4>
                                        <h4>{c.postedAt.substring(0, this.props.date.indexOf("T"))}</h4>
                                       
                                    </table>


                                   


                                </center>
                            ]);
                        }.bind(this))
                     // botão para fechar o popop
                }
                
                <form onSubmit = {this.MyCommentSub}> 
                    <input className="comment" type="text" value ={this.state.NewComment} onChange = {this.MyComment} placeholder="Write your comment..."/>
                </form>
                <button onClick={this.popupClose}>❌</button>


            </div>

        );
    }
}
export default Popup;