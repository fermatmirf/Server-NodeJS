const cheerio = require('cheerio');
const fs = require('fs');
const request = require('request');

class Noticia{
    constructor(titulo, imagen, cuerpo){
        this.titulo = titulo;
        this.imagen = imagen;
        this.cuerpo = cuerpo;
    }
}

function devolverInfo(req, res){
    let noticias = new Array();
    let title;
    let imagen;
    let cuerpo;
    let noticia;
    request('https://blog.segu-info.com.ar/', (err,response, body) => {
        if(!err && response.statusCode == 200) {
            let $ = cheerio.load(body);
            $('h3.post-title','div.date-posts').each(function () {
                //titles.push(title = $(this).text());
                //console.log(titles);
                title = $(this).text();
                console.log('el titulo es: '+title);
                
                /*$('.pbtthumbimg','div').each(function(){
                    imagen = $(this).attr('src');
                    console.log('el url es: '+imagen);
*/
                    $('div','div .post-body div').each(function () {
                       cuerpo = $(this).text();
                       console.log('el cuerpo es: '+cuerpo);
                       noticia = new Noticia(title,imagen, cuerpo);
                       console.log(noticia);
                       
                       noticias.push(noticia);
                    })
                });
            //})
        }
        return res.status(200).send({noticias: noticias});
    });
}

module.exports = {
    devolverInfo
}