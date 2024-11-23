const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const bodyParser=require('body-parser');

const app=express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/EmployeeDataBase")
.then(()=>{console.log('Connected to MongoDB !!!')})
.catch((err)=>{console.log(err)});

const empSchema=new mongoose.Schema({
  EmpId: String,
  Name: String,
  Email: String,
  Mobile: String,
  Designation: String,
  Gender: String,
  Course: String,
  CreateDate: Date
});

const Employees=new mongoose.model('Employees',empSchema);

const userSchema=new mongoose.Schema({
    Username : String,
    Password : String,
});

const Users=new mongoose.model('Users',userSchema);

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await Users.findOne({ Username:username, Password:password });
      if (user) {
        res.status(200).json({ message: "Login successful" });
      } else {
        res.status(401).json({ message: "Invalid username or password" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

app.post('/addUser',async(req,res)=>{
    try
    {
        const user=new Users(req.body);
        await user.save();
        res.status(201).send("User added successfully");
    }
    catch(error)
    {
        res.status(400).send("Error in adding...");
    }
});
app.post('/addEmp',async(req,res)=>{
    try
    {
        const employee=new Employees(req.body);
        await employee.save();
        res.status(201).send("Employee added successfully");
    }
    catch(error)
    {
        res.status(400).send("Error in adding...");
    }
});

app.get('/searchEmp/:EmpID',async(req,res)=>{
    try
    {
        const employee=await Employees.findOne({EmpId : req.params.EmpID});
        if(employee)
        {
            res.status(200).json(employee);
        }
        else
        {
            res.status(404).send("Employee not found");
        }
    }
    catch(error)
    {
        res.status(400).send("Error in searching for employee...");
    }
});

app.get('/employees', async (req, res) => {
    try {
      const employees = await Employees.find(); 
      res.status(200).json(employees); 
    } catch (error) {
      console.error("Error fetching employees:", error);
      res.status(500).json({ message: "Error fetching employees" });
    }
  });

app.put('/updateEmp/:EmpID',async(req,res)=>{
    try
    {
        const employee=await Employees.findOneAndUpdate(
            {EmpId : req.params.EmpID},
            req.body,
            {new : true}
        );
        if(employee)
            {
                res.status(200).json(employee);
            }
        else
            {
                res.status(404).send("Employee not found");
            }
    }
    catch(error)
    {
        res.status(400).send("Error in searching for employee...");
    }
});

app.delete("/deleteEmp/:EmpID", async (req, res) => {
    try {
      const employee = await Employees.findOneAndDelete({EmpId : req.params.EmpID});
  
      if (employee) {
        res.status(200).json({ message: "Employee deleted successfully", employee });
      } else {
        res.status(404).json({ message: "Employee not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting employee" });
    }
  });
  
const port=3000;
app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
});