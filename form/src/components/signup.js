import React,{useState,useEffect,useRef} from 'react';
import { Formik } from 'formik';
import { Redirect } from 'react-router';
import axios from"axios"
import * as Yup from 'yup';


const SignupForm = () => {
  const [match,setmatch]=useState(true)
  const [errors,seterrors]=useState('')
  const [submitDisabled,setsubmitDisabled]=useState(false)
  
  const Inputref=useRef(null)
  useEffect(()=>{Inputref.current.focus()},[])


 
  return (
  
     
    <Formik
    
      initialValues={{ firstName: '', lastName: '', email: '', password: '',confirmPassword: '' }}
      
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Please Enter your First Name'),
        lastName: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .required('Please Enter your Last Name'),
       email: Yup.string()
          .required('Please Enter your Email')
          .matches(
            /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
            "Please enter valid email address" ),
        password: Yup.string()
          .required('Please Enter your Password')
          .matches(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%])(?=.{8,})",
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character" ),
       confirmPassword:Yup.string()
       .required('Please Enter your confirm Password')
       .oneOf([Yup.ref('password'), null], 'Passwords must match')
       
                 
        })}
      onSubmit={(values) => {
       
        setsubmitDisabled(false)
        axios.post("http://localhost:5000/secret/signupadd",values)
        .then(res=>{
         
          if(res.data ==="user not exits"){
            console.log(res.data)
            setmatch(true)
            seterrors("")
            setsubmitDisabled(true)
 
          }
          else
            {
              setmatch(false)
              console.log("user not added")
              seterrors("")
            } }
         )
        .catch(function (error) {             
          seterrors("SOMETHING WENT WRONG"+error)
        });
     //   resetForm({})
      }}
    >
 
      {formik => (
        
    <div className="signupWrapper">
    
        
          <div className="signup-form-wrapper ">

          <h1>Create your Account</h1>
        <form onSubmit={formik.handleSubmit}>
        

          <label htmlFor="firstName"></label>
          <input id="firstName" ref={Inputref} className= {formik.touched.firstName && formik.errors.firstName ?
          "errors":"firstName"}  type="text" placeholder="First Name"
          {...formik.getFieldProps('firstName')} />
          {formik.touched.firstName  && formik.errors.firstName ? (
            <div className="error">{formik.errors.firstName}</div>
          ) : null}



          <label htmlFor="lastName"></label>
          <input id="lastName" className= {formik.touched.lastName && formik.errors.lastName ?"errors":"lastName"} 
          type="text" placeholder="Last Name"
          {...formik.getFieldProps('lastName')} />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div className="error">{formik.errors.lastName}</div>
          ) : null}



          <label htmlFor="email"></label>
          <input id="email" className= {formik.touched.email && formik.errors.email ?"errors":"email"} 
           type="email" placeholder="Email"
          {...formik.getFieldProps('email')} />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) :  (
            <div className="error">{ match?null:"Email address already registered"}</div>) }
       
          

          

          <label htmlFor="password"></label>
          <input id="password" className={formik.touched.password && formik.errors.password ?"errors":"password"} 
          type="password" placeholder="Password"
          {...formik.getFieldProps('password')} />
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
         

      
           <label htmlFor="confirmPassword"></label>
          <input id="confirmPassword" className={formik.touched.confirmPassword && formik.errors.confirmPassword ?"errors":"confirmPassword"} 
           type="password" placeholder="Confirm Password"
          {...formik.getFieldProps('confirmPassword')} />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="error">{formik.errors.confirmPassword}</div>
          ) : null}
        

          
          <div className="createAccount">


        { submitDisabled?<Redirect push to ={ { data: (formik.values ), pathname: "/secret"}} >
        <button  type="submit" >Create Account</button>
        </Redirect>:<button  type="submit" >Create Account</button>}


            <a href="/login" ><small>Already Have an Account?</small></a>
            <div className="signupError">
            {  errors?'SOMETHING WENT WRONG':null}
           
            </div> 
          </div>
        </form>
        </div>
      </div>

      )}
      
    </Formik>
        
  );
};



export default SignupForm