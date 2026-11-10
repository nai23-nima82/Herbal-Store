import {
    setupHeader,
    headerHider,
    updateCartQuantity,
    errorNotification,
    products,
    rating,
    calculateAverageStars,
    calculateDiscount,
    createSearchResultSection,
    modifyPagination,
    modifyPaginationButton,
    favorites,
    modifyFavoritesLocalStorage,
    setupObserver,
    sideMenuLogic,
    updateCart,
    cart
} from './shared.js';

//Variable
let targetMaxPrice;
let currentPage=1
let animationIdForMaxPrice;
let filterResult;
let category='all-products'
let viewType='grid'
let perPageProducts=10
let totalPages;

//DOM
const filteringH4=document.querySelectorAll('.filtering > h4')
const maxPriceRange=document.getElementById('max-price')
const maxPrice=document.getElementById('max')
const categoryLis=document.querySelectorAll('.category-content li')
const ratingRadioP=document.querySelectorAll('.filtering-by-stars li > p:last-child')
const instockCheckbox=document.getElementById('instock')
const discountCheckbox=document.getElementById('discount')
const ratingRadio=document.querySelectorAll('.filtering-by-stars input[type="radio"]')
const viewSwitch=document.querySelectorAll('.view')
const productContainer=document.querySelector('.products-cart-container')
const clearFilterButton=document.getElementById('clear-filter')
const numberOfDisplayedProducts=document.getElementById('number-of-displayed-products')
const paginationInput=document.getElementById('pagi-input')
const previousSpan=document.querySelector('.previous')
const nextSpan=document.querySelector('.next')
const filteringPanel=document.querySelector('.filtering')
const filterToggle=document.querySelector('.filter')
const overlay=document.querySelector('.overlay')
const filterBackArrow=document.querySelector('.filtering > .material-symbols-outlined')
const searchInput=document.querySelector('.search-input input')
const searchResultUl=document.querySelector('.search-results ul')
const searchResultsDiv=document.querySelector('.search-results')

let displayedMaxPrice=Number(maxPriceRange.value)
setupHeader()
sideMenuLogic(null)
updateCartQuantity()
renderProducts(products)
changeStarRatingProductCount()
changeCategoryProductCount()

//Event listener
searchInput.addEventListener('input', ()=>{createSearchResultSection(null, searchInput, searchResultsDiv, searchResultUl)})
window.addEventListener('resize',()=>{
    if(!window.matchMedia('(max-width:860px)').matches){
        overlay.style.display=''
        filterBackArrow.style.display=''
        filteringPanel.classList.remove('active')
    }
})
window.addEventListener('scroll', headerHider)

nextSpan.addEventListener('click', ()=>{
    modifyPagination('next', totalPages, (nextPage)=>{
        currentPage=nextPage
        renderProducts(filterResult, viewType, currentPage)
    })
})

previousSpan.addEventListener('click', ()=>{
    modifyPagination('previous', totalPages, (nextPage)=>{
        currentPage=nextPage
        renderProducts(filterResult, viewType, currentPage)
    })
})

paginationInput.addEventListener('input', ()=>{
    if(paginationInput.value>totalPages){
        paginationInput.value=totalPages
    }else if(Number(paginationInput.value)===0){
        paginationInput.value=1
    }
    modifyPaginationButton(totalPages, (nextPage)=>{
        currentPage=nextPage
        renderProducts(filterResult, viewType, currentPage)
    })
    
})

filterToggle.addEventListener('click', ()=>{
    filteringPanel.classList.add('active')
    overlay.style.display='block'
    filterBackArrow.style.display='block'
})

filterBackArrow.addEventListener('click', ()=>{
    filteringPanel.classList.remove('active')
    overlay.style.display='none'
    filterBackArrow.style.display='none'
})

filteringH4.forEach((h4)=>{
    h4.addEventListener('click', ()=>{
        filteringH4Dropdown(h4)
    })
})

ratingRadio.forEach((radios)=>{
    radios.addEventListener('change', filteringProducts)
})

maxPriceRange.addEventListener('input',()=>{
    targetMaxPrice=Number(maxPriceRange.value)
    cancelAnimationFrame(animationIdForMaxPrice)
    animationIdForMaxPrice=requestAnimationFrame(animateMaxPrice)
    filteringProducts()
    changeStarRatingProductCount(category, targetMaxPrice)
})

categoryLis.forEach((categoryLi)=>{
    categoryLi.addEventListener('click', ()=>{
        const url=new URL(window.location.href)
        url.searchParams.delete('category')
        history.replaceState({}, '', url)
        categoryLis.forEach((other)=>{
            other.classList.remove('active-category')
        })
        categoryLi.classList.add('active-category')
        category=categoryLi.dataset.category

        maxPriceRange.value=50
        ratingRadio.forEach((radio)=>{
            radio.checked=false
        })
        instockCheckbox.checked=false
        discountCheckbox.checked=false

        filteringProducts()
        changeStarRatingProductCount(category)

    })
})

