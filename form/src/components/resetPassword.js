import React,{useState} from 'react';
import { Formik } from 'formik';
import axios from"axios"
import * as Yup from 'yup';



const ResetPassword = (props) => {
 
  const [errors,seterrors]=useState('')


    return (
    
        <Formik
          initialValues={{firstname:'',lastName:'', password: '' ,confirmPassword:'',securityQuestion:'',
          securityQuestion1:'',securityAnswer:'',securityAnswer1:'' }}
          validationSchema={Yup.object({
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
           
            axios.get(`http://localhost:5000/secret/${props.match.params._id}/fp`)
            .then(response=>{
             
               
                const user={
                    firstName:response.data.firstName,
                    lastName:response.data.lastName,
                    email:response.data.email,
                    password:values.password,
                    confirmPassword:values.confirmPassword,
                    securityQuestion:response.data.securityQuestion,
                    securityQuestion1:response.data.securityQuestion1,
                    securityAnswer:response.data.securityAnswer,
                    securityAnswer1:response.data.securityAnswer1  
                     
        
                }

                axios.post(`http://localhost:5000/secret/update/${props.match.params._id}`,user)
                .then(res=>{
                  console.log(res.data)
                  window.location="/login"
                })
                .catch(function (error) {             
                  seterrors("SOMETHING WENT WRONG"+error)
                });
            
              
            }).catch(function(err){
              seterrors("SOMETHING WENT WRONG"+err)
            })
            
          }} 
        
        >
        
          {formik => (

         <div className="signupWrapper">
    
        
              <div className="resetpassword-form-wrapper ">

                  <form onSubmit={formik.handleSubmit}>
                    <h1>Reset Your Password</h1>\
                    <p>Please choose a new password to finish signing in
                    </p>
                 
               

                    <label htmlFor="password"></label>
                    <input type="password" id="password" name="password" 
                    className= {formik.touched.securityAnswer && formik.errors.securityAnswer ?
                    "passwordErrors":"newPassword"} 
                    placeholder="New password"  {...formik.getFieldProps('password')} />          
                    {formik.touched.password  && formik.errors.password ? (
                        <div className="passwordErrors">{formik.errors.password}</div>
                    ) : null}


                    <label htmlFor="confirmPassword"></label>
                    <input type="password" id="confirmPassword" name="confirmPassword" 
                    className= {formik.touched.securityAnswer && formik.errors.securityAnswer ?
                    "passwordErrors":"newconfirmPasswod"} 
                    placeholder="Re-enter new password"  {...formik.getFieldProps('confirmPassword')} />          
                    {formik.touched.confirmPassword  && formik.errors.confirmPassword ? (
                        <div className="passwordErrors">{formik.errors.confirmPassword}</div>
                    ) : null}



              <div className="createAccount">
                <button type="submit">SUBMIT</button>
                <div className="signupError">
                { errors?'SOMETHING WENT WRONG':null}  
                
              </div>
              </div>
            </form>

          </div>
       </div>       
    
          )}
        </Formik>
        
      );
};

export default ResetPassword