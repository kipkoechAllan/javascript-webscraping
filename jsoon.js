const express = require('express');
const fs = require('fs');

const app = express();
const port = 2000;

app.get('/', (req, res) => {
  const filePath = './products.json';

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).send('Error reading file');
      return;
    }

    try {
      const jsonData = JSON.parse(data);

      let out = '';
      for (let product of jsonData.items) {
        out += `
          <tr>
            <td>${product.product}</td>
            <td>${product.price}</td>
            <td>${product.url}</td>
          </tr> 
        `;
      }

      const html = `
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="index.js"></script>
    
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
</head>
<body>
      <table class="table">
        <thead class="thead-light">
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th scope="col">Link</th>
          </tr>
        </thead>
        <tbody id="data-output">
            
            ${out}
        </tbody>
      </table>
      
</body>
</html>
      `;

      res.send(html);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      res.status(500).send('Error parsing JSON');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});