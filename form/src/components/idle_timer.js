import React,{useRef,useState} from 'react'
import IdleTimer from "react-idle-timer"
import Modal from "react-modal"
import { Redirect } from 'react-router';

Modal.setAppElement("#root")
function Idletime ()
{

   
    const [isloggedin,setisloggedin]=useState(true)
    const [ismodalopen,setismodalopen]=useState(false)
    const idletimerref = useRef(null)
    const sessionTimeoutRef1=useRef(null)


    const onidlefun=()=>{
        setismodalopen(true)
        sessionTimeoutRef1.current=setTimeout(Logout,10000)
    }
    const Logout=()=>{
        setismodalopen(false)
        setisloggedin(false)
        clearTimeout(sessionTimeoutRef1.current)
    }
   const Stayactive=()=>{
       setismodalopen(false )
      clearTimeout(sessionTimeoutRef1.current)
   }

    return(

        <div>
            
               {isloggedin ? null:<Redirect push to ={{pathname: "/login" }} >
               </Redirect>}
            
        
  <div className="" >
        <Modal isOpen={ismodalopen} onRequestClose={()=>setismodalopen(false)}  
           className="modal"  
            style={
                {
                content:{
                color:"black"
                }
            }
            }>
            <h2>you have been idle for some while</h2>
            <p>you will be logged out after 10 sec if you are idle</p>
            <div className="ModalButton">
                <button onClick={Logout}>Log me out</button>
                <button onClick={Stayactive}>keep me signed in</button>
            </div>
        </Modal>
   

        </div>
     
      

        <div>
            <IdleTimer ref={idletimerref} timeout={20*1000} onIdle={onidlefun}></IdleTimer>
        </div>
        </div>

    )


}

export default Idletime



