import {
    setupHeader,
    errorNotification,
    disabled,
    openDatabase,
    saveProfilePicture,
    loadProfilePicture,
    deleteProfilePicture,
    saveData,
    headerHider,
    accountMenuToggler,
    createSearchResultSection,
    sideMenuLogic,
    updateCartQuantity
} from '../shared.js'


//DOM
const newPasswordVisibility=document.querySelector('.newpass')
const confirmNewPasswordVisibility=document.querySelector('.confirmpass')
const newpassInput=document.querySelector('.new-password-input')
const confirmpassInput=document.querySelector('.confirm-new-password-input')
const formForPassChange=document.querySelector('.new-password')
const firstName=document.querySelector('.first-name')
const lastName=document.querySelector('.last-name')
const phoneNumber=document.querySelector('.phone-number')
const email=document.querySelector('.email')
const editButton=document.querySelector('.edit')
const saveButton=document.querySelector('.save')
const photoInput=document.getElementById('photo-input')
const profileRemove=document.getElementById('remove')
const profileAdd=document.getElementById('add')
const notification=document.querySelector('.notification')
const notificationTimer=document.querySelector('.notification span')
const notificationP=document.querySelector('.notification p')
const searchInput=document.querySelector('.search-input input')
const searchResultUl=document.querySelector('.search-results ul')
const searchResultsDiv=document.querySelector('.search-results')

//variable
const valuesOfInputs=[firstName, lastName, phoneNumber, email]
let notificationTimeOut;
let notificationTimerTimeOut;
const user= JSON.parse(localStorage.getItem('Personal Info'));

setupHeader()
sideMenuLogic(null)
openDatabase()
loadProfilePicture(profileRemove)
updateCartQuantity()
accountMenuToggler()

//event listener
//formForPassChange.addEventListener('')
searchInput.addEventListener('input', ()=>{createSearchResultSection('account-center', searchInput, searchResultsDiv, searchResultUl)})
window.addEventListener('scroll', headerHider)
newPasswordVisibility.addEventListener('click',()=>{
    inputType(newPasswordVisibility)
})

confirmNewPasswordVisibility.addEventListener('click',()=>{
    inputType(confirmNewPasswordVisibility)
})

saveButton.addEventListener('click', ()=>{
    const validEmail=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email.value)
    if(!validEmail &&email.value!==''){
        errorNotification('Wrong email address')
        return
    }
    if(valuesOfInputs.every((valuesOfInput)=>valuesOfInput.value!=='')){
        disabled(saveButton, firstName, lastName, phoneNumber, email)
        errorNotification('Changes saved successfully')
        saveData(firstName, lastName.value.trim(), phoneNumber.value, email.value.trim())
    }else{
        errorNotification('Please fill out all fields')
    }
})

editButton.addEventListener('click', ()=>{
    disabled(editButton, firstName, lastName, phoneNumber, email)
})

phoneNumber.addEventListener('input',()=>{
    phoneNumber.value=phoneNumber.value.replace(/\D/g, "")
})

photoInput.addEventListener('change',()=>{
    const photo=photoInput.files[0]
    if(photo){
        saveProfilePicture(photo, notification, notificationP, notificationTimer)
        loadProfilePicture(profileRemove)
    }
})

profileAdd.addEventListener('click', ()=>{
    photoInput.click()
})

profileRemove.addEventListener('click', ()=>{
    deleteProfilePicture()
    profileRemove.style.display='none'
    errorNotification('Profile picture deleted')
})

//function
function inputType(element){
    if(element===newPasswordVisibility){
        if(newPasswordVisibility.innerHTML==='visibility'){
            element.innerHTML='visibility_off'
            newpassInput.type='password'
        }else{
            element.innerHTML='visibility'
            newpassInput.type='text'
        }
    }else{
        if(element.innerHTML==='visibility'){
            element.innerHTML='visibility_off'
            confirmpassInput.type='password'
        }else{
            element.innerHTML='visibility'
            confirmpassInput.type='text'
        }
    }
}

//local storage
if(user!==null){
    firstName.value=user[0].firstName
    lastName.value=user[0].lastName
    phoneNumber.value=user[0].phoneNumber
    email.value=user[0].email
}