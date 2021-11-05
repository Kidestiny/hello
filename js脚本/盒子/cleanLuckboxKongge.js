var fs = require('fs');

var str=fs.readFileSync('./luckbox.js','utf8');
str = str.replace(/\ +/g,"");   
       
str = str.replace(/[\r\n]/g,"");        
console.log(str);

fs.writeFile('./luckboxTest.js',str,(error)=>{
    if(error){
        console.log('wrong');
    }else{
        console.log('succeed');
    }
})
fs.writeFile('./test_data.json',str,(error)=>{
    if(error){
        console.log('wrong');
    }else{
        console.log('succeed');
    }
})