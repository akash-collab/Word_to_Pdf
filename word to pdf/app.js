const express = require('express');
const app = express();
const fs = require('fs');
const docxtemplater = require('docxtemplater');
const path = require('path');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.post('/convert', async (req, res) => {
  try {
    const { wordFile } = req.files;
    
    const template = await readFileAsync(wordFile.path, 'binary');
    const doc = new docxtemplater();
    doc.loadZip(new JSZip(template));
    
    const generatedPdfPath = path.join(__dirname, 'public/generated.pdf');
    const generatedPdfBuffer = doc.getZip().generate({ type: 'nodebuffer' });
    
    fs.writeFileSync(generatedPdfPath, generatedPdfBuffer);
    
    res.send('generated.pdf');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

app.get('/download', (req, res) => {
  const { file } = req.query;
  const filePath = path.join(__dirname, 'public', file);
  res.download(filePath);
});

app