viewSwitch.forEach((view)=>{
    view.addEventListener('click',()=>{
        viewSwitch.forEach((other)=>{
            other.classList.remove('active')
        })
        view.classList.add('active')
        viewType=view.dataset.view
        console.log(view.dataset.view)
        renderProducts(filterResult, view.dataset.view, currentPage)
    })
})

clearFilterButton.addEventListener('click', ()=>{
    ratingRadio.forEach((radios)=>{
        radios.checked=false
    })
    filteringProducts()
})

instockCheckbox.addEventListener('change', ()=>{
    filteringProducts()
    changeStarRatingProductCount(category, targetMaxPrice, instockCheckbox.checked)
})
discountCheckbox.addEventListener('change', ()=>{
    filteringProducts()
    changeStarRatingProductCount(category, targetMaxPrice,instockCheckbox.checked, discountCheckbox.checked)
})

//Function
function filteringH4Dropdown(element){
    const arrow=element.childNodes[1]
    const dropdown=element.nextElementSibling
    const height=dropdown.scrollHeight

    dropdown.style.height=height+'px'
    dropdown.offsetHeight
    if(!arrow.classList.contains('rotate')){
        dropdown.style.height='0px'
        arrow.classList.add('rotate')
    }else{
        dropdown.style.height=height + 'px'
        arrow.classList.remove('rotate')
    }
}

function animateMaxPrice(){
    const difference=targetMaxPrice-displayedMaxPrice

    if(Math.abs(difference)<0.5){
        displayedMaxPrice=targetMaxPrice
    }else{
        displayedMaxPrice+=difference*0.15

    }
    maxPrice.textContent='$'+Math.round(displayedMaxPrice)

    if(displayedMaxPrice !== targetMaxPrice){
        animationIdForMaxPrice=requestAnimationFrame(animateMaxPrice)
    }
}
function renderProducts(selectedProducts, view='grid', currentPage=1){
    let productsHTML=''
    let productsInPage;
    productContainer.innerHTML=''
    if(selectedProducts.length>perPageProducts){
        const start=(currentPage-1)*perPageProducts
        const end=start+perPageProducts
        productsInPage=selectedProducts.slice(start, end)
    }else{
        productsInPage=selectedProducts
    }
    productsInPage.forEach((product, index)=>{
        productsHTML=`
            <div class="${view==='grid'?'grid':'list'} ${product.inStock?'':'out-of-stock-div'}">
                <a class="${view==='grid'?'product-image-a-grid':'product-image-a-list'}" href="./Product Page.html?productid=${product.id}">
                    <img id="${view==='grid'?'image-grid':'image-list'}" class="product-image" data-src="${product.img[0]}" alt="">
                </a>
                <div class="${view==='grid'?'spec-grid':'spec-list'}">
                    <a class="product-name-a" href="./Product Page.html?productid=${product.id}">${product.name}</a>
                    <div class="rating">
                        <span style="--rating-width:${calculateAverageStars(product, 'percent')}%"></span>
                        <p>(${calculateAverageStars(product, 'numberofreviews').length})</p>
                    </div>
                    <h4 id="price"> ${product.discount>0?`<s id="discount-s">$${product.price}</s> $${calculateDiscount(product)}`:`$${product.price.toFixed(2)}`}<span id="unit">/KG</span></h4>
                    <button class="add-to-cart" data-productid="${product.id}"${product.inStock?'':'disabled'}>Add to Cart</button>
                </div>
                <span class="material-symbols-outlined favorite" data-productid="${product.id}">${findProductInFavorites(product)?'heart_minus':'heart_plus'}</span>
            </div>
        `
        productContainer.insertAdjacentHTML('beforeend', productsHTML)
    })
    const allImages=document.querySelectorAll('.product-image')
    setupObserver(allImages, null, 'top')
    addToFavoritesLogic()
    addToCartButtonLogic()
}

