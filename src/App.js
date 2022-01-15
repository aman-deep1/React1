import React from 'react'
import Employee from "./Employee";

class App extends React.Component

{
  constructor()
  {
    super()      
    this.state = {
      employees : [
        {empid:101 , name : 'vikas' , age : 34 , 
        email : "vikas@gmail.com", salary : 45000 , bonus : 500},
        {empid:102 , name : 'meena' , age : 31 , 
        email : "meena@gmail.com", salary : 41000 , bonus : 450},
      ],
      duplicateStatus : false,
      duplicateMessage : ""
    }
  }

  updateEmp = ()=>{
    var ob = { empid : this.idbox.value*1 , 
      name : this.namebox.value , 
      age : this.agebox.value*1 , 
      email : this.emailbox.value,
      salary : this.salbox.value*1 , 
      bonus : this.bonusbox.value*1 }

    var arr = [...this.state.employees]  

    arr = arr.map((emp)=>emp.empid==ob.empid?ob:emp)
    this.setState({employees:arr})  
    this.setState({editstatus:false})
    this.clearBoxes()
  }

  addEmp = ()=>{
     var ob = { empid : this.idbox.value*1 , 
                name : this.namebox.value , 
                age : this.agebox.value*1 , 
                email : this.emailbox.value,
                salary : this.salbox.value*1 , 
                bonus : this.bonusbox.value*1 }
    //console.log(ob)                  
    this.setState({employees : [...this.state.employees,ob]})
  }

  checkUniqueValue = (event)=>{
      var data = event.target.value
      var id = event.target.id
      //console.log(data,id)
      var status = this.state.employees.find((emp)=>emp[id]==data)!=undefined;        

      var msg = `Duplicate Value found in ${id} !`
      this.setState({duplicateStatus:status,duplicateMessage:msg})
  }

  deleteEmp = (id)=>{
     var newdata = this.state.employees.filter(emp=>emp.empid!=id);
     this.setState({employees : newdata})
  }

  editEmp = (id)=>
    {
      var obj = this.state.employees.find((emp)=>emp.empid==id)
      this.idbox.value = obj.empid
      this.namebox.value = obj.name
      this.agebox.value = obj.age
      this.salbox.value = obj.salary
      this.emailbox.value = obj.email
      this.bonusbox.value = obj.bonus
      this.setState({editstatus:true})
    }

    clearBoxes = ()=>{
      this.idbox.value = ''
      this.namebox.value = ''
      this.agebox.value = ''
      this.salbox.value = ''
      this.emailbox.value = ''
      this.bonusbox.value = ''
    }

 /*  deleteEmp2 = (index)=>
  {
    console.log(index)
//      var newdata = this.state.employees
//     console.log(newdata)      
//    newdata.splice(index,1);
    var newdata = [...this.state.employees];
    newdata.splice(index,1);
    console.log(newdata)
    this.setState({employees : newdata})
  }
 */
  render()
  {     
    return <div>
        <h1>Employee Records</h1>   

        <input type='text' id="empid" ref={c=>this.idbox=c} 
        onBlur={this.checkUniqueValue}
        onFocus={()=>this.setState({duplicateStatus:false,duplicateMessage:''})}
        placeholder='Employee ID'/>&nbsp;

        <input type='text' ref={c=>this.namebox=c} placeholder='Employee Name'/>&nbsp;
        <input type='number' ref={c=>this.agebox=c} placeholder='Employee Age'/>&nbsp;

        <input type='email' id="email" ref={c=>this.emailbox=c} 
        onBlur={this.checkUniqueValue}
        onFocus={()=>this.setState({duplicateStatus:false,duplicateMessage:''})}
        placeholder='Employee Email'/>&nbsp;

        <input type='number' ref={c=>this.salbox=c} placeholder='Employee Salary'/>&nbsp;
        <input type='number' ref={c=>this.bonusbox=c} placeholder='Employee Bonus'/>&nbsp;
        <br/><br/>

        <br/><br/>

          {this.state.editstatus?<button onClick={this.updateEmp}>Update Employee</button>:this.state.duplicateStatus?<b style={{color:"red"}}>{this.state.duplicateMessage}</b>:<button onClick={this.addEmp}>Add Employee</button>}
        

        <hr/>

        <table border='1' align='center' cellPadding="10" cellSpacing="5">
          <thead>
          <tr>
            <th>S.No.</th>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Bonus</th>
            <th>Total Salary</th>
            <th>
              Operation
              </th>
            </tr>
            </thead>
            <tbody>
            {this.state.employees.map((emp,index)=>
            {
              return <Employee key={index} emp={emp} 
              deleteEmployee={this.deleteEmp} editEmployee={this.editEmp}
              index={index}/>
            })}
            </tbody>
          </table>
      </div>
    }
}

export default App;













/* import React from 'react';
//import { First, Second } from "./component";
//import Third from "./component";

class App extends React.Component
{
    constructor()
    {
      super()
        this.intervalObj = undefined
      this.state = {
          title : "Good Morning",
          num : 25,
            cities : [
            "Delhi" , "Bhopal" , "Pune" , "Raipur" , "Indore"
          ]
      }
    }
    startIncrement = ()=>{
          setInterval(()=>
          {
            this.setState({num : this.state.num+5})
          },100);
    }
       stopIncrement = ()=>{
          clearInterval(this.intervalObj)
          this.setState({num : 0})
    }
    change = ()=>{
        console.log(this.state)
        //this.state.title = "Good Evening"
        this.setState({title:"Good Evening"})
        console.log(this.state)
    }
     addCity = ()=>{
      var city = document.getElementById('t1').value;
      this.setState({cities : [...this.state.cities,city] })
    }    
   
    render()
    {    
      console.log("Render Run ...... ")
      return <div>
          <h1>My first ReactJS Component</h1>
          <b>{this.state.title} : {this.state.num}</b>
          <br/>      
          <button onClick={this.change}>Change Title</button>  
          &nbsp;
          <button onClick={this.startIncrement}>Start</button>
          &nbsp;
          <button onClick={this.stopIncrement}>Stop</button>
          <hr/>
         
          <input type="text" id="t1" placeholder='New City'/>&nbsp;
          <button onClick={this.addCity}>Add New City</button>
          <ul>
            {this.state.cities.map((ct)=>
            {
              return <li>{ct}</li>
            })}
          </ul>
      </div>
    }
}
 
  
export default App;


/* 
    <First />
    <Second />
    <Third/> 
      */