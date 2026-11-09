import{
    setupHeader,
    loadProfilePicture,
    sideMenuLogic,
    updateCartQuantity,
    createSearchResultSection,
    accountMenuToggler
}from '../shared.js'

setupHeader()
loadProfilePicture()
sideMenuLogic('account-center')
updateCartQuantity()
accountMenuToggler()

//DOM
const searchInput=document.querySelector('.search-input input')
const searchResultUl=document.querySelector('.search-results ul')
const searchResultsDiv=document.querySelector('.search-results')

//Event Listeners
searchInput.addEventListener('input', ()=>{createSearchResultSection('account-center', searchInput, searchResultsDiv, searchResultUl)})