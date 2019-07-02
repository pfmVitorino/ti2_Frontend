import React, { Component } from 'react';
import axios from 'axios';
import Photograph from './Photograph';
import Popup from './Popup';
import './PaginaInicial.css';


class PaginaInicial extends Component {
    constructor(props) {
        super(props);
        // criar estados
        this.state = {
            posts: [],
            ShowPopup: false,
            ShowImage: {},
            text: '',
            Username: '',
            Password: '',
            isauthenticated: false

        }
        // sempre que clik correr o this tem de fazer referencia ao this da pagina principal
        this.Click = this.Click.bind(this);
        this.popupClose = this.popupClose.bind(this);
        this.searchBy = this.searchBy.bind(this);
        this.Change = this.Change.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.MyCommentSub = this.MyCommentSub.bind(this);
        this.PutLike= this.PutLike.bind(this);
    

    }
    async componentDidMount() {
       this.getPosts();
        

        
 
    }
    // funcao para filtar os dados
    async searchBy(evt) {
        evt.preventDefault()
        let response = await axios.get('https://ipt-ti2-iptgram.azurewebsites.net/api/posts?query=' + this.state.text);

        let postArray = response.data;
        // o setState faz com que a pagina inicial seja obrigada a renderizar de novo.(Sempre)
        this.setState({
            posts: postArray,
            text: ''
        });

    }

    async getPosts(){
        let response = await axios.get('https://ipt-ti2-iptgram.azurewebsites.net/api/posts');
        

        let postArray = response.data;


        // mudar o estado do objecto
        this.setState({
            posts: postArray
        });

    }



    // função que permite clicar na image e aparecer as informações
    async Click(id) {
        let srt = 'https://ipt-ti2-iptgram.azurewebsites.net/api/posts/' + id
        let response = await axios.get(srt);

        let obj = {
            idpost : id,
            image: "https://ipt-ti2-iptgram.azurewebsites.net/api/posts/" + id + "/image",
            user: response.data.user.name,
            date: response.data.postedAt,
            subtitle: response.data.caption,
            likes: response.data.likes,
            //comments : response.data.comments

        };

        let commentsResponse = await axios.get('https://ipt-ti2-iptgram.azurewebsites.net/api/posts/' + id + '/comments')

        obj.comments = commentsResponse.data;

        this.setState({


            ShowImage: obj,
            ShowPopup: true



        });
    }
    // função para fechar o popUp
    popupClose() {
        this.setState({
            ShowPopup: false
        })

    }

    // função para a pesquisa
    // target.name vai buscar o name dos inptus
    Change(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }
    // função para o login
    // login com as credencias fornecidas pelo professor
    async login(evt) {
        evt.preventDefault();
        let obj = {
            "userName": this.state.Username,
            "password": this.state.Password,


        }
        let response = await axios.post('https://ipt-ti2-iptgram.azurewebsites.net/api/account/login', obj, {
            withCredentials: true,
            crossdomain: true,
            headers: {
                "Content-Type": "application/json"
            }
        });

        // caso a autenticação tenha sucesso
        if (response.status === 200) {

            this.setState({
                Username: '',
                Password: '',
                isauthenticated: true

            })
        }


        console.log(response);

    }

    // função para o logout

    async logout(evt) {
        evt.preventDefault();
        let obj = {
            "userName": this.state.Username,
            "password": this.state.Password,



        }
        let response = await axios.post('https://ipt-ti2-iptgram.azurewebsites.net/api/account/logout', obj, {
            withCredentials: true,
            crossdomain: true,
            headers: {
                "Content-Type": "application/json"
            }
        });
        this.setState({
        isauthenticated : false })
    }

     async MyCommentSub(comment,idpost){
         let obj = {
          "postId" : idpost,
          "text" : comment
         };

         let response = await axios.post('https://ipt-ti2-iptgram.azurewebsites.net/api/comments',obj,{
             withCredentials : true,
             crossdomain : true,
             headers: {
                "Content-Type": "application/json"
             }
         })


// fazer o pedido para os comentários ao post
       this.Click(idpost);
    }
// função para meter like nos posts
    async PutLike(idpost){

        let response = await axios.post('https://ipt-ti2-iptgram.azurewebsites.net/api/posts/'+idpost+'/like',null,{
        withCredentials : true,
        crossdomain : true,
        headers: {
           "Content-Type": "application/json"
    }});
    //atualiza todos os posts da API
    this.getPosts();
}
    // renderizar
    render() {

        return (
            <div className="PaginaInicial">


                {
                    (this.state.isauthenticated) ?

                        <form className="PaginaInicial-Logout" onSubmit={this.logout}>
                            <button type="submit" >Logout</button>
                        </form>
                        :

                        <center>
                            <form className="PaginaInicial-Login" onSubmit={this.login}>
                                <input type="text" name="Username" onChange={this.Change} value={this.state.Username} />
                                <input type="password" name="Password" onChange={this.Change} value={this.state.Password} />
                                <button type="submit">Login</button>




                            </form>

                            <h1>📷 IPTGRAM 📷</h1>
                            <h2>Pedro Vitorino 17902 </h2>
                            <h2>Guilherme Silva 19113 </h2>


                        </center>


                }

                {

                    this.state.posts.map(function (p) {

                        if (this.state.isauthenticated) {

                            // retorna todos os elementos 
                            return (

                                <div className="PaginaInicial-show">
                                    <form className="SearchBox" onSubmit={this.searchBy}>
                                        <input placeholder="Search..." name="text" onChange={this.Change} value={this.state.text} />

                                        <button type="submit">🔍</button>

                                    </form>

                                    <h2>{"👤 "}{p.user.name}</h2>
                                    <h3>{p.caption}</h3>
                                    <Photograph id={p.id} Click={this.Click} />
                                    <h3>{"📅 "}{p.postedAt.substring(0, p.postedAt.indexOf("T"))}</h3>
                                   <button onClick={()=>this.PutLike(p.id)}>{"👍 " +p.likes}</button>
                                </div>


                            )
                        };

                    }.bind(this))





                }
                {
                    // as 2 coisas têm de ser verdade para ele renderizar o popup
                    this.state.ShowPopup && <Popup image={this.state.ShowImage.image}
                        user={this.state.ShowImage.user}
                        date={this.state.ShowImage.date}
                        subtitle={this.state.ShowImage.subtitle}
                        likes={this.state.ShowImage.likes}
                        comments={this.state.ShowImage.comments}
                        popupClose={this.popupClose}
                        MyCommentSub={this.MyCommentSub}
                        idpost ={this.state.ShowImage.idpost}
                    />
                }


            </div>

        );
    }


}
export default PaginaInicial;