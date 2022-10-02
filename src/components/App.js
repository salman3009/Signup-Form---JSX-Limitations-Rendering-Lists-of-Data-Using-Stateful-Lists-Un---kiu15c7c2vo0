import React, {Component, useEffect, useState} from "react";
import '../styles/App.css';

const App = () => {

  const [getForm,setForm]=useState({
    name:'',
    email:'',
    gender:'male',
    phoneNumber:'',
    password:''
  });

  const [getFormValidation,setFormValidation]=useState({
    name:{
      required:true,
      pattern:/^[a-zA-Z0-9\s]+$/,
      patternMessage:"Name is not alphanumeric",
      requiredError:"Name Error",
      status:false
    },
    email:{
      required:true,
      patten:/@+/,
      patternMessage:"Email must contain @",
      requiredError:'Email Error',
      status:false
    },
    phoneNumber:{
      required:true,
      patten:/^[0-9]+$/,
      patternMessage:"Phone Number must contain only numbers",
      requiredError:"Phone Number Error",
      status:false
    },
    password:{
      required:true,
      pattern:/^[a-zA-Z]{6,}$/,
      patternMessage:"Password must contain atleast 6 letters",
      requiredError:"Password Error",
      status:false
    }
  })

  const [getUserName,setUserName] = useState('');

  useEffect(()=>{
     console.log(getFormValidation);
  },[getFormValidation]);


  const onChangeHandler=(event)=>{
        setForm({
          ...getForm,
          [event.target.name]:event.target.value
        })
  }



  const onSubmitHandler =()=>{

    let getFormValidationDetails = getFormValidation;

      for(let obj in getFormValidationDetails){
       
        if(getFormValidationDetails[obj]['required'] && !getForm[obj]){
          getFormValidationDetails[obj]['status'] = "required";
        }

    }

    setFormValidation({...getFormValidationDetails});



      let email = getForm.email.split('@')[0];
      setUserName(`Hello ${email}`)
  }
  return (
    <div id="main">
      <div className="container">
        Name:<input type="text" onChange={onChangeHandler} name="name" data-testid="name"/>
         {getFormValidation['name']['status'] && <div className="danger">
           { getFormValidation['name']['status']=="required"? getFormValidation['name']['requiredError']:getFormValidation['name']['patternMessage']}
          </div> } 
        Email Address:<input type="email" onChange={onChangeHandler} name="email"  data-testid ="email"/>
        {getFormValidation['email']['status'] && <div className="danger">
           { getFormValidation['email']['status']=="required"? getFormValidation['email']['requiredError']:getFormValidation['email']['patternMessage']}
          </div> } 
        Gender:<select data-testid ="gender" onChange={onChangeHandler}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="others">others</option>
        </select>
        Phone Number:<input type="number" onChange={onChangeHandler} name="phoneNumber" data-testid ="phoneNumber"/>
        {getFormValidation['phoneNumber']['status'] && <div className="danger">
           { getFormValidation['phoneNumber']['status']=="required"? getFormValidation['phoneNumber']['requiredError']:getFormValidation['phoneNumber']['patternMessage']}
          </div> } 
        Password:<input type="password" onChange={onChangeHandler} name="password" data-testid ="password"/>
        {getFormValidation['password']['status'] && <div className="danger">
           { getFormValidation['password']['status']=="required"? getFormValidation['password']['requiredError']:getFormValidation['password']['patternMessage']}
          </div> } 
        <button onClick={onSubmitHandler} data-testid ="submit">Submit</button> 
      </div>
      <div className="container">
      <h1>{getUserName}</h1>
      </div>
   
    </div>
  )
}


export default App;
