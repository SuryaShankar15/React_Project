import React,{useState,useRef,useEffect}  from 'react';
import { Formik } from 'formik';
import axios from"axios"
import { Redirect } from 'react-router';
import * as Yup from 'yup';
import {Link} from "react-router-dom"


const LoginForm = () => {
  
  const [mailExits,setmailExits]=useState(false)
  const [match,setmatch]=useState(false)
  const [errors,seterrors]=useState('')
  const Inputref=useRef(null)
  const [posts,setposts]=useState()
  const [link,setlink]=useState(false)
  const [posts1,setposts1]=useState()
  const [nextpage,setnextpage]=useState(false)
  useEffect(()=>{Inputref.current.focus()},[])


  return (
   
    <Formik
      initialValues={{  email: '', password: '' }}
      validationSchema={Yup.object({
       
       email: Yup.string()
          .required('Please Enter your Email')
          .matches(
            /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character" ),
        password: Yup.string()
          .required('Please Enter your Password')
          .matches(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%])(?=.{8,})",
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character" ),
            
        })}
      onSubmit={(values) => {


        setmatch(false)
        setmailExits(false)
        setnextpage(false)
        axios.post("http://localhost:5000/secret/login",values) 
        .then(res=>{  

       if(res.data ==="notExits"){
            setmailExits(true)
            seterrors("")
          }
          else if(res.data !=="matched"){
            setmatch(true)
            seterrors("")
            setlink(true)
            axios.get(`http://localhost:5000/secret/${values.email}`)
            .then(res=>{
              setposts(res.data._id)
                })
            .catch(error=>{console.log(error)
            
            })
           }
           else if(res.data ==="matched")
           {
            setposts1(values.email)
            setnextpage(true)       
           
           }
           
        } )
        .catch(error=>{
          seterrors("SOMETHING WENT WRONG"+error)
        })
    //    resetForm({})
        
      }}
    >
    
      {formik => (
        
    <div className="loginWrapper">
       <div className="loginJoinsec">
         <section className="loginFirstsec">

            <div>
            <h1>Hello!</h1>
            <p>Enter your details and start journey with us</p>
            <a href="/signup"><button>signup</button></a>
            </div>

            </section>
      <section className="login-form-wrapper">
            
         <h1>Login</h1>
        
        <form onSubmit={formik.handleSubmit}>
        
          <label htmlFor="email"></label>
          <input id="email" ref={Inputref} className= {formik.touched.email && formik.errors.email ?
          "errors":"loginEmail"}  type="email" placeholder="Email"
          {...formik.getFieldProps('email')} />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          )  :  (
            <div className="loginError">{ mailExits?"Email address not found":null}</div>) }
          

          <label htmlFor="password"></label>
          <input id="password" className={formik.touched.password && formik.errors.password ?"errors":"loginPassword"} 
          type="password" placeholder="Password"
          {...formik.getFieldProps('password')} />
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
      

          
          <div className="Login">
            <button type="submit">LOGIN</button>

            <div>
          
           {link? <Link to={`/forgetpassword/${posts}`} >Forgot Password</Link>:null}
           
           </div>
            <div className="signupError">{ match?"Email address and password do not match":null} 
            { errors?'SOMETHING WENT WRONG':null}
                { nextpage?<Redirect push to ={{pathname: `/register/${posts1}`}} >
               </Redirect>:null}  
            </div>
          </div>
          
        </form>
        </section>
    
        </div>
    
        </div>
      )}
      
    </Formik>
    
  );
};



export default LoginForm