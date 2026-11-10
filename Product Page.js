import{
    createSearchResultSection,
    calculateAverageStars,
    setupObserver,
    hideDropdowns,
    sideMenuLogic
}from './shared.js'

const param=new URLSearchParams(window.location.search)
const productId=param.get('productid')
const matchedProducts=products.find((product)=>product.id===productId)
let productReviews=filterRatingById(productId);
const reviewsPerPage=4
const totalPages=Math.ceil(productReviews.length/reviewsPerPage)

function renderProductPage(){
    const productPageContent=`
        <div class="notification">
            <p></p>
            <span></span>
        </div>
        <div class="img-gallery">
            <img src="${matchedProducts.img[0]}" alt="" id="main-img">
            <div class="side-img">
                    ${renderSideImg()}
            </div>
        </div>
        <div class="info-quantity">
            <div class="price-name-rating">
                <h1 id="name">${matchedProducts.name} ${matchedProducts.inStock===false?'<b id="out-of-stock">Out of stock</b>':''}</h1>
                <h3 id="price">$${matchedProducts.price.toFixed(2)} USD</h3>
                <div>
                    <span id="rating" style="--rating-width:${(Number(overalRating('productavgstars'))/5*100)+'%'}"></span>
                    <p id="number-of-ratings">${overalRating('number')} ratings</p>
                </div>
            </div>
            <div class="description">
                <h3>Description</h3>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed fugit hic harum sunt pariatur, aperiam eum veniam ipsa ex, necessitatibus debitis corporis saepe quaerat illo asperiores recusandae autem quas fugiat?</p>
            </div>
            <div class="size-quantity">
                <div class="size">
                    <h4>SIZE</h4>
                    <input data-weight="1" type="text" value="1KG" readonly>
                    <button><span class="material-symbols-outlined arrow">keyboard_arrow_down</span></button>
                    <div class="dropdown">
                        <ul>
                            <li data-weight="1">1KG</li>
                            <li data-weight="2">2KG</li>
                            <li data-weight="3">3KG</li>
                        </ul>
                    </div>
                </div>
                <div class="quantity">
                    <h4>QTY</h4>
                    <button class="minus-b disabled-button remove" disabled>_</button>
                    <input type="number" value="1" max="5" min="1" readonly>
                    <button class="plus-b add">+</button>
                </div>
            </div>
            <div class="addtocart-container">
                <button class="addtocart">Add to Cart</button><a href="./Cart.html" class="buy-now">Buy Now</a>
            </div>
        </div>
        <div class="benefits-additionalinfo">
            <div class="left-content">
                <div>
                    <h3>hello</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime quis cum, eos, repudiandae nam saepe deleniti minus nihil praesentium aut ad nobis sapiente sint delectus laudantium voluptate illo nemo? At.</p>
                </div>
                <div>
                    <h3>hello</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime quis cum, eos, repudiandae nam saepe deleniti minus nihil praesentium aut ad nobis sapiente sint delectus laudantium voluptate illo nemo? At.</p>
                </div>
                <div>
                    <h3>hello</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime quis cum, eos, repudiandae nam saepe deleniti minus nihil praesentium aut ad nobis sapiente sint delectus laudantium voluptate illo nemo? At.</p>
                </div>
            </div>
            <div class="right-content">
                <div class="expanding-info">
                    <h3>additional <span class="material-symbols-outlined">add</span></h3>
                    <div class="text">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem, molestiae, temporibus ipsum tempora est possimus distinctio recusandae tempore ad quibusdam hic! Voluptates minima omnis dicta natus nulla quidem incidunt explicabo?</p>
                    </div>
                </div>
                <div class="expanding-info">
                    <h3>additional <span class="material-symbols-outlined">add</span></h3>
                    <div class="text">
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus iure facere accusantium minus eum fugiat beatae est nulla, laborum nemo at error dolorem neque quia eos commodi numquam aspernatur non!</p>
                    </div>
                </div>
                <div class="expanding-info">
                    <h3>additional <span class="material-symbols-outlined">add</span></h3>
                    <div class="text">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem, molestiae, temporibus ipsum tempora est possimus distinctio recusandae tempore ad quibusdam hic! Voluptates minima omnis dicta natus nulla quidem incidunt explicabo?</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="related-products">
            <h2>Related Products</h2>
            <div class="related-product-scroll-container">
                <button class="related-left"><span class="material-symbols-outlined scroll">chevron_left</span></button>
                <div>
                    ${relatedProducts()}
                </div>
                <button class="related-right"><span class="material-symbols-outlined scroll">chevron_right</span></button>
            </div>
        </div>
        <div class="customer-review">
            <h2>Customer Reviews</h2>
            <div class="overall-rating-section">
                <div>
                    <div class="number-of-stars">
                        <span class="overall-rated-stars" style="--rating-width:${(Number(overalRating('productavgstars'))/5*100)+'%'}"></span>
                        <p>${overalRating('productavgstars')} out of 5</p>
                    </div>
                    <p>Based on ${overalRating('number')} reviews</p>
                </div>
                <div class="rated-stars-overview">
                    <div class="stars-span">
                        <span></span><span></span><span></span><span></span><span></span>
                    </div>
                    <div class="stars-percent">
                        <div style="--slider-width: ${overalRating('eachstar', 1, 'percent')+'%'}"></div>
                        <div style="--slider-width: ${overalRating('eachstar', 2, 'percent')+'%'}"></div>
                        <div style="--slider-width: ${overalRating('eachstar', 3, 'percent')+'%'}"></div>
                        <div style="--slider-width: ${overalRating('eachstar', 4, 'percent')+'%'}"></div>
                        <div style="--slider-width: ${overalRating('eachstar', 5, 'percent')+'%'}"></div>
                    </div>
                    <div class="stars-people">
                        <p>${overalRating('eachstar', 1, 'people')}</p>
                        <p>${overalRating('eachstar', 2, 'people')}</p>
                        <p>${overalRating('eachstar', 3, 'people')}</p>
                        <p>${overalRating('eachstar', 4, 'people')}</p>
                        <p>${overalRating('eachstar', 5, 'people')}</p>
                    </div>
                </div>
                <button id="write-a-comment">Write a comment</button>
            </div>
            <div>
                
            </div>
        </div>
        <div class="pagination">
            <span class="material-symbols-outlined previous">arrow_left</span>
            <input type="number" id="pagi-input" value="1">
            <span class="material-symbols-outlined next">arrow_right</span>
            <p>of <b id="total-pages-b">X</b> pages</p>
        </div>
    `
    document.querySelector('main').insertAdjacentHTML('beforeend', productPageContent)
}

