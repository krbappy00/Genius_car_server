const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5020;
require('dotenv').config()
const mongoose = require('mongoose');
const Product = require('./Models/Product.model');
const Team = require('./Models/Team.model');
const Order = require('./Models/Order.model');

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uiqovdn.mongodb.net/?retryWrites=true&w=majority`;

// CONNECTION
const dbConnect = async() => {
  try {
    await mongoose.connect(uri)
    console.log('db is connected')
  }
  catch (error){
    console.log('db is not connected')
    console.log(error.message)

  }
}

app.listen(port, async() => {
  console.log(`api running on port ${port}`)
  await dbConnect();
})

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Api is running');
})
app.get("/servicess", async (req, res) => {
  res.send("Hello Worlddddd");
});
// SERVICE READ ONLY SCHEMA

const Service = mongoose.model('Services', new mongoose.Schema(),'services');

// ORDER DB
app.post('/order', async(req, res) => {
  try {
    const newOrder = new Order({
      img:req.body.img,
      serviceId: req.body.serviceId,
      serviceName: req.body.serviceName,
      price: req.body.price,
      email:req.body.email,
      customerName: req.body.customerName,
      phone:req.body.phone,
      address:req.body.address
    });
    const orderData = await newOrder.save();
    res.status(201).send({orderData})
    
  }
  catch(err) {
    res.status(500).send({message:err.message})
  }
})
app.get("/orders", async (req, res) => {
   
  try {
    let q = {};
    if (req.query.email) {
      q = {
        email: req.query.email
      }
      
    }
    const order = await Order.find(q);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "order not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// PRODUCT DB
app.post('/product', async(req, res) => {
  try {

    const newProduct = new Product({
      name:req.body.name,
      price:req.body.price,
      img_url:req.body.img_url
    })
    const productData =await newProduct.save();

    res.status(201).send({productData });
  }
  catch(error) {
    res.status(500).send({message:error.message})
  }
})
app.get('/products', async (req, res) => {
  try {
    const product = await Product.find();
    console.time()
    
      res.send(product);
   
      res.status(404).send({message:"product not found"})
    
  }
  catch(error) {
    res.status(500).send({message:error.message})
  }

})
app.get('/checkout/products/:id', async (req, res) => {
  const id = req.params.id
  try {
    const product = await Product.findOne({_id:id})
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({message:"product not found"})
    }
  }
  catch(error) {
    res.status(500).send({message:error.message})
  }

})
app.get('/a', async (req, res) => {
  res.send({message:"aaaa"})
})
// TEAM DB

app.post('/teams', async (req, res) => {
  try {

    const newTeam = new Team({
      name:req.body.name,
      designation:req.body.designation,
      img_url:req.body.img_url
    })
    const teamData =await newTeam.save();

    res.status(201).send({teamData });
  }
  catch(error) {
    res.status(500).send({message:error.message})
  }
})
app.get('/teams', async (req, res) => {
  try {
    const team = await Team.find();
    if (team) {
      res.send(team);
    } else {
      res.status(404).send({message:"team member not found"})
    }
  }
  catch(error) {
    res.status(500).send({message:error.message})
  }

})
app.get('/teams/:id', async (req, res) => {
  const id = req.params.id
  try {
    const team = await Team.findOne({_id:id})
    if (team) {
      res.send(team);
    } else {
      res.status(404).send({message:"team  member not found"})
    }
  }
  catch(error) {
    res.status(500).send({message:error.message})
  }

})

// SERVICE GET

app.get('/services', async (req, res) => {
  try {
    console.log('asdff')
    const services = await Service.find();
console.log("asdfasdf 123");
    if (services) {
      console.log('asdfasdf')
      res.send(services)

    } else {
      res.status(404).send({message:"service not found"})
    }
  }
  catch (error) {
    res.status(500).send({message:error.message})
  }
})
app.get('/services/:id', async (req, res) => {
  const id = req.params.id
  try {
    const service = await Service.findOne({_id:id})
    if (service) {
      res.send(service);
    } else {
      res.status(404).send({message:"service not found"})
    }
  }
  catch(error) {
    res.status(500).send({message:error.message})
  }

})