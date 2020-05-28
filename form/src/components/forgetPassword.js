import React,{useState,useEffect} from 'react';
import {Formik } from 'formik';
import { Redirect } from 'react-router';
import axios from"axios"
import * as Yup from 'yup';


const ForgetPasswords = (props) => {
 
  const [submitDisabled,setsubmitDisabled]=useState(false)
  const [secques,setsecques]=useState()
  const [secques1,setsecques1]=useState()
  const [secans,setsecans]=useState()
  const [secans1,setsecans1]=useState()
  const [wrongAns,setwrongAns]=useState(true)
  const [wrongAns1,setwrongAns1]=useState(true)
  const [errors,seterrors]=useState('')


  useEffect(()=>{
 
    axios.get(`http://localhost:5000/secret/${props.match.params._id}/fp`)
    .then(response=>{
      setsecques(response.data.securityQuestion)
      setsecques1(response.data.securityQuestion1)
      setsecans(response.data.securityAnswer)
      setsecans1(response.data.securityAnswer1)
      
    }).catch(function(err){
      seterrors("SOMETHING WENT WRONG"+err)
    })

  })


    return (


        <Formik
          initialValues={{ securityAnswer: '' ,securityAnswer1: ''}}
          validationSchema={Yup.object({
            securityAnswer: Yup.string()
              .max(15, 'Must be 15 characters or less')
              .required('Please Enter your Security Answer'),
            securityAnswer1: Yup.string()
              .max(20, 'Must be 20 characters or less')
              .required('Please Enter your Security Answer'),
           
            })}


          onSubmit={(values) => {
      
            setwrongAns(true)
            setwrongAns1(true)
            setsubmitDisabled(false)
            
           if(secans!==values.securityAnswer) {
            setwrongAns(false)
            
           } 
           else if(secans1!==values.securityAnswer1) 
            {
              setwrongAns1(false)
            } 
            else if(secans===values.securityAnswer && secans1===values.securityAnswer1)
              {
               setsubmitDisabled(true)
              }
   
          }}
                 
        >
        
          {formik => (

         <div className="secretWrapper">
    
        
              <div className="secret-form-wrapper ">

                  <form onSubmit={formik.handleSubmit}>
                    <h1>Answer Security Question</h1>\
                    <p>Please select and answer your security question below,this question will help us 
                      verify your identity when you forget your password
                    </p>
                  
                  <label className="securityQuestion" htmlFor="securityQuestion">Security Question</label>
                 
                  <select  name="securityQuestion"   id="securityQuestion"  value={secques}  
                   className= {formik.touched.securityQuestion && formik.errors.securityQuestion ?
                    "selectSecurityErrors":"securitySelect"} disabled  >

                     <option value=""  label="-- select an option --"/>
                     <option value="q1" label="Mother's birthplace"/>
                     <option value="q2" label="Best childhood friend"/>
                     <option value="q3" label="Name of first pet"/>
                     <option value="q4" label="Favorite teacher"/>
                     <option value="q5" label="Your favorite place"/>
                   </select>
                  
                 


                    <label className="securityQuestion" htmlFor="securityAnswer">Answer</label>
                    <input type="text" id="securityAnswer" name="securityAnswer" 
                    className= {formik.touched.securityAnswer && formik.errors.securityAnswer ?
                    "securityErrors":"securityAnswer"} 
                    placeholder="Enter Security Answer"  {...formik.getFieldProps('securityAnswer')} />          
                    {formik.touched.securityAnswer  && formik.errors.securityAnswer ? (
                        <div className="securityErrors">{formik.errors.securityAnswer}</div>
                    ) : wrongAns ? null: (
                        <div className="securityErrors">Oops! Answer is Incorrect</div>)}
     

                  <label className="securityQuestion" htmlFor="securityQuestion1">Security Question</label>
                   <select className="securitySelect" name="securityQuestion1"
                    id="securityQuestion1" value={secques1} disabled>

                     <option value="" > -- select an option --</option>
                     <option value="q1">Mother's birthplace</option>
                     <option value="q2">Best childhood friend</option>
                     <option value="q3">Name of first pet</option>
                     <option value="q4">Favorite teacher</option>
                     <option value="q5">Your favorite place</option>
                   </select>
                  


                    <label className="securityQuestion" htmlFor="securityAnswer1">Answer</label>
                    <input type="text" id="securityAnswer1" name="securityAnswer1" 
                    className= {formik.touched.securityAnswer1 && formik.errors.securityAnswer1 ?
                    "securityErrors1":"securityAnswer1"}
                    placeholder="Enter Security Answer"  {...formik.getFieldProps('securityAnswer1')} />          
                    {formik.touched.securityAnswer1  && formik.errors.securityAnswer1 ? (
                        <div className="securityErrors1">{formik.errors.securityAnswer1}</div>
                    ) : wrongAns1 ? null: (
                      <div className="securityErrors1">Oops! Answer is Incorrect</div>)}



              <div className="createAccount">

                { submitDisabled?<Redirect push to ={ `/resetpassword/${props.match.params._id}`} >
                <button   type="submit" >SUBMIT</button>
                </Redirect>:<button  type="submit" >SUBMIT</button>}
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



export default ForgetPasswords