import {
    loadProfilePicture,
    setupHeader,
    errorNotification,
    renderRatedStars,
    addOrMinusInputValue,
    updateCart,
    headerHider,
    rating,
    setNumber,
    updateCartQuantity,
    products,
    modifyPagination,
    modifyPaginationButton
} from './shared.js'
setupHeader()
sideMenuLogic(null)
loadProfilePicture()
renderProductPage()

//DOM
const sizeInput= document.querySelector('.size input')
const sizeQuantityDiv=document.querySelector('.size-quantity')
const buttonsDiv=document.querySelector('.addtocart-container')
const quantityInput= document.querySelector('.quantity input')
const sizeInputbutton= document.querySelector('.size > button')
const quantityMibusButton= document.querySelector('.minus-b')
const quantityPlusButton= document.querySelector('.plus-b')
const sizeDropdown=document.querySelector('.size > .dropdown')
const sizeDropdownLi=document.querySelectorAll('.size > .dropdown li')
const expandingInfoH3=document.querySelectorAll('.expanding-info h3')
const addToCart=document.querySelector('.addtocart')
const mainImg=document.getElementById('main-img')
const leftScrollButton=document.querySelector('.left')
const rightScrollButton=document.querySelector('.right')
const sideImgDiv=document.querySelector('.side-img')
const sideImgs=document.querySelectorAll('.side-img img')
const userReviewDiv=document.querySelector('.customer-review > div:last-child')
const relatedProductsContainer=document.querySelector('.related-product-scroll-container > div')
const relatedProsuctScrollRightButton=document.querySelector('.related-right')
const relatedProsuctScrollLeftButton=document.querySelector('.related-left')
const nextPagination=document.querySelector('.next')
const previousPagination=document.querySelector('.previous')
const pagiInput=document.getElementById('pagi-input')
const relatedProductDiv=document.querySelector('.related-product-scroll-container > div');
const searchInput=document.querySelector('.search-input input')
const searchResultUl=document.querySelector('.search-results ul')
const searchResultsDiv=document.querySelector('.search-results')
const relatedProductsImages=document.querySelectorAll('.related-product-img')
setupObserver(relatedProductsImages, relatedProductsContainer, 'left')

