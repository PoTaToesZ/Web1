const express = require('express')
const { insertToDB, getAll, deleteObject, getDocumentById, updateById} = require('./databaseHandler')
const app = express()

app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))

const path = require('path')
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))



app.get('/edit/:id', async (req, res) => {
    const idValue = req.params.id
    const productToEdit = await getDocumentById(idValue, "Products")
    res.render("edit", { product: productToEdit })
})

app.get('/', async (req, res) => {
    var result = await getAll("Products")
    res.render('home', { products: result })
})
app.get('/delete/:id', async (req, res) => {
    const idValue = req.params.id
    await deleteObject(idValue, "Products")
    res.redirect('/')
})
app.post('/insert', async (req, res) => {
    const name = req.body.txtName
    const price = req.body.txtPrice
    const url = req.body.txtURL;
    if (url.length == 0) {
        var result = await getAll("Products")
        res.render('home', { products: result, picError: 'Phai nhap Picture!' })
    } else {
        const obj = { name: name, price: price, picURL: url }
        await insertToDB(obj, "Products")
        res.redirect('/insert')
    }
    res.redirect('/')
})

app.post("/update", async (req, res) => {
    const id = req.body.txtId;
    const name = req.body.txtName;
    const price = req.body.txtPrice;
    const picUrl = req.body.txtUrl;
    let updateVal = {$set: {name: name,price: price, picUrl: picUrl},};

    await updateById( id, updateVal, "Products");
    res.redirect("/");
})

app.get('/insert', function(req, res){
    res.render('insert')
})

app.get('/edit', function(req, res){
    res.render('edit')
})

app.get('/home.hbs', function(req, res){
    res.render('home.hbs')
})
    
const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log('Server is running!')