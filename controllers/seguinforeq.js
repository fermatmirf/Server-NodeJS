'use strict'
const cheerio = require('cheerio');
const fs = require('fs');
const request = require('request');
//arreglos utilizados
let arrayNoticias = new Array();

//defino clase noticia
class Noticia{
    constructor(titulo, imagen, cuerpo){
        this.titulo = titulo;
        this.imagen = imagen;
        this.cuerpo = cuerpo;
    }
}
//funcion
function cargarArray(a,b,c){
    var tit = a[0];
    var img = b[0];
    var cue = c[0];
    var tit1 = a[1];
    var img1 = b[1];
    var cue1 = c[1];
    var tit2 = a[2];
    var img2 = b[2];
    var cue2 = c[2];
    var tit3 = a[3];
    var img3 = b[3];
    var cue3 = c[3];
    var tit4 = a[4];
    var img4 = b[4];
    var cue4 = c[4];
    var tit5 = a[5];
    var img5 = b[5];
    var cue5 = c[5];
    var tit6 = a[6];
    var img6 = b[6];
    var cue6 = c[6];
    var tit7 = a[7];
    var img7 = b[7];
    var cue7 = c[7];
    
    arrayNoticias.push(
        new Noticia(tit,img,cue),
        new Noticia(tit1,img1,cue1),
        new Noticia(tit2,img2,cue2),
        new Noticia(tit3,img3,cue3),
        new Noticia(tit4,img4,cue4),
        new Noticia(tit5,img5,cue5),
        new Noticia(tit6,img6,cue6),
        new Noticia(tit7,img7,cue7)
    );
}
//funcion
function devolverInfo(req,res){
    var titulos = new Array();
    var urlimages = new Array();
    var cuerpos = new Array();
    request('https://blog.segu-info.com.ar/',(err,response,body) => {
        if(!err && response.statusCode == 200){
            let $ = cheerio.load(body);
            $('.post-title','.date-posts').each(function(){
                titulos.push($(this).text());
            });

            $('.post-body','.date-posts').each(function(){
                cuerpos.push($(this).text());
            });
            $('img','.post-body').each(function(){
                urlimages.push($(this).attr('src'));
            });
            
        }
        let array = new Array();
        array = arrayNoticias;
        cargarArray(titulos,urlimages,cuerpos);
        arrayNoticias = [];
        return res.status(200).send({
            noticias: array
        });
    });
}

module.exports = {
    devolverInfo
}