function filteringProducts(){
    const url=new URLSearchParams(window.location.search)
    const filterParam=url.get('category')
    if(filterParam){
        category=filterParam
        categoryLis.forEach((categoryLi)=>{
            if(categoryLi.dataset.category!==category){
                categoryLi.classList.remove('active-category')
            }else{
                categoryLi.classList.add('active-category')
            }
        })
    }
    changeStarRatingProductCount(category)
    const selectedPrice=Number(maxPriceRange.value)
    const selectedStarRange=[...ratingRadio].filter((ratingRadios)=>ratingRadios.checked)
    const starCount=parseInt(selectedStarRange[0]?.value);
    const isInStock=instockCheckbox.checked
    const hasDiscount=discountCheckbox.checked

    if(category==='all-products'){
        if(selectedPrice){
            filterResult=products.filter((product)=>product.price <= selectedPrice)
        }
        if(starCount){
            filterResult=filterResult.filter((product)=>Number(calculateAverageStars(product, 'number'))>=starCount && Number(calculateAverageStars(product, 'number'))<starCount+1)

        }
        if(isInStock){
            filterResult=filterResult.filter((product)=>product.inStock)
        }
        if(hasDiscount){
            filterResult=filterResult.filter((product)=>product.discount>0)
        }
        numberOfDisplayedProducts.textContent=`Showing ${filterResult.length} of ${products.length} products`
    }else{
        filterResult=products.filter((product)=>product.category===category)

        if(selectedPrice){
            filterResult=filterResult.filter((productFilter)=>productFilter.price<=selectedPrice)
        }
        if(starCount){
            filterResult=filterResult.filter((productFilter)=>Number(calculateAverageStars(productFilter, 'number'))>=starCount && Number(calculateAverageStars(productFilter, 'number'))<starCount+1)
        }
        if(isInStock){
            filterResult=filterResult.filter((product)=>product.inStock)
        }
        if(hasDiscount){
            filterResult=filterResult.filter((product)=>product.discount>0)
        }
        
        numberOfDisplayedProducts.textContent=`Showing ${filterResult.length} of ${products.length} products`
    }
    totalPages=Math.ceil(filterResult.length/perPageProducts)
    renderProducts(filterResult, viewType)
    modifyPagination('none', totalPages, (nextPage)=>{
        currentPage=nextPage
        renderProducts(filterResult, viewType, currentPage)
    })
    
    modifyPaginationButton(totalPages, (nextPage)=>{
        currentPage=nextPage
        renderProducts(filterResult, viewType, currentPage)
    })
}

function changeStarRatingProductCount(cat='all-products', price, inStock, discount){
    ratingRadioP.forEach((ratingRadioPs, index)=>{
        let productsInEachSStar;

        if(cat==='all-products'){
            productsInEachSStar=products.filter((product)=>Number(calculateAverageStars(product, 'number'))>=index+1 && Number(calculateAverageStars(product, 'number'))<index+2)
        }else{
            const byCategory=products.filter((product)=>product.category===cat)
            productsInEachSStar=byCategory.filter((product)=>Number(calculateAverageStars(product, 'number'))>=index+1 && Number(calculateAverageStars(product, 'number'))<index+2)
        }
        if(price){
            productsInEachSStar=productsInEachSStar.filter((product)=>product.price<=price)
        }
        if(inStock){
            productsInEachSStar=productsInEachSStar.filter((product)=>product.inStock)
        }
        if(discount){
            productsInEachSStar=productsInEachSStar.filter((product)=>product.discount>0)
        }
        ratingRadioPs.textContent=`(${productsInEachSStar.length})`
        
    })
}

function changeCategoryProductCount(){
    categoryLis.forEach((categoryLi, index)=>{
        const productCount=products.filter((product)=>product.category===categoryLi.dataset.category)
        const p=categoryLi.querySelector('p:last-child')
        p.textContent=index===0?products.length:productCount.length
    })
}

function maximumPriceRange(){
    const theMostExpensive= Math.max(...products.map((product)=>product.price))
    maxPriceRange.max=Math.ceil(theMostExpensive)
    maxPriceRange.value=Math.ceil(theMostExpensive)
    maxPrice.textContent='$'+Math.ceil(theMostExpensive)
}

function findProductInFavorites(product){
    if(favorites){
        const found=favorites.find((favorite)=>favorite.id===product.id)
        return found
    }
}
function addToFavoritesLogic(){
    const addToFavorites=document.querySelectorAll('.favorite')
    addToFavorites.forEach((favorite)=>{
        favorite.addEventListener('click', ()=>{
            const productId=favorite.dataset.productid

            const matchedProduct=products.find((product)=>product.id===productId)
            const existsInFavorites=findProductInFavorites(matchedProduct)
            console.log(favorites, existsInFavorites)
            if(!existsInFavorites){
                favorites.push(matchedProduct)
                favorite.textContent='heart_minus'
            }else{
                const productIndex=favorites.findIndex((favorite)=>favorite.id===existsInFavorites.id)
                favorites.splice(productIndex, 1)
                favorite.textContent='heart_plus'
            }
            modifyFavoritesLocalStorage('save', favorites)
            console.log(favorites)
        })
    })
}
function addToCartButtonLogic(){
    const addToCart=document.querySelectorAll('.add-to-cart')
    addToCart.forEach((addToCartButton)=>{
        addToCartButton.addEventListener('click',()=>{
            updateCart(addToCartButton.dataset.productid, 1, 1)
            updateCartQuantity()
        })
    })
    
}
/*Calling the function*/
maximumPriceRange()
filteringProducts()
