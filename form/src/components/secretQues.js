import React,{useState} from 'react';
import { Formik } from 'formik';
import axios from"axios"
import * as Yup from 'yup';


const SecretQuestion = (props) => {
 
  const [selectsame,setselectsame]=useState(false)
  const [errors,seterrors]=useState('')
  const { data } =props.location
  var signupValues=(data)


    return (
    
        <Formik
          initialValues={{ securityAnswer: '' ,securityAnswer1: '',securityQuestion:"",securityQuestion1:""}}
          validationSchema={Yup.object({
            securityAnswer: Yup.string()
              .max(15, 'Must be 15 characters or less')
              .required('Please Enter your Security Answer'),
            securityAnswer1: Yup.string()
              .max(20, 'Must be 20 characters or less')
              .required('Please Enter your Security Answer'),
            securityQuestion:Yup.string()
             .required('Please select security question'),
            securityQuestion1:Yup.string()
             .required('Please select security question'),
           
            })}
          onSubmit={(values) => {
          
             var concatValues=  Object.assign(
              signupValues,values
            )
          
            setselectsame(false)
            if(concatValues.securityQuestion===concatValues.securityQuestion1)
            setselectsame(true)
            else{
              setselectsame(false)
               axios.post("http://localhost:5000/secret/add",concatValues)
              .then(res=>{
                window.location="/login"
              })
              .catch(function (error) {             
                seterrors("SOMETHING WENT WRONG"+error)
              });
          
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
                 
                  <select  name="securityQuestion"   id="securityQuestion"  value={formik.values.securityQuestion}  
                   className= {formik.touched.securityQuestion && formik.errors.securityQuestion ?
                    "selectSecurityErrors":"securitySelect"} 
                  {...formik.getFieldProps('securityQuestion')}  >
                     <option value=""  label="-- select an option --"/>
                     <option value="q1" label="Mother's birthplace"/>
                     <option value="q2" label="Best childhood friend"/>
                     <option value="q3" label="Name of first pet"/>
                     <option value="q4" label="Favorite teacher"/>
                     <option value="q5" label="Your favorite place"/>
                   </select>
                  
                   {formik.touched.securityQuestion  && formik.errors.securityQuestion ? (
                        <div className="securityErrors">{formik.errors.securityQuestion}</div>
                    ) : null}


                    <label className="securityQuestion" htmlFor="securityAnswer">Answer</label>
                    <input type="text" id="securityAnswer" name="securityAnswer" 
                    className= {formik.touched.securityAnswer && formik.errors.securityAnswer ?
                    "securityErrors":"securityAnswer"} 
                    placeholder="Enter Security Answer"  {...formik.getFieldProps('securityAnswer')} />          
                    {formik.touched.securityAnswer  && formik.errors.securityAnswer ? (
                        <div className="securityErrors">{formik.errors.securityAnswer}</div>
                    ) : null}



                  <label className="securityQuestion" htmlFor="securityQuestion1">Security Question</label>
                   <select className="securitySelect" name="securityQuestion1"
                    id="securityQuestion1"value={formik.values.securityQuestion1}  
                    {...formik.getFieldProps('securityQuestion1')}>
                     <option value="" > -- select an option --</option>
                     <option value="q1">Mother's birthplace</option>
                     <option value="q2">Best childhood friend</option>
                     <option value="q3">Name of first pet</option>
                     <option value="q4">Favorite teacher</option>
                     <option value="q5">Your favorite place</option>
                   </select>
                   {formik.touched.securityQuestion1  && formik.errors.securityQuestion1 ? (
                        <div className="securityErrors1">{formik.errors.securityQuestion1}</div>
                    ) : null}

                    <label className="securityQuestion" htmlFor="securityAnswer1">Answer</label>
                    <input type="text" id="securityAnswer1" name="securityAnswer1" 
                    className= {formik.touched.securityAnswer1 && formik.errors.securityAnswer1 ?
                    "securityErrors1":"securityAnswer1"}
                    placeholder="Enter Security Answer"  {...formik.getFieldProps('securityAnswer1')} />          
                    {formik.touched.securityAnswer1  && formik.errors.securityAnswer1 ? (
                        <div className="securityErrors1">{formik.errors.securityAnswer1}</div>
                    ) : null}

   
         

              <div className="createAccount">
                <button type="submit">SUBMIT</button>
                <div className="signupError">{ selectsame?"Please select different security question":null} 
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



export default SecretQuestion