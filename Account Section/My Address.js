import {
    errorNotification,
    setupHeader,
    disabled,
    saveData,
    loadProfilePicture,
    headerHider,
    updateCartQuantity,
    createSearchResultSection,
    sideMenuLogic,
    accountMenuToggler
} from '../shared.js'

//DOM
const cityInput=document.querySelector('.city-option input')
const countryInput=document.querySelector('.country-option input')
const countryDropdown=document.querySelector('.country-option div')
const cityDropdown=document.querySelector('.city-option div')
const countryUl=document.querySelector('.country-option > div > ul')
const cityUl=document.querySelector('.city-option > div > ul')
const cityLoading=document.querySelector('.city-option > span')
const countryLoading=document.querySelector('.country-option > span')
const saveButton=document.getElementById('save-address')
const zipCodeInput=document.getElementById('zip-code')
const streetAddressInput=document.getElementById('street-address')
const editButton=document.querySelector('.edit')
const notification=document.querySelector('.notification')
const notificationTimer=document.querySelector('.notification span')
const notificationP=document.querySelector('.notification p')
const accountCenterOption=document.querySelector('.account-center-option')
const accountMenuButton=document.getElementById('account-menu')
const accountMenuCloseButton=document.querySelector('.backarrow')
const searchInput=document.querySelector('.search-input input')
const searchResultUl=document.querySelector('.search-results ul')
const searchResultsDiv=document.querySelector('.search-results')

//Variables
let countries;
let cities;
let filteredCountry;
let cityLi;
let countryLi;
const location=JSON.parse(localStorage.getItem('Address'))

setupHeader()
sideMenuLogic(null)
loadProfilePicture()
updateCartQuantity()
accountMenuToggler()

//Event listener
searchInput.addEventListener('input', ()=>{createSearchResultSection('account-center', searchInput, searchResultsDiv, searchResultUl)})
window.addEventListener('scroll', headerHider)
document.addEventListener('click',(e)=>{
    if(!cityInput.contains(e.target) && !cityDropdown.contains(e.target)){
        cityDropdown.classList.remove('active')
    }
    if(!countryInput.contains(e.target) && !countryDropdown.contains(e.target)){
        countryDropdown.classList.remove('active')
    }
})
countryInput.addEventListener('input', ()=>{
    if(countryInput.value){
        showHideLoationDropdown(countryInput, 'open')
        getCountry()
    }else{
        countryDropdown.classList.remove('active')
        countryInput.removeAttribute('data-alpha2')
        countryInput.removeAttribute('data-countryname')
        delete cityInput.dataset.cityname
        cityInput.value=''
    }
})
cityInput.addEventListener('input',()=>{
    if(cityInput.value){
        showHideLoationDropdown(cityInput, 'open')
        getCities()
    }else{
        cityDropdown.classList.remove('active')
        delete cityInput.dataset.cityname
    }
    
})
saveButton.addEventListener('click', ()=>{
    
    if(
        countryInput.dataset.countryname &&
        cityInput.dataset.cityname &&
        zipCodeInput.value.trim()!=='' &&
        streetAddressInput.value.trim()!==''
    ){
        errorNotification('Changes saved successfully')
        disabled(saveButton, cityInput, countryInput, zipCodeInput, streetAddressInput)
        saveData(countryInput, cityInput.dataset.cityname, zipCodeInput.value.trim(), streetAddressInput.value.trim())
    }else{
        errorNotification('Please fill out all fields')
    }
})
editButton.addEventListener('click', ()=>{
    disabled(editButton, cityInput, countryInput, zipCodeInput, streetAddressInput)
})
zipCodeInput.addEventListener('input',()=>{
    zipCodeInput.value=zipCodeInput.value.replace(/\D/g, '')
})

//Function
function showHideLoationDropdown(element, type, location){
    if(type==='open'){
        if(element===countryInput){
            countryDropdown.classList.add('active')
        }else{
            cityDropdown.classList.add('active')
        }
    }else{
        if(element===countryDropdown){
            countryDropdown.classList.remove('active')
            countryInput.value=location
        }else{
            cityDropdown.classList.remove('active')
            cityInput.value=location
        }
    }
}

async function getCountry(){
    countryLoading.classList.add('active')
    try{
        const response= await fetch('https://countries.dev/countries')
        if(!response.ok){
            throw new Error(`error ${response.status}`)
        }
        const data= await response.json()
        countries=data
        countryLoading.classList.remove('active')
    }catch(error){
        errorNotification(error, cityDropdown)
        countryLoading.classList.remove('active')
    }
    if(countries){
        filterCountry()
    }
}

async function getCities(){
    cityLoading.classList.add('active')
    try{
        const response= await fetch(`https://countries.dev/cities?country=${countryInput.dataset.alpha2}`)
        if(!response.ok){
            throw new Error(`error ${response.status}`)
        }
        const data= await response.json()
        
        cities=data
        cityLoading.classList.remove('active')
        createLi('city')
    }catch(error){
        errorNotification(error, cityDropdown)
        cityLoading.classList.remove('active')
    }
    
}

function filterCountry(){
    filteredCountry=countries.filter((country)=>country.name.toLowerCase().includes(countryInput.value.toLowerCase().trim()))
    createLi('country')
}

function createLi(section){
    if(section==='country'){
        countryUl.innerHTML=''
        filteredCountry.forEach((filteredCountries)=>{
            const li=document.createElement('li')
            li.dataset.countryname=filteredCountries.name
            li.dataset.alpha2=filteredCountries.alpha2Code
            li.textContent=filteredCountries.name
            countryUl.appendChild(li)
        })
        countryLi=document.querySelectorAll('.country-option li')

        countryLi.forEach((countryLis)=>{
            countryLis.addEventListener('click', ()=>{
                countryInput.dataset.countryname=countryLis.dataset.countryname
                countryInput.dataset.alpha2=countryLis.dataset.alpha2
                showHideLoationDropdown(countryDropdown, 'close', countryLis.dataset.countryname)
            })
        })
    }else{
        cityUl.innerHTML=''
        cities.forEach((city)=>{
           const li=document.createElement('li')
            li.dataset.name=city.name
            li.textContent=city.name
            cityUl.appendChild(li)
        })
        
        cityLi=document.querySelectorAll('.city-option li')

        cityLi.forEach((cityLis)=>{
            cityLis.addEventListener('click', ()=>{
                cityInput.dataset.cityname=cityLis.dataset.name
                showHideLoationDropdown(cityDropdown, 'close', cityLis.dataset.name)
            })
        })
        
        
    }
}

//local storage
if(location && location.address!==null){
    console.log(location)
    countryInput.value=location[0].country
    cityInput.value=location[0].city
    zipCodeInput.value=location[0].zipCode
    streetAddressInput.value=location[0].streetAddress
}