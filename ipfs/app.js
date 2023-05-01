const ipfsClient = require('ipfs-http-client');

const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const fs = require('fs');

const ipfs = new ipfsCLient({host: 'localhost', port:'5001',protocol: 'http'});
const app = express();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());

app.get('/',(req,res)=>{
    res.render('home');
});

app.post('/upload', (req,res)=>{
    const file = req.files.file;
    const filename = req.body.filename;
    const filepath ='files/'+ filename;

    file.mv(filepath, async(err)=>{
        if(err){
            console.log('Error:not download fail');
            return res.status(500).send(err);
        }
        const fileHash = await addFile(filename,filePath);
        fs.unlink(filepath,(err)=>{
            if (err) console.log(err);
        });
        res.render('upload', {filename,fileHash});
    })
})
app.listen(3000,()=>{
    console.log('Server chal raha hai')
})