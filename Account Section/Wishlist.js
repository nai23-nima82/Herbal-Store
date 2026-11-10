import{
    setupHeader,
    updateCartQuantity,
    accountMenuToggler,
    favorites,
    calculateAverageStars,
    rating,
    createSearchResultSection,
    modifyFavoritesLocalStorage,
    sideMenuLogic

} from '../shared.js'

setupHeader()
sideMenuLogic(null)
updateCartQuantity()
accountMenuToggler()

//DOM
const favoriteProductDiv=document.querySelector('.wishlist > div:first-of-type')
const searchInput=document.querySelector('.search-input input')
const searchResultUl=document.querySelector('.search-results ul')
const searchResultsDiv=document.querySelector('.search-results')
const accountMenuOpen=document.querySelector('.account-menu')
//const accountMenuClose=document.querySelector('.')
let productDivs; 

//Variable
let favoritesHTML=''
let imgHTML=''


//Event Listeners
searchInput.addEventListener('input', ()=>{createSearchResultSection('account-center', searchInput, searchResultsDiv, searchResultUl)})

//Function
function renderFavoriteProducts(){
    console.log(favorites)
    favoriteProductDiv.innerHTML=''
    if(favorites.length>=1){
        favorites.forEach((favorite)=>{
            favoritesHTML=`
                <div class="favorited-products" data-productid="${favorite.id}">
                    <a href="../Product Page.html?productid=${favorite.id}" id="product-image"><img src=".${favorite.img[0]}" alt=""></a>
                    <div class="name-price">
                        <a href="../Product Page.html?productid=${favorite.id}" id="product-name">${favorite.name}</a>
                        <span id="rating-count">
                            ${findUserImg(favorite.id)}
                        </span>
                    </div>
                    <div class="remove-rating">
                        <p id="product-rating">${calculateAverageStars(favorite, 'number')}<span class="material-symbols-outlined">star_half</span></p>
                        <button class="remove-button">X REMOVE</button>
                    </div>
                </div>
            `
            favoriteProductDiv.insertAdjacentHTML('beforeend', favoritesHTML)
        })
        productDivs=document.querySelectorAll('.favorited-products')
        removeFromFavorites()
    }else{
        favoriteProductDiv.innerHTML='<p id="empty-content">Add products to your favorite list to see them here</p>'
    }
}
function findUserImg(id){
    const usersWithImgs=rating.filter((ratings)=>ratings.img && ratings.productId===id).slice(0, 4)
    imgHTML=''
    usersWithImgs.forEach((usersWithImg)=>{
        imgHTML+=`
            <img src=".${usersWithImg.img}" alt="">
        `
    })
    return imgHTML
}

function removeFromFavorites(){
    productDivs.forEach((productDivs)=>{
        productDivs.addEventListener('click',(e)=>{
            if(e.target.className==='remove-button'){
                const productId=productDivs.dataset.productid
                const matchProduct=favorites.findIndex((favorite)=>favorite.id===productId)
                favorites.splice(matchProduct, 1)
                productDivs.remove()
                modifyFavoritesLocalStorage('save', favorites)
                if(favorites.length===0){
                    renderFavoriteProducts()
                }
            }
            
        })
    })
}

/*calling function*/
renderFavoriteProducts()