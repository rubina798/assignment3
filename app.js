const express = require('express');
const app = express();
const fs = require('fs');
//var jsonfile = require('jsonfile');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
const filepath = '/home/rubina/Downloads/product.json';

const product = JSON.parse(fs.readFileSync(`${__dirname}/data/product.json`)); 




// this is the get api for fetching the details of the product
app.get('/api/v1/product',(req,res)=>{
    res.status(200).json({
        status:'ok',
        data:{
            product
        }
    });
});


// this is the post api for adding the product 
app.post('/api/v1/product',(req,res)=>{
    const newID = product[product.length -1].id + 1
    const newProduct = Object.assign({id:newID}, req.body);
    product.push(newProduct);
    fs.writeFile(`${__dirname}/data/product.json`, JSON.stringify(product), err =>{
        res.status(200).json({
            status:'ok',
            data:{
                product: newProduct
            }
        });
    });
});

//update product
app.patch('/api/v1/product/:id', (req,res)=>{
    if(req.params.id > product.length)
    {
        res.status(400).json({
            status:'fail',
            message:'invalid id'
        });

    }
    var id = req.params.id;
    var newid = id-1;
    var newname = req.body.name;
    var newquantity= req.body.quantity;
    var newprice= req.body.price;
    var newfile = product;
    newfile[newid].name = newname;
    newfile[newid].quantity= newquantity;
    newfile[newid].price= newprice;

    fs.writeFile(`${__dirname}/data/product.json`,JSON.stringify(newfile),err =>{
        if (err) throw err;
        res.status(201).json({
            status:'ok',
            message:'data updated sucessfuly'
        });
        });
        
    });
 
    //delete the product

    app.delete('/api/v1/product/:id',(req,res)=>{
        if(req.params.id > product.length)
        {
            res.status(400).json({
                status:'fail',
                message:'invalid id'
            });
    
        }

        var id = req.params.id;
        console.log(id);
        result=product.splice(id,1);
        console.log(result);

    });
  

const port =4000;
app.listen(port,()=>{console.log(`app is running on the port ${port}`)});