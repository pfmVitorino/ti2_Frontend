import React, {Component} from 'react';
import axios from 'axios';
import Photograph from './Photograph';
import Popup from './Popup';


class PaginaInicial extends Component{
    constructor(props){
         super(props);

         this.state = {
             posts: [],
             ShowPopup: false,
             ShowImage : {}
         }
         // sempre que clik correr o this tem de fazer referencia ao this da pagina principal
         this.Click = this.Click.bind(this);

    }
   async componentDidMount(){
      let response = await axios.get('https://ipt-ti2-iptgram.azurewebsites.net/api/posts');
      //console.log(response.data[0].caption);

     let postArray = response.data;

     
     // mudar o estado do objecto
     this.setState({
         posts: postArray
     });

    }

  
   
 // função que permite clicar na image e aparecer as informações
   async Click(id){
        let srt = 'https://ipt-ti2-iptgram.azurewebsites.net/api/posts/'+id
        let response = await axios.get(srt);

        let obj = {
            image :  "https://ipt-ti2-iptgram.azurewebsites.net/api/posts/"+id+"/image",
            user : response.data.user.name,
            date : response.data.postedAt,
            subtitle: response.data.caption,
            likes : response.data.likes
         
        };
   this.setState({


  ShowImage : obj,  
  ShowPopup: true

   })

    }
    render (){
        
              return(
            <div className="PaginaInicial">
           {
               this.state.posts.map(function(p){
                  // retorna todos os elementos 
                return([
                    <h1>{p.caption}</h1>,
                    <Photograph id = {p.id} Click={this.Click}/>,
                    <h2>{p.user.name}</h2>,
                    <h2>{p.postedAt.substring(0,p.postedAt.indexOf("T"))}</h2>,
                    <h2>{p.likes}</h2>,
                    <h4>{p.comments}</h4>
                   
                ]);
               }.bind(this))

              
               
            
            
           }
           {
               // as 2 coisas têm de ser verdade para ele renderizar o popup
                this.state.ShowPopup && <Popup image = {this.state.ShowImage.image}
                user = {this.state.ShowImage.user}
                date =  {this.state.ShowImage.date}
                subtitle = {this.state.ShowImage.subtitle}
                likes= {this.state.ShowImage.likes}
                />
           }
           
           
             </div>   
        );
    }


}
export default PaginaInicial;