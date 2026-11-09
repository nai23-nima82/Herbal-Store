import { setupHeader,
    errorNotification,
    addOrMinusInputValue,
    cart,
    products,
    updateCartQuantity,
    calcPrice,
    headerHider,
    cartLocalStorage,
    createSearchResultSection,
    setupObserver,
    hideDropdowns,
    sideMenuLogic
} from "./shared.js";


//DOM
let itemsDiv;
const mainH1=document.querySelector('.cart-items h1')
const cartItemsH1=document.querySelector('.cart-items h1')
let cartItemsContainer;
const main=document.querySelector('main')
const searchInput=document.querySelector('.search-input input')
const searchResultUl=document.querySelector('.search-results ul')
const searchResultsDiv=document.querySelector('.search-results')

//Variables
let cartHTML=''
setupHeader()
sideMenuLogic(null)
updateCartQuantity()

//eventlistener
window.addEventListener('scroll', headerHider)
document.addEventListener('click', (e)=>{hideDropdowns(e)})
searchInput.addEventListener('input', ()=>{createSearchResultSection(null, searchInput, searchResultsDiv, searchResultUl)})

//functions
function updateCartDOM(varientID, value, priceH, weight, id){
    const matched=products.find((product)=>product.id===id)
    let updatedVarient;
    cart.some((product)=>{
       updatedVarient=product.varients.find((matchVarient)=>matchVarient.varientId===varientID)
       return updatedVarient
    })
    updatedVarient.quantity=Number(value)
    priceH.textContent=`$${calcPrice(matched.price, weight, updatedVarient.quantity).toFixed(2)}`
}

function deleteFromCart(id, productId, domElement){
    console.log(id, productId)
    const productIndex=cart.findIndex((item)=>item.id===productId)
    const varientIndex=cart[productIndex].varients.findIndex((varient)=>varient.varientId===id)
    console.log(cart[productIndex].varients[varientIndex])
    cart[productIndex].varients.splice(varientIndex, 1)

    if(cart[productIndex].varients.length===0){
        cart.splice(productIndex, 1)
    }

    domElement.remove()
    console.log(cart)
    if(cart.length===0){
        main.innerHTML=''
        const h2=document.createElement('h2')
        h2.textContent=`Your cart is empty. Add items to see here`
        main.classList.add('empty-cart')
        main.appendChild(h2)
    }
    updateCartQuantity()
}

function createOrderSummary(){
    
    let totalPrice=0
    if(cart.length>=1){
        cart.forEach((item)=>{
            const matchProduct=products.find((product)=>product.id===item.id)
            totalPrice+=item.varients.reduce((total, current)=>{
                return total+calcPrice(matchProduct.price, current.weight, current.quantity)
            }, 0)
        })
    }

    const checkout=document.querySelector('.checkout')
    if(checkout){
        checkout.remove()
    }
    if(cart.length===0){
        cartItemsContainer.innerHTML='<h1>Your cart is empty. Add products to the cart to see them here</h1>'
        main.className='empty-cart'
        return
    }
    
    let orderSummaryHTML=`
        <div class="checkout">
            <h1>Order Summary</h1>
            <div class="title-prices">
                <div>
                    <p>Subtotal</p>
                    <p>$${totalPrice.toFixed(2)}</p>
                </div>
                <div>
                    <p>Tax</p>
                    <p>$${((totalPrice*8)/100).toFixed(2)}</p>
                </div>
                <div>
                    <p>Shipping estimate</p>
                    <p>$20</p>
                </div>
            </div>
            <div class="total-price">
                <p>USD</p>
                <div>
                    <h3>Total</h3>
                    <h1>$${(totalPrice+20+(totalPrice*8)/100).toFixed(2)}</h1>
                </div>
            </div>
            <button class="go-to-checkout"><span class="material-symbols-outlined lock">lock</span><p>Proceed to Checkout</p></button>
            <div class="accepted-payments">
                <p>WE ACCEPT</p>
                <div>
                    <img src="./Image/visa-card.png" alt="">
                    <img src="./Image/mastercard.png" alt="">
                    <img src="./Image/paypal.png" alt="">
                </div>
            </div>
        </div>
    `
    main.insertAdjacentHTML('beforeend', orderSummaryHTML)
}

function renderCart(){
    cartHTML=''
    if(cart.length>=1){
        main.innerHTML=''
        const div=document.createElement('div')
        const h1=document.createElement('h1')
        h1.textContent='Shopping Cart'
        div.className='cart-items'
        div.appendChild(h1)
        main.appendChild(div)
        cartItemsContainer=document.querySelector('.cart-items')

        cart.forEach((items)=>{
            const match=products.find((product)=>product.id===items.id)
            items.varients.forEach((varient)=>{
                cartHTML+=`
                    <div class="items" id="${varient.varientId}" data-varient-weight="${varient.weight}" data-product="${match.id}">
                        <img class="cart-product-img" data-src="${match.img[0]}" alt="">
                        <div class="name-qty">
                            <h3>${match.name}</h3>
                            <p>${varient.weight}KG</p>
                            <div>
                                <p>Qty</p>
                                <div class="for-number-input">
                                    <button class="remove">_</button>
                                    <input class="qty" data-varient-id="${varient.varientId}" type="number" value="${varient.quantity}" max="5" min="1" readonly>
                                    <button class="add">+</button>
                                </div>
                            </div>
                        </div>
                        <div class="price-remove">
                            <h4>$${calcPrice(match.price, varient.weight, varient.quantity).toFixed(2)}</h4>
                            <button class="remove-product" data-product-id="${match.id}">X REMOVE</button>
                        </div>
                    </div>
                `
            })
            
        })
        
        main.className=''
        cartItemsContainer.insertAdjacentHTML('beforeend', cartHTML)
        const cartProductImg=document.querySelectorAll('.cart-product-img')
        setupObserver(cartProductImg, null, 'top')
        itemsDiv=document.querySelectorAll('.items')
        createOrderSummary()
        addingLogicToCartItems()
    }else{
        console.log("hasn't items")
        const hintH2=document.createElement('h2')
        hintH2.textContent='Your cart is empty. Add items to see here'
        main.className='empty-cart'
        main.appendChild(hintH2)
    }
    
    
}
function addingLogicToCartItems(){
    itemsDiv.forEach((itemsDivs)=>{
    itemsDivs.addEventListener('click', (e)=>{
        const addButton=itemsDivs.querySelector('.add')
        const reduceButton=itemsDivs.querySelector('.remove')
        const numberInput=itemsDivs.querySelector('.qty')
        const priceH=itemsDivs.querySelector('h4')
        const removeProductButton=itemsDivs.querySelector('.remove-product')

        if(e.target===addButton){
            addOrMinusInputValue(addButton, reduceButton, numberInput, priceH)
            updateCartDOM(numberInput.dataset.varientId, numberInput.value, priceH, itemsDivs.dataset.varientWeight, itemsDivs.dataset.product)
            

        }else if(e.target===reduceButton){
            addOrMinusInputValue(reduceButton, addButton, numberInput)
            updateCartDOM(numberInput.dataset.varientId, numberInput.value, priceH, itemsDivs.dataset.varientWeight, itemsDivs.dataset.product)
            
        }
        if(e.target===removeProductButton){
            deleteFromCart(itemsDivs.id, itemsDivs.dataset.product, itemsDivs)
        }
        createOrderSummary()
        cartLocalStorage('save', cart)
        console.log(cart)
    })
})
}

/*Calling functions*/
renderCart()