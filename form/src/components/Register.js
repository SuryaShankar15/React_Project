import React,{Component} from "react"
import axios from"axios"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Idletime from "./idle_timer"
import {Link} from "react-router-dom"



var isValid1=true
export default class CreateRegister extends Component{
    
    constructor(props){
        super(props)
        
        this.inputref = React.createRef();
        this.state={
            email:this.props.match.params._mail,
            course:"",
            duration:0,
            date:null,
            courseError:"",
            durationError:"",
            dateError:"",
            dataMatch:[],
            dataMatchVar:"", 
          
        }
    }


    componentDidMount()
        {
            this.inputref.current.focus()
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
       if(this.state.date==null )
       {
        dateError="Please select the Date"
       }
       else
       {
           this.setState({dateError:""}) 
       }

       if(courseError || durationError || dateError ){
           this.setState({courseError,durationError,dateError})
           return false;
       }
            return true;
    }



    validate1=()=>{
        let dataMatchError=""
        if( this.state.dataMatchVar==="same")
        {
         dataMatchError="You have registered a class on same date,Please select different Date "
        }
        else
        {
            this.setState({dataMatchError:""}) 
     
        }
        if( dataMatchError){
            this.setState({dataMatchError})
            return false;
        }
             return true;
     }


    onSubmit=(e)=>{
        e.preventDefault()
        const isValid=this.validate()
        if (isValid){
            axios.get(`http://localhost:5000/Yoga_register/${this.props.match.params._mail}`)
            .then(response=>{
             this.setState({
                dataMatch:response.data
                   })
                this.setState({
                    dataMatchVar:""
                      })
                   isValid1=true
                   this.state.dataMatch.map(currentregister=>{

                    if(currentregister.date===(this.state.date).toISOString(true)){
                       this.setState({
                        dataMatchVar:"same"
                       })
                         this.validate1()
                        isValid1=false
                    }
                    return true
                   })
                   if(isValid1)   {  
                    const RegisterNew={
                        email:this.props.match.params._mail,
                        course:this.state.course,
                        duration:this.state.duration,
                        date:(this.state.date).toISOString(true)
                    }
            
                    axios.post("http://localhost:5000/Yoga_register/register",RegisterNew)
                    .then(res=>res.data)
                    .catch(err=>console.log(err))
                
                    window.location=`/registerlist/${this.props.match.params._mail}`
                }
                })
            .catch(error=>{console.log(error)
            
            }
            )

    }

    }

    render(){
        var mail=this.props.match.params._mail
      
    return(
       

     <div id="body">
         <Idletime></Idletime>
       
       <div id="page">
        <div className="topNaviagationLink"><a href="http://127.0.0.1:5500/public/assets/home.html">Home</a></div>
        <div className="topNaviagationLink"><a href="http://127.0.0.1:5500/public/assets/yoga_main.html">About</a></div>
        <div className="topNaviagationLink"><a href="http://127.0.0.1:5500/public/assets/contact.html">Contact</a></div>
        <div className="topNaviagationLink1"><Link to={"/register/"+this.props.match.params._mail}>Register</Link> </div>
        <div className="topNaviagationLink"><Link to={"/registerlist/"+this.props.match.params._mail}>RegisterList</Link> </div>
          
       
	</div>
    <div className="contentBox">
    	<div className="innerBox">
                <h3>Register Now!! for free online Yoga classes</h3>
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
                      <div style={{ fontSize:12 ,color:"red"}}> {this.state.dataMatchError}</div>
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