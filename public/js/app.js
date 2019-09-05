
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#p1');
const messageTwo = document.querySelector('#p2');
const messageThree = document.querySelector('#p3');

weatherForm.addEventListener('submit',(e)=> {
    e.preventDefault()
    const location = search.value
   
    fetch(`/weather?address=${location}`).then((response)=>
    {
        response.json().then((data)=>
        {
            if(data.error)
            {
                messageOne.textContent = data.error;
            }
            else
            {
                messageOne.textContent = "Current Temp for: " + data.location 
                messageTwo.textContent = data.temp + " degrees Celsius";
                messageThree.textContent ="Conditions: "+  data.summary;
            }
        })
    });

})