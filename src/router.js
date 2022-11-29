const express = require("express");
const app = express()
app.use(express.json())

const Associationcontroller = require('./1.controller/associationcontroller');
const Projectcontroller = require('./1.controller/projectController');
const Searchcontroller = require('./1.controller/searchController');
const Universitycontroller = require('./1.controller/universityController');
const Usercontroller = require('./1.controller/userController');

const auth=require("./middleware/auth");

const PORT = 3001;
app.listen(
    PORT, 
    () => console.log("Time to Krummmble")
)

app.use((error, request, response, next) => {
  if (error !== null) {
    return response.status(400).json({ err : 'Syntax Error' });
  }
});

/////////////////////////////////////////////// ASSOCIATIONS //////////////////////////////////////////////////////

app.get('/associations', (req, res) => { Associationcontroller.getAll(req, res) })
app.get('/associations/visible', (req, res) => { Associationcontroller.getVisible(req, res) })
app.get('/associations/invisible', auth.authMember, (req, res) => { Associationcontroller.getInvisible(req, res) })
app.get('/associations/name/:name', (req, res) => { Associationcontroller.getByName(req, res) })
app.get('/associations/:id', (req, res) => { Associationcontroller.getSingle(req, res) })
app.post('/associations', (req, res) => { Associationcontroller.addSingle(req,res) })
app.patch('/associations/:id', (req, res) => { Associationcontroller.updateSingle(req,res)} )
app.delete('/associations/:id', (req, res) => { Associationcontroller.deleteSingle(req,res)})

/////////////////////////////////////////////// PROJECTS //////////////////////////////////////////////////////

app.get('/projects', (req, res) => { Projectcontroller.getAll(req, res) })
app.get('/projects/:id', (req, res) => { Projectcontroller.getSingle(req, res) })
app.get('/projects/association/:id', (req,res) => { Projectcontroller.getByAsso(req,res) })
app.post('/projects', (req, res) => { Projectcontroller.addSingle(req,res) })
app.patch('/projects/', (req, res) => { Projectcontroller.updateMultiple(req,res)} )
app.patch('/projects/:id', (req, res) => { Projectcontroller.updateSingle(req,res)} )
app.delete('/projects/', (req, res) => { Projectcontroller.deleteMultiple(req,res)})
app.delete('/projects/:id', (req, res) => { Projectcontroller.deleteSingle(req,res)})

/////////////////////////////////////////////// UNIVERSITIES //////////////////////////////////////////////////////

app.get('/universities', (req, res) => { Universitycontroller.getAll(req, res) })
app.get('/universities/:id', (req, res) => { Universitycontroller.getSingle(req, res) })
app.post('/universities', (req, res) => { Universitycontroller.addSingle(req,res) })
app.patch('/universities/:id', (req, res) => { Universitycontroller.updateSingle(req,res)} )
app.delete('/universities/:id', (req, res) => { Universitycontroller.deleteSingle(req,res)})

/////////////////////////////////////////////// USERS //////////////////////////////////////////////////////

app.get('/users', (req, res) => { Usercontroller.getAll(req, res) })
app.get('/users/:id', (req, res) => { Usercontroller.getSingle(req, res) })
app.get('/users/email/:email', (req, res) => { Usercontroller.getByEmail(req, res) })
app.post('/users/login', (req, res) => { Usercontroller.login(req,res) })
app.post('/users/logged', (req, res) => { Usercontroller.loginWithToken(req,res) })
app.post('/users', (req, res) => { Usercontroller.addSingle(req,res) })
app.patch('/users/:id', (req, res) => { Usercontroller.updateSingle(req,res)} )
app.delete('/users/:id', (req, res) => { Usercontroller.deleteSingle(req,res)})


/////////////////////////////////////////////// SEARCH //////////////////////////////////////////////////////

app.post('/search', (req, res) => { Searchcontroller.search(req,res) })
app.post('/keysearch', (req, res) => { Searchcontroller.searchKey(req,res) })
app.post('/textsearch', (req, res) => { Searchcontroller.search(req,res) })
app.post('/testsearch', (req, res) => { Searchcontroller.testsearch(req,res) })





app.all('*', function(req, res) {
    res.status(400).json({err : "Bad Request"});
})
