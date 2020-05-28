import React,{Component} from "react"
import {Link} from "react-router-dom"
import axios from"axios"
import Moment from 'moment';

const Register = props => (

    <tr>
        
        <td>{props.register.email}</td>
        <td>{props.register.course}</td>
        <td>{props.register.duration}</td>
        
    <td>{Moment(new Date(props.register.date.substring(0,10)).toISOString(true)).add(1, 'days').calendar() }</td>
        <td className="register_list_button">
            <Link to={"/edit/"+props.register._id}>edit</Link> |
             <button onClick={()=>{props.deleteRegister(props.register._id)}}>delete</button>
        </td>
    </tr>
    
)

export default class RegisterList extends Component{
    constructor(props){
        super(props)

        this.state={registers:[],course:2}
    }

    componentDidMount(){
        axios.get(`http://localhost:5000/Yoga_register/${this.props.match.params._mail}`)
        .then(response=>{
         this.setState({
            registers:response.data
               })
            })
        .catch(error=>{console.log(error)
        
        })

           
    }

    deleteRegister=(id)=>{
        axios.delete("http://localhost:5000/Yoga_register/"+id)
           .then(res=>res.data)

        this.setState({
            registers:this.state.registers.filter(el=>el._id!==id)
        })
    }
    
    RegistersList=()=>{
        
     return this.state.registers.map(currentregister=>{
     return <Register register={currentregister} deleteRegister={this.deleteRegister} key={currentregister._id}/>
      })
    }

    render(){
        return(

            <div id="body">
         
            <div id="page_list">
             <div className="topNaviagationLink"><a href="http://127.0.0.1:5500/public/assets/home.html">Home</a></div>
             <div className="topNaviagationLink"><a href="http://127.0.0.1:5500/public/assets/yoga_main.html">About</a></div>
             <div className="topNaviagationLink"><a href="http://127.0.0.1:5500/public/assets/contact.html">Contact</a></div>
             <div className="topNaviagationLink"><Link to={"/register/"+this.props.match.params._mail}>Register</Link> </div>
             <div className="topNaviagationLink1"><Link to={"/registerlist/"+this.props.match.params._mail}>RegisterList</Link> </div>
   
            
         </div>
         <div className="contentBox_list">
             <div className="innerBox_list">
                     <h3>Classes you registered</h3>
                    
                     <table >
                    <thead >
                        <tr>
                            <th>Email</th>
                            <th>Course</th>
                            <th>Duration</th>
                            <th>Date</th>

                        </tr>
                    </thead>
                    <tbody>
                        {this.RegistersList()}
                    </tbody>
                </table>
            </div>
            </div>  
    
        </div>
       
        )
    }
}