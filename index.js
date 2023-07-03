const PORT =8000
const axios = require('axios')
const cheerio = require('cheerio')

const url = 'https://www.jumia.co.ke/catalog/?q=phone'

axios(url)
    .then(response => {
        const html =response.data
       
       
        const $ = cheerio.load(html)
        const articles =[]
        $('.prd._fb.col.c-prd',html).each(function(){
            const product = $(this).text()
            console.log(product)
        
            const url = $(this).find('a').attr('href')
            articles.push({
                product,
                url
            })
        })
        console.log(articles)
        
    })




