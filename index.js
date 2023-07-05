
const fs = require('fs');

const prompt = require ('prompt-sync')();

const axios = require('axios')
const cheerio = require('cheerio')

const search = prompt('Enter your desired product')
const url = `https://www.jumia.co.ke/catalog/?q=${search}`
console.log(url);

axios(url)
    .then(response => {
        const html =response.data
       
       
        const $ = cheerio.load(html)
        const articles =[]
        $('.prd._fb.col.c-prd',html).each(function(){
            const product = $(this).find('h3').text()
            const price = $(this).find('div.prc').text()
            
            const url ='https://www.jumia.co.ke/'+ $(this).find('a').attr('href')
            const imgUrl =$(this).find('img').attr('src')
            articles.push({
                product,
                price,
               url,
            })
        })
        console.log(articles)
        const wrappedProducts = {items:articles}
        const jsonData = JSON.stringify(wrappedProducts, null, 2);

fs.writeFile('products.json', jsonData, (err) => {
  if (err) {
    console.error('Error writing JSON file:', err);
  } else {
    console.log('JSON file created successfully!');
  }
});
       
        
        
    })


    
    





