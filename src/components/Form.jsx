import React,{useState,useRef, useEffect} from 'react'
import styles from './form.css'
import Table from './Table';
import axios from 'axios'
const Form = () => {
  const[form,setForm]=useState({});
  const[userdata,setUserdata]=useState("");
  const[newform,setNewForm]=useState("");
  const nameRef=useRef();
  
  
      const onchange=(e)=>
      {
          let{checked,type,name,value,files}=e.target;
          // console.log(checked,type,name,value)
          if(type=="checkbox")
          {
            setNewForm({...newform,[name]:checked})
          }
          else if(type==files)
          {
            setNewForm({...newform,[name]:files})
          }
          else
          {
          setNewForm({...newform,[name]:value})
          }
          
      }
  
      const formsubmit=(e)=>
      {
          e.preventDefault();

          fetch("http://localhost:3004/userData",{
            method:"POST",
            headers:{
              "content-type":"application/json",
            },
            body:JSON.stringify({
              name:newform.name,
            age:newform.age,
            address:newform.address,
            department:newform.department,
            salary:newform.salary,
            ismarried:newform.ismarried,
            photo:newform.photo,
            }),
          })
          .then((r)=>r.json())
          .then((d)=>
          {
            setForm([...form,{d}]);
            setNewForm("");
          })
         
      }

      useEffect(()=>
      {
       fetch("http://localhost:3004/userData")
        .then((r)=>r.json())
          .then((d)=>
          {
            setUserdata([...userdata,d]);
            // console.log(userdata);
            // console.log("abc")
          })
        
      },[])

      

  return (
    <div className="form"><h4>Registration Form</h4>
        <form onSubmit={formsubmit}>
            <div>
        <label>Name: </label>
        <input 
        ref={nameRef}
        type="text" 
        placeholder="Ente your name"
        onChange={onchange} name='name'></input>
        </div>
        <div>
        <label>Age: </label>
        <input type="number" 
        placeholder="Enter Age" 
        name='age'
        onChange={onchange}></input>
        </div>
        <div>
        <label>Address: </label>
        <input type="text" 
        placeholder="Enter Your Email" 
        name='address'
        onChange={onchange}></input>
        </div>
        <div>
        <label>Department: </label>
        <select name="department"
        onChange={onchange}>
          <option></option>
            <option value="it">IT</option>
            <option value="com">COMPUTER</option>
            </select>
        </div>
        <div><label>Salary: </label>
        <input type="number" 
        placeholder="Enter Salary" 
        name='salary'
        onChange={onchange}></input>
        </div>
        <div>
        <label>Marital status: </label>
        
        <div>
        <input type="checkbox" 
        name='ismarried'
        checked={newform.married}
       onChange={onchange}></input>
        <label>Married</label>
        </div>
        
        
        </div>
        <div>
        <label className='profile'>Profile photo: </label>
        </div>
        <div>
        <input type="file" 
        name='photo'
        accept='jpg/jpeg'
        onChange={onchange}></input>
        </div>
        
        <button type='submit'>Submit</button>
        </form>
        
       {/* / <Table form={form}/> */}
    </div>
  )
}

export default Form