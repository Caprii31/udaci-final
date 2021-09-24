import './styles/styles.scss'
import image from './images/home-1.jpg'
//  import html from './views/index.html'


//important variables =====> API data
const startDate = document.getElementById('start-date')
const endDate = document.getElementById('end-date')
const btn = document.getElementById('sub')
const allData = {}




btn.addEventListener('click', generate)

async function generate(event){
    event.preventDefault()

    const locationValue = document.getElementById('location').value
    getWeather('http://localhost:3000/userData', {location:locationValue, dateValue: startDate.value})
}
      


const getWeather = async(url='', data={})=>{
    console.log(data);
    const res = await fetch(url,{
        method: 'POST',
        credentials: 'same-origin',
        headers: {
           
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try{
        const dataBack = await res.json();
        console.log(dataBack)
        return dataBack
    }
    catch(e){
        console.log('error',e)
    }
}

// important variables ====> UI 
const mobileMenu = document.getElementById('mobi-menu')
const navLinks = document.getElementById('nav-links')
const navbarMenu = document.getElementById('nav-menu')
const toggleMenu = document.getElementById('toggle')
const mainImage = document.createElement('img')


// activate mobile menue

mobileMenu.addEventListener('click', activateMobiMenu)

function activateMobiMenu(){
    mobileMenu.classList.toggle('is-active')
    navbarMenu.classList.toggle('active')
}

mainImage.setAttribute('src',image)
console.log(mainImage)

document.querySelector('.home_container').appendChild(mainImage)