//variable
let page=1
let customerReviewHTML=''
const numberOfPages=Math.ceil(productReviews.length/reviewsPerPage)

renderSideImg()
modifyPagination('none', numberOfPages)
modifyPaginationButton(totalPages)

//event listeners
searchInput.addEventListener('input', ()=>{createSearchResultSection(null, searchInput, searchResultsDiv, searchResultUl)})
pagiInput.addEventListener('input', ()=>{
    modifyPaginationButton(totalPages, (nextPage)=>{
        page=nextPage
        renderProductRating()
    })
})
nextPagination.addEventListener('click', ()=>{
    modifyPagination('next',totalPages, (nextPage)=>{
        page=nextPage
        renderProductRating()
    })
})
previousPagination.addEventListener('click', ()=>{
    modifyPagination('previous', totalPages, (nextPage)=>{
        page=nextPage
        renderProductRating()
    })
})
window.addEventListener('resize', ()=>{
    setUpRelatedProductScroll()
})
window.addEventListener('scroll', headerHider)
window.addEventListener('click', (e)=>{hideDropdowns(e)})

relatedProsuctScrollRightButton.addEventListener('click', ()=>{
    relatedProductDiv.scrollBy({left:50, behavior:'smooth'})
    setUpRelatedProductScroll()
})

relatedProsuctScrollLeftButton.addEventListener('click', ()=>{
    relatedProductDiv.scrollBy({left:-50, behavior:'smooth'})
    setUpRelatedProductScroll()
})

relatedProductDiv.addEventListener('scroll', setUpRelatedProductScroll)

sideImgs.forEach((sideImage)=>{
    sideImage.addEventListener('click', ()=>{
        const src=sideImage.src
        mainImg.src=src
    })
})

sizeInputbutton.addEventListener('click', ()=>{
    dropdownControl()
})

quantityMibusButton.addEventListener('click',()=>{
    addOrMinusInputValue(quantityMibusButton, quantityPlusButton, quantityInput)
})

quantityPlusButton.addEventListener('click',()=>{
    addOrMinusInputValue(quantityPlusButton, quantityMibusButton, quantityInput)
})

sizeDropdownLi.forEach((sizeDropdownLis)=>{
    sizeDropdownLis.addEventListener('click', ()=>{
        sizeInput.value=sizeDropdownLis.textContent
        sizeInput.dataset.weight=sizeDropdownLis.dataset.weight
        dropdownControl()
    })
})

addToCart.addEventListener('click', ()=>{
    updateCart(productId, Number(sizeInput.dataset.weight), Number(quantityInput.value))
})

expandingInfoH3.forEach((expandingInfoH3s)=>{
    expandingInfoH3s.addEventListener('click', ()=>{
        expandingInfoH3.forEach((other)=>{
            const nextOtherElement=other.nextElementSibling
            nextOtherElement.style.height='0px'
            other.children[0].textContent='add'
        })
        const nextElement=expandingInfoH3s.nextElementSibling
        
        const hasHeight=getComputedStyle(nextElement).height
        if(hasHeight!=='0px'){
            nextElement.style.height='0px'
            expandingInfoH3s.children[0].textContent='add'
        }else{
            nextElement.style.height=nextElement.scrollHeight+'px'
            expandingInfoH3s.children[0].textContent='minimize'
        }
        
    })
})

//funstions
function dropdownControl(){
    sizeInputbutton.children[0].classList.toggle('rotate')
    sizeDropdown.classList.toggle('visibility')
}

function overalRating(part, stars, method){
    
    if(part==='number'){
        return productReviews.length
    }else if(part==='productavgstars'){
        const averageStars=productReviews.reduce((total, current)=>total+current.stars, 0)/productReviews.length
        return averageStars.toFixed(1)
    }else if(part==='eachstar'){
        const eachStarReviewCount=productReviews.filter((productReview)=>productReview.stars===stars)
        const percent=(eachStarReviewCount.length/productReviews.length)*100
        return method==='percent'?percent:eachStarReviewCount.length
        
    }
    
}

function filterRatingById(id){
    return rating.filter((ratings)=>ratings.productId===id)
}

function renderSideImg(){
    return matchedProducts.img.map((img)=>{
        return `<img loading="lazy" src="${img}">`
    }).join(" ")
}

function relatedProducts(){
    let sameCategoryProductsHTML=''
    const relatedProducts=products.filter((product)=>product.category===matchedProducts.category && product.id!==matchedProducts.id).slice(0, 7)
    relatedProducts.forEach((product, index)=>{
        sameCategoryProductsHTML+=`
            <a class="related-product-link" href="Product Page.html?productid=${product.id}">
                <div class="product">
                    <img class="related-product-img" data-src="${product.img[0]}" alt="">
                    <p id="related-product-name">${product.name}</p>
                    <h4 id="related-product-price">$${product.price.toFixed(2)}</h4>
                    <span class="related-product-rating" style="--rating-width: ${calculateAverageStars(product, 'percent')+'%'}"></span>
                </div>
            </a>
        `
    })
    return sameCategoryProductsHTML
}

function setUpRelatedProductScroll(){
    const hasLeftScroll=relatedProductDiv.scrollLeft
    const clientWidth=relatedProductDiv.clientWidth
    const totalScroll=relatedProductDiv.scrollWidth

    if(totalScroll<=clientWidth){
        relatedProductDiv.style.justifyContent='center'
        relatedProsuctScrollLeftButton.style.display='none'
        relatedProsuctScrollRightButton.style.display='none'
    }else{
        relatedProductDiv.style.justifyContent=''
        relatedProsuctScrollLeftButton.style.display='block'
        relatedProsuctScrollRightButton.style.display='block'
    }

    if(hasLeftScroll<=0){
        relatedProsuctScrollLeftButton.disabled=true
        relatedProsuctScrollLeftButton.classList.add('disabled-scroll')
    }else{
        relatedProsuctScrollLeftButton.disabled=false
        relatedProsuctScrollLeftButton.classList.remove('disabled-scroll')
    }

    if(clientWidth+hasLeftScroll>=totalScroll){
        relatedProsuctScrollRightButton.disabled=true
        relatedProsuctScrollRightButton.classList.add('disabled-scroll')
    }else{
        relatedProsuctScrollRightButton.disabled=false
        relatedProsuctScrollRightButton.classList.remove('disabled-scroll')
    }
}
function calculateUserRating(numberOfStars){
    return (numberOfStars*100)/5
}
function renderProductRating(){
    const start=(page-1)*reviewsPerPage
    const end=start+reviewsPerPage
    let reviewsToShow;
    if(productReviews.length){
        reviewsToShow=productReviews.slice(start, end)
        userReviewDiv.innerHTML=''
        reviewsToShow.forEach((review, i)=>{
            customerReviewHTML=`
                <div class="user-comment">
                    <div>
                        <span class="user-rating" style="--rating-width:${calculateUserRating(review.stars)+'%'}"></span>
                        <img class="user-image" data-src="${review.img?review.img:'./Image/user-icon.png'}" alt="" id="user-img">
                        <h4 id="user-name">${review.name}</h4>
                        <p id="user-comment">${review.comment}</p>
                    </div>
                    <div class="date-written">${review.date}</div>
                </div>
            `
            userReviewDiv.insertAdjacentHTML('beforeend', customerReviewHTML)
        })
        const userImages=document.querySelectorAll('.user-image')
        setupObserver(userImages, null, 'top')
        return
    }

}
function makeCartButtons(){
    if(!matchedProducts.inStock){
        buttonsDiv.classList.add('no-content')
        sizeQuantityDiv.classList.add('no-content')
    }else{
       buttonsDiv.classList.add('available')
        sizeQuantityDiv.classList.add('available') 
    }
}
//Calling function
overalRating('numberofeachstars')
relatedProducts()
updateCartQuantity()
setUpRelatedProductScroll()
renderProductRating()
makeCartButtons()