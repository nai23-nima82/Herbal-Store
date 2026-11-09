import { setupHeader,
    loadProfilePicture,
    errorNotification,
    updateCartQuantity,
    emailFormatValidator,
    headerHider,
    createSearchResultSection,
    sideMenuLogic
} from "./shared.js";

setupHeader()
sideMenuLogic(null)
loadProfilePicture()
updateCartQuantity()
createSearchResultSection()

//DOM
const form=document.getElementById('message-form')
const searchInput=document.querySelector('.search-input input')
const searchResultUl=document.querySelector('.search-results ul')
const searchResultsDiv=document.querySelector('.search-results')

//variables


//event listener
searchInput.addEventListener('input', ()=>{createSearchResultSection(null, searchInput, searchResultsDiv, searchResultUl)})
form.addEventListener('submit', (event)=>{
    event.preventDefault()

    const formData=new FormData(form)

    const name=formData.get('name')
    const email=formData.get('email')
    const text=formData.get('message')

    if(name && email && text){
        emailFormatValidator(email)
    }else{
        errorNotification('Please fillout all fields')
        return
    }
    
    form.reset()
})

window.addEventListener('scroll', headerHider)
searchInput.addEventListener('input', createSearchResultSection)