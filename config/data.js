let data = [[123,"ru"]]

function add_or_replace(id,lang){
    for (let i in data){
        console.log(i)
        if(data[i][0]==id){
            if(data[i][1]=="ru"&&lang=="en"){
                data[i][1] = "en"
                return
            }else if(data[i][1]=="en"&&lang=="ru"){
                data[i][1] = "ru"
                return
            }
            return
        }
    }
    data.push([id,lang])
    
}
function pull(){
    return data
}


module.exports = {
    "add":add_or_replace,
    "pull":pull
}