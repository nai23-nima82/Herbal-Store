import {setupHeader, 
    loadProfilePicture, 
    updateCartQuantity, 
    headerHider,
    createSearchResultSection,
    sideMenuLogic
} from "./shared.js"

setupHeader()
sideMenuLogic(null)
loadProfilePicture()
updateCartQuantity()

//DOM
const searchInput=document.querySelector('.search-input input')
const searchResultUl=document.querySelector('.search-results ul')
const searchResultsDiv=document.querySelector('.search-results')

//Event Listener
searchInput.addEventListener('input', ()=>{createSearchResultSection(null, searchInput, searchResultsDiv, searchResultUl)})
window.addEventListener('scroll', headerHider)