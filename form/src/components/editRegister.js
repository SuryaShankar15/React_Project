import React,{Component} from "react"
import axios from"axios"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Idletime from "./idle_timer"
import {Link} from "react-router-dom"

export default class EditRegister extends Component{
    constructor(props){
        super(props)
        
        this.inputref = React.createRef();
        this.state={
            email:"",
            course:"",
            duration:0,
            date:null
        }
    }


componentDidMount(){

    this.inputref.current.focus()

    axios.get("http://localhost:5000/Yoga_register/edits/"+this.props.match.params.id)
        .then(response=>{
            this.setState({
                email:response.data.email,
                course:response.data.course,
                duration:response.data.duration,
                date:new Date(response.data.date)

            })
        }).catch(function(err){
            console.log(err)
        })
}


onChangeCourse=(e)=>{
    this.setState({
        course:e.target.value
    })
}
onChangeDuration=(e)=>{
    this.setState({
        duration:e.target.value
    })
}
onChangeDate=(date)=>{
    this.setState({
        date:date
    })
}



validate=()=>{
 
   let  courseError,durationError,dateError=""
   if (this.state.course==="")
   {
    courseError="Please select the Course" 
   }
   else
    {
        this.setState({courseError:""}) 
    }

   if( this.state.duration<=0 ||  this.state.duration>11)
   {
    durationError="Duration should be between 1 to 10" 
   }
   else
   {
       this.setState({durationError:""}) 
   }
   if(this.state.date==null)
   {
    dateError="Please select the Date"
   }
   else
   {
       this.setState({dateError:""}) 
   }


   if(courseError || durationError || dateError){
       this.setState({courseError,durationError,dateError})
       return false;
   }
        return true;
}


onSubmit=(e)=>{
    e.preventDefault()
    const isValid=this.validate()
    if (isValid){

    const RegisterNew={
        email:this.state.email,
        course:this.state.course,
        duration:this.state.duration,
        date:this.state.date


    }


        axios.post("http://localhost:5000/Yoga_register/update/"+this.props.match.params.id,RegisterNew)
        .then(res=>(res.data))
        .catch(err=>console.log(err))
       window.location=`/register/${this.state.email}`
        
    }
}

    render(){
        var mail=this.state.email
        return(

     <div id="body">
          <Idletime></Idletime>
       <div id="page">
        <div className="topNaviagationLink"><a href="http://127.0.0.1:5500/public/assets/home.html">Home</a></div>
        <div className="topNaviagationLink"><a href="http://127.0.0.1:5500/public/assets/yoga_main.html">About</a></div>
        <div className="topNaviagationLink"><a href="http://127.0.0.1:5500/public/assets/contact.html">Contact</a></div>
        <div className="topNaviagationLink"><Link to={"/register/"+this.state.email}>Register</Link> </div>
        <div className="topNaviagationLink"><Link to={"/registerlist/"+this.state.email}>RegisterList</Link> </div>
       
	</div>
    <div className="contentBox">
    	<div className="innerBox">
                <h3>Edit your Registration</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="RegisterForm">
                  
                    <div  className="RegisterElem">
                       
                        <label>Email: </label>
                        <input type="email"
                        required               
                        value={mail}
                        disabled
                     />
  
                   </div>
                   
                   <div className="RegisterElem">
                        <label>Course:</label>
                        <select id = "dropdown" 
                         ref = {this.inputref}  
                        value={this.state.course}
                        onChange={this.onChangeCourse}>
                            <option  value="">N/A</option>
                            <option value="Raja Yoga">Raja Yoga</option>
                            <option value="Bhakti Yoga">Bhakti Yoga</option>
                            <option value="Karma Yoga">Karma Yoga</option>
                            <option value="Jnana Yoga">Jnana Yoga</option>
                        </select>


                      <div style={{ fontSize:12 ,color:"red"}}> {this.state.courseError}</div>
                        
                    </div>

                   <div  className="RegisterElem">
                        <label>Duration (in Hours): </label>
                        <input type="number"                     
                        value={this.state.duration}
                        onChange={this.onChangeDuration} />
                  <div style={{ fontSize:12 ,color:"red"}}>  {this.state.durationError}</div>
                    
                  </div>

                  <div  className="RegisterElem">
                        <label>Date:</label>
                                
                            <DatePicker id="datepicker"
                                 selected={this.state.date}
                                 dateFormat="MM/dd/yyyy"
                                 minDate={new Date()}
                                 filterDate={date=>date.getDay()!==6 &&
                                    date.getDay()!==0}
                                onChange={this.onChangeDate}
                                />
                      <div style={{ fontSize:12 ,color:"red"}}> {this.state.dateError}</div>
                 </div>
                

                 <div  className="RegisterElem">
                    <div className="RegisterSubmit">
                      <button type="submit" value="Create Register">SUBMIT</button>
                      </div>
                      </div>
               
                  </div>
                </form>
                
                </div>
                </div>
              
            <div id="footer"><a href="http://127.0.0.1:5500/public/assets/home.html">Yoga All Rights Reserved</a> 
           </div>
            </div>
        )
    }
}