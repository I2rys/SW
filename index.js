//Dependencies
const Request = require("request")
const Groom = require("groom")
const Fs = require("fs")

//Variables
const Self_Args = process.argv.slice(2)

//Main
if(!Self_Args.length){
    console.log("node index.js <url> <output>")
    process.exit()
}

if(!Self_Args[1]){
    console.log("Invalid output.")
    process.exit()
}

Request(Self_Args[0], function(err, res, body){
    if(err){
        console.log("Unable to make a request on the url.")
        process.exit()
    }

    var strings = body.match(/\w+.|.*/g)
    
    for( i in strings ){
        if(!strings[i]){
            delete strings[i]
            strings = Groom(strings)
        }else{
            console.log(strings[i])
        }
    }

    Fs.writeFileSync(Self_Args[1], JSON.stringify(strings, null, 2))
    console.log(`[!] Results has been saved to ${Self_Args[1]}`)
})
