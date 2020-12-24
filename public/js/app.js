console.log("helo javascript")




const submitLocation= document.getElementById("locationForm")
const search = document.getElementById("locationInput")
const messageFirst = document.getElementById("message1")
const messageSecond = document.getElementById("message2")


submitLocation.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value
    messageFirst.textContent = 'Waiting for info...'
    messageSecond.textContent = ''
    console.log(location)
    fetch('http://localhost:3000/weather?address='+ location).then((response)=>{
    response.json().then((data) =>{
        if(data.error){
            messageFirst.textContent = data.error
        } else {
            messageFirst.textContent =data.location
            messageSecond.textContent = data.forecast
        }
    })
})
})
