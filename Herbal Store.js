import {
    loadProfilePicture,
    setupHeader,
    headerHider,
    updateCartQuantity,
    createSearchResultSection,
    sideMenuLogic,
    rating
} from "./shared.js";

//DOM
const searchInput=document.querySelector('.search-input input');
const searchResultDiv=document.querySelector('.search-results')
const searchResultUl=document.querySelector('.search-results ul')
const ratedUsersDiv=document.querySelector('.rated-users')
const ratingH3=document.querySelector('.rating h3')
const ratingP=document.querySelector('.rating p')
console.log(ratedUsersDiv, ratingH3, ratingP)

//Variables
setupHeader()
loadProfilePicture()
updateCartQuantity()
sideMenuLogic(null)

//Event Listener
window.addEventListener('scroll', headerHider)
searchInput.addEventListener('input', ()=>{
    createSearchResultSection(null, searchInput, searchResultDiv, searchResultUl)
})

//Function
function renderRatedUser(){
    const reviewCount=rating.length
    const overalRatedStars=rating.reduce((total, current)=>total+current.stars, 0)/rating.length
    let fiveUserImg=[]

    for(let i=0; i<rating.length; i++){
        if(rating[i].img!=='undefined'){
            fiveUserImg.push(rating[i].img)
        }
        if(fiveUserImg.length===5){
            break
        }
    }

    ratingH3.textContent=`${overalRatedStars.toFixed(1)}/5`
    ratingP.textContent=`${reviewCount} reviews`
    ratedUsersDiv.innerHTML=''
    fiveUserImg.forEach((img)=>{
        const imgHTML=`
            <img src="${img}">
        `
        ratedUsersDiv.insertAdjacentHTML('beforeend', imgHTML)
    })
}
renderRatedUser()