//DOM
const accountIcon=document.getElementById('account')
const profilePhoto=document.querySelector('.profile-photo > span')
const profileRemove=document.getElementById('remove')
const cartButton=document.getElementById('cart');
const searchResultsDiv=document.querySelector('.search-results')


//variables
let pageNum;
let notificationTimeOut;
let notificationTimerTimeOut
let searchHTML=''
let previousScroll=window.scrollY
export const favorites=modifyFavoritesLocalStorage('load')
export const products=[
    {
        id:'ginger',
        img:['./Image/Ginger.jpg', './Image/Ginger2.jpg', './Image/Ginger3.jpg'],
        name: 'Ginger',
        price: 5.66,
        category: 'herb',
        inStock: true,
        discount: 0
    },{
        id:'cinnamon',
        img:['./Image/Cinnamon.jpg', './Image/Cinnamon2.jpg', './Image/Cinnamon3.jpg'],
        name:'Cinnamon',
        price: 11.50,
        category: 'herb',
        inStock: false,
        discount: 0
    },{
        id:'turmeric',
        img:['./Image/Turmeric.jpg', './Image/Turmeric2.jpg', './Image/Turmeric3.jpg'],
        name:'Turmeric',
        price: 60.50,
        category: 'spice',
        inStock: true,
        discount: 2
    },{
        id:'cumin',
        img:['./Image/Cumin.jpeg', './Image/Cumin2.jpg', './Image/Cumin3.jpg'],
        name: 'Cumin',
        price: 8.90,
        category: 'herb',
        inStock: true,
        discount: 0
    },{
        id:'allspice',
        img: ['./Image/Allspice.jpg', './Image/Allspice2.jpg', './Image/Allspice3.jpg'],
        name:'Allspice',
        price: 4.85,
        category: 'herb',
        inStock: true,
        discount: 0
    },{
        id:'anise',
        img:['./Image/Anise.jpg', './Image/Anise2.jpg', './Image/Anise3.jpg'],
        name:'Anise',
        price: 20.50,
        category: 'herb',
        inStock: false,
        discount: 0
    },{
        id:'asparagus-juice',
        img:['./Image/Asparagus-juice.jpg', './Image/Asparagus-juice2.jpg'],
        name:'Asparagus Juice',
        price: 5.20,
        category: 'juice',
        inStock: true,
        discount: 0
    },{
        id:'bay-leaf',
        img:['./Image/Bay-leaf.jpg', './Image/Bay-leaf2.jpg', './Image/Bay-leaf3.jpg'],
        name: 'Bay Leaf',
        price: 5.66,
        category: 'herb',
        inStock: true,
        discount: 0
    },{
        id:'beet-juice',
        img: ['./Image/Beet-juice.png', './Image/Beet-juice2.jpg', './Image/Beet-juice3.jpeg'],
        name:'Beet Juice',
        price: 10.85,
        category: 'juice',
        inStock: false,
        discount: 0
    },{
        id:'carrot-juice',
        img:['./Image/Carrot-juice.jpg', './Image/Carrot-juice2.jpeg', './Image/Carrot-juice3.jpeg'],
        name:'Carrot Juice',
        price: 15.80,
        category: 'juice',
        inStock: true,
        discount: 0
    },{
        id:'celery-seed',
        img:['./Image/Celery-seed.jpg', './Image/Celery-seed2.jpg', './Image/Celery-seed3.jpeg'],
        name:'Celery Seed',
        price: 10.25,
        category: 'herb',
        inStock: true,
        discount: 5
    },{
        id:'chive',
        img:['./Image/Chive.jpg', './Image/Chive2.jpg', './Image/Chive3.jpeg'],
        name: 'Chive',
        price: 25.66,
        category: 'herb',
        inStock: true,
        discount: 0
    },{
        id:'cilantro',
        img:['./Image/Cilantro.jpeg', './Image/Cilantro2.jpeg', './Image/Cilantro3.jpeg'],
        name:'Cilantro',
        price: 4.85,
        category: 'herb',
        inStock: true,
        discount: 4
    },{
        id:'cloves',
        img:['./Image/Cloves.jpeg', './Image/Cloves2.jpg', './Image/Cloves3.jpeg'],
        name:'Cloves',
        price: 35.56,
        category: 'herb',
        inStock: true,
        discount: 2
    },{
        id:'curry',
        img:['./Image/Curry.jpeg', './Image/Curry2.jpeg', './Image/Curry3.jpg'],
        name:'Curry',
        price: 15.51,
        category: 'spice',
        inStock: true,
        discount: 3
    },{
        id: 'lemonade',
        img:['./Image/Lemonade.jpeg', './Image/Lemonade2.jpeg', './Image/Lemonade3.jpg'],
        name:'Lemonade',
        price: 6.22,
        category: 'juice',
        inStock: true,
        discount: 0
    },{
        id: 'nutmeg',
        img:['./Image/Nutmeg.jpeg', './Image/Nutmeg2.jpeg', './Image/Nutmeg3.jpeg'],
        name:'Nutmeg',
        price: 8.28,
        category: 'spice',
        inStock: true,
        discount: 0
    },{
        id: 'orange-juice',
        img:['./Image/Orange-juice.jpeg', './Image/Orange-juice2.jpg', './Image/Orange-juice3.jpg'],
        name:'Orange Juice',
        price: 11.22,
        category: 'juice',
        inStock: true,
        discount: 2
    },{
        id: 'paprika',
        img:['./Image/Paprika.jpeg', './Image/Paprika2.jpg', './Image/Paprika3.jpeg'],
        name:'Paprika',
        price: 40.22,
        category: 'spice',
        inStock: true,
        discount: 0
    },{
        id: 'parsley-juice',
        img:['./Image/Parsley-juice.png', './Image/Parsley-juice2.jpeg', './Image/Parsley-juice3.jpg'],
        name:'Parsley Juice',
        price: 24.54,
        category: 'juice',
        inStock: true,
        discount: 15
    },
]
export const cart=cartLocalStorage('load')
const data=[]
export const rating=[
    {
        userId:'',
        img:'./Image/user1.jpg',
        productId: 'ginger',
        stars: 1,
        name: 'Ethan',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user2.jpg',
        productId: 'ginger',
        stars: 5,
        name: 'William',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user3.jpg',
        productId: 'ginger',
        stars: 2,
        name: 'Bruce',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user4.jpg',
        productId: 'ginger',
        stars: 3,
        name: 'Philip',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user3.jpg',
        productId: 'ginger',
        stars: 5,
        name: 'Perry',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user1.jpg',
        productId: 'turmeric',
        stars: 4,
        name: 'Jimmy',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user3.jpg',
        productId: 'turmeric',
        stars: 3,
        name: 'Victor',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user3.jpg',
        productId: 'turmeric',
        stars: 5,
        name: 'Brian',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user1.jpg',
        productId: 'turmeric',
        stars: 4,
        name: 'Ramon',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user3.jpg',
        productId: 'allspice',
        stars: 3,
        name: 'Tristan',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user1.jpg',
        productId: 'allspice',
        stars: 5,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user3.jpg',
        productId: 'allspice',
        stars: 4,
        name: 'Adam',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user1.jpg',
        productId: 'allspice',
        stars: 5,
        name: 'Brian',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user1.jpg',
        productId: 'allspice',
        stars: 5,
        name: 'Brian',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user3.jpg',
        productId: 'allspice',
        stars: 5,
        name: 'Brian',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user1.jpg',
        productId: 'anise',
        stars: 5,
        name: 'Brian',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user1.jpg',
        productId: 'anise',
        stars: 5,
        name: 'Brian',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user1.jpg',
        productId: 'anise',
        stars: 3,
        name: 'Tristan',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user3.jpg',
        productId: 'asparagus-juice',
        stars: 5,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user4.jpg',
        productId: 'asparagus-juice',
        stars: 4,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user2.jpg',
        productId: 'asparagus-juice',
        stars: 1,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user2.jpg',
        productId: 'bay-leaf',
        stars: 5,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user4.jpg',
        productId: 'bay-leaf',
        stars: 2,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user2.jpg',
        productId: 'bay-leaf',
        stars: 3,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user3.jpg',
        productId: 'bay-leaf',
        stars: 2,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user1.jpg',
        productId: 'bay-leaf',
        stars: 5,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user2.jpg',
        productId: 'beet-juice',
        stars: 5,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user3.jpg',
        productId: 'beet-juice',
        stars: 5,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user2.jpg',
        productId: 'beet-juice',
        stars: 1,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user3.jpg',
        productId: 'beet-juice',
        stars: 5,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user4.jpg',
        productId: 'beet-juice',
        stars: 4,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user3.jpg',
        productId: 'beet-juice',
        stars: 2,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user1.jpg',
        productId: 'carrot-juice',
        stars: 3,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user2.jpg',
        productId: 'carrot-juice',
        stars: 4,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user3.jpg',
        productId: 'carrot-juice',
        stars: 5,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user4.jpg',
        productId: 'carrot-juice',
        stars: 1,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user1.jpg',
        productId: 'carrot-juice',
        stars: 1,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user1.jpg',
        productId: 'celery-seed',
        stars: 2,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user2.jpg',
        productId: 'celery-seed',
        stars: 5,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user3.jpg',
        productId: 'celery-seed',
        stars: 5,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user1.jpg',
        productId: 'chive',
        stars: 4,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user2.jpg',
        productId: 'chive',
        stars: 3,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user3.jpg',
        productId: 'chive',
        stars: 2,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user4.jpg',
        productId: 'chive',
        stars: 1,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user1.jpg',
        productId: 'chive',
        stars: 2,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user1.jpg',
        productId: 'cilantro',
        stars: 2,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user2.jpg',
        productId: 'cilantro',
        stars: 4,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user3.jpg',
        productId: 'cinnamon',
        stars: 3,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user4.jpg',
        productId: 'cinnamon',
        stars: 1,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user1.jpg',
        productId: 'cinnamon',
        stars: 4,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user1.jpg',
        productId: 'cinnamon',
        stars: 4,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user1.jpg',
        productId: 'cinnamon',
        stars: 5,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user1.jpg',
        productId: 'cinnamon',
        stars: 3,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user1.jpg',
        productId: 'cloves',
        stars: 2,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user1.jpg',
        productId: 'cloves',
        stars: 4,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user1.jpg',
        productId: 'cloves',
        stars: 4,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user1.jpg',
        productId: 'cloves',
        stars: 2,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user1.jpg',
        productId: 'cloves',
        stars: 5,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user1.jpg',
        productId: 'cumin',
        stars: 5,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user1.jpg',
        productId: 'curry',
        stars: 3,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user1.jpg',
        productId: 'curry',
        stars: 1,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user1.jpg',
        productId: 'curry',
        stars: 1,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user3.jpg',
        productId: 'lemonade',
        stars: 2,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user1.jpg',
        productId: 'lemonade',
        stars: 4,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user1.jpg',
        productId: 'nutmeg',
        stars: 4,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user3.jpg',
        productId: 'nutmeg',
        stars: 5,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user1.jpg',
        productId: 'nutmeg',
        stars: 5,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user1.jpg',
        productId: 'nutmeg',
        stars: 3,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user3.jpg',
        productId: 'nutmeg',
        stars: 2,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user1.jpg',
        productId: 'orange-juice',
        stars: 4,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user1.jpg',
        productId: 'orange-juice',
        stars: 1,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user1.jpg',
        productId: 'paprika',
        stars: 5,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user1.jpg',
        productId: 'paprika',
        stars: 5,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user3.jpg',
        productId: 'paprika',
        stars: 3,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user1.jpg',
        productId: 'parsley-juice',
        stars: 3,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user3.jpg',
        productId: 'parsley-juice',
        stars: 2,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user1.jpg',
        productId: 'parsley-juice',
        stars: 5,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user1.jpg',
        productId: 'parsley-juice',
        stars: 5,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user1.jpg',
        productId: 'parsley-juice',
        stars: 3,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user1.jpg',
        productId: 'turmeric',
        stars: 2,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    },{
        userId:'',
        img:'./Image/user1.jpg',
        productId: 'turmeric',
        stars: 4,
        name: 'Lance',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque laboriosam corrupti facilis quisquam, obcaecati praesentium laborum temporibus saepe accusantium id autem cumque doloremque optio alias, consectetur illum quas reprehenderit deleniti.',
        date: '2025/04/21'
    }
]

//Event listener
document.addEventListener('click', (e)=>{
    if(!e.target.classList.contains('arrow') && !e.target.classList.contains('expandable')){

    }
})

//functions
export function cartLocalStorage(action, data){
    
    if(action==='save'){
        localStorage.setItem('cart', JSON.stringify(data))
    }else if(action==='load'){
        if(localStorage.getItem('cart')!==null){
            
            return JSON.parse(localStorage.getItem('cart'))
        }else{
            return[]
        }
    }
}
export function modifyFavoritesLocalStorage(action, data){
    if(action==='save'){
        localStorage.setItem('favorites', JSON.stringify(data))
    }else if(action==='load'){
        if(localStorage.getItem('favorites')!==null){
            return JSON.parse(localStorage.getItem('favorites'))
        }else{
            return[]
        }
        
    }
    
}
export function setupHeader(){
    const expandableLi=document.querySelector('.expandable')
    const dropdown=expandableLi.querySelector('.dropdown')
    const arrow=expandableLi.querySelector('.arrow')

    expandableLi.addEventListener('click', ()=>{
        dropdown.classList.toggle('visibility')
        arrow.classList.toggle('rotate')
    })
    const dropdownLi=dropdown.querySelectorAll('li')
    dropdownLi.forEach((dropdownLis)=>{
        dropdownLis.addEventListener('click',()=>{
            const cat=dropdownLis.dataset.category
            window.location.href=`All Product.html?category=${cat}`
        })
    })
}
export function errorNotification(message, cityDropdown){
    const notification=document.querySelector('.notification')
    const notificationTimer=document.querySelector('.notification span')
    const notificationP=document.querySelector('.notification p')

    clearTimeout(notificationTimeOut)
    clearTimeout(notificationTimerTimeOut)
    
    if(/\b404\b/i.test(message)){
        console.log(message);
        notificationP.textContent='Please choose a country first'
        cityDropdown.classList.remove('active')
        //cityDropdown.innerHTML=''
    }else{
        notificationP.textContent=message
    }
    notification.offsetWidth
    notification.style.setProperty('--notification-translate', '4%')
    notification.style.setProperty('--notification-opacity', '1')

    notificationTimerTimeOut=setTimeout(()=>{
        notificationTimer.style.setProperty('--notificationSpan-transition', 'none')
        notificationTimer.style.setProperty('--notificationSpan-width', '0%')
        
        notificationTimer.offsetHeight

        notificationTimer.style.setProperty('--notificationSpan-transition', 'width 3s ease')
        notificationTimer.style.setProperty('--notificationSpan-width', '100%')
    },300)
    
    notificationTimeOut=setTimeout(()=>{
        notification.style.setProperty('--notification-translate', '-104%')
        notification.style.setProperty('--notification-opacity', '0')
        notificationTimer.style.setProperty('--notificationSpan-transition', 'none')
        notificationTimer.style.setProperty('--notificationSpan-width', '0%')
        notificationTimer.offsetHeight
        notificationTimer.style.setProperty('--notificationSpan-transition', 'width 3s ease')
    }, 3300)
}

export function disabled(button, input1, input2, input3, input4){
    const editButton=document.querySelector('.edit')
    const saveButton=document.querySelector('.save')
    if(button===editButton){
        input1.classList.remove('disabled-element')
        input2.classList.remove('disabled-element')
        input3.classList.remove('disabled-element')
        input4.classList.remove('disabled-element')

        input1.readOnly=false
        input2.readOnly=false
        input3.readOnly=false
        input4.readOnly=false

        editButton.classList.add('disabled-element')
        saveButton.classList.remove('disabled-element')

        editButton.disabled=true
        saveButton.disabled=false
    }else{
        input1.classList.add('disabled-element')
        input2.classList.add('disabled-element')
        input3.classList.add('disabled-element')
        input4.classList.add('disabled-element')

        input1.readOnly=true
        input2.readOnly=true
        input3.readOnly=true
        input4.readOnly=true

        saveButton.classList.add('disabled-element')
        editButton.classList.remove('disabled-element')

        saveButton.disabled=true
        editButton.disabled=false
    }
}

export function saveData(input1, input2, input3, input4){
    if(input1.classList.contains('first-name')){
        const match=data.find((datas)=>datas.id===1)
        if(match){
            match.firstName=input1.value.trim()
            match.lastName=input2
            match.phoneNumber=input3
            match.email=input4
        }else{
            data.push({
                id: 2,
                firstName: input1.value.trim(),
                lastName:input2,
                phoneNumber:input3,
                email:input4
            })
        }

        localStorage.setItem('Personal Info', JSON.stringify(data))
    }else{
        const match=data.find((datas)=>datas.id===2)
        if(match){
            match.country=input1.dataset.countryname
            match.city=input2
            match.zipCode=input3
            match.streetAddress=input4
        }else{
            data.push({
                id: 1,
                country: input1.dataset.countryname,
                city:input2,
                zipCode:input3,
                streetAddress:input4
            })
        }
        
        localStorage.setItem('Address', JSON.stringify(data))
    }
}
export function openDatabase(){
    const request=indexedDB.open('herbal-store1', 2)

    request.addEventListener('upgradeneeded', ()=>{
        const db=request.result
        db.createObjectStore('profile', {
            keyPath: 'id'
        })
    })
    return request
}

export function saveProfilePicture(file, notification, notificationP, notificationTimer){
    
    const request=openDatabase()

    request.addEventListener('success', ()=>{
        const db=request.result
        const transaction=db.transaction('profile', 'readwrite')
        const store=transaction.objectStore('profile')
        store.put({
            id: 'profilePicture',
            image: file
        })
        transaction.addEventListener('complete', ()=>{
            errorNotification('Profile picture updated', notification, notificationP, notificationTimer)
        })
    })
}

export function deleteProfilePicture(){
    
    const request=openDatabase()

    request.addEventListener('success', ()=>{
        const db=request.result
        const transaction=db.transaction('profile', 'readwrite')
        const store=transaction.objectStore('profile')
        store.clear()
        transaction.addEventListener('complete', ()=>{
            profilePhoto.innerHTML=`
                <span class="material-symbols-outlined camera">camera_video</span>
            `
            accountIcon.innerHTML=`
                <span class="material-symbols-outlined">account_circle</span>
            `
            profilePhoto.classList.remove('withimg')
        })
    })
}

export function loadProfilePicture(){

    const request=openDatabase()

    request.addEventListener('success', ()=>{
        const db=request.result
        const transaction=db.transaction('profile', 'readonly')
        const store=transaction.objectStore('profile')
        const getReq=store.get('profilePicture')
        getReq.addEventListener('success',()=>{
            const data=getReq.result
            if(!data)return;
            const imgUrl=URL.createObjectURL(data.image)
            if(profilePhoto){
                profilePhoto.innerHTML=`
                    <img src="${imgUrl}">
                `
                profilePhoto.classList.add('withimg')
                profileRemove.style.display='flex'
            }
            
            accountIcon.innerHTML=`
                <img src="${imgUrl}">
            `
        })
    })
    
}

export function renderRatedStars(star, span){
    const percent=(star*100)/5
    span.style.setProperty('--rating-width', percent+'%')
    return span
}

export function calcPrice(price, weight, quantity){
    const totalPrice=((price * weight)*quantity)
    return totalPrice
}

export function addOrMinusInputValue(firstButton,secondButton, input){
    
    if(firstButton.classList.contains('add')){
        if(Number(input.value)<=4){
            input.value++
            
            secondButton.classList.remove('disabled-button')
            secondButton.disabled=false
        }else{
            firstButton.disabled=true
            firstButton.classList.add('disabled-button')
        }
    }else{
        if(Number(input.value)<=1){
            firstButton.classList.add('disabled-button')
            firstButton.disabled=true
        }else{
            input.value--
            
            secondButton.classList.remove('disabled-button')
            secondButton.disabled=false
            
        }
    }
}

export function updateCart(id, weight, quantity){
    let existingProduct;
    let exists;

    if(cart.length>=1){
        existingProduct=cart.find((cartItem)=>cartItem.id===id)
    }
    if(existingProduct){
        exists=existingProduct.varients.find((varient)=>varient.weight===weight) 
        if(exists){
            console.log(exists)
            errorNotification('Product updated in the cart')
            exists.quantity=quantity
            console.log(cart)
            updateCartQuantity()
            cartLocalStorage('save', cart)
        }else{
            console.log(weight)
            existingProduct.varients.push(
                {
                    varientId: `${id}-${weight}kg`,
                    weight: weight,
                    quantity: quantity
                }
            )
            console.log(cart)
            errorNotification('product added to the cart')
            updateCartQuantity()
            cartLocalStorage('save', cart)
        }
    }
    if(!existingProduct){
        cart.push({
            id:id,
            varients:[
                {
                    varientId:`${id}-${weight}`,
                    weight: weight,
                    quantity: quantity
                }
            ]
        })
        errorNotification('Product added to the cart')
        updateCartQuantity()
        cartLocalStorage('save', cart)
    }
    console.log(cart)
    
}

export function updateCartQuantity(){
    const SMCartItems=document.getElementById('cart-items')
    let items=0
    if(cart!==null){
        cart.forEach((product)=>{
            items+=product.varients.reduce((eachValue, varient)=>{
                return eachValue+varient.quantity
            }, 0)
        })
    cartButton.childNodes[1].textContent=`Cart (${items})`
    SMCartItems.textContent=items
    }
    
}

export function emailFormatValidator(email){
    const valid=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    if(!valid){
        errorNotification('Invalid email address')
    }else{
        errorNotification('Thanks for your feedback')
    }
}

export function headerHider(){
    const header=document.querySelector('header')
    const currentScroll=window.scrollY

    const distance=currentScroll-previousScroll
    
    searchResultsDiv.style.display='none'
    distance<0?header.style.transform='translateY(0%)':header.style.transform='translateY(-100%)'
    previousScroll=currentScroll
    
}

export function pageChanger(buttons, number, direction, maxNum){
    if(direction==='next'){
        pageNum<=maxNum?pageNum++:pageNum=maxNum
    }else{
        pageNum===1?pageNum=1:pageNum--
    }

    buttons.forEach((button)=>{
        const pageNumber=button.dataset.page

    })
}

export function setNumber(num){
    pageNum=num
}

export function calculateAverageStars(product, action){
    const productRating=rating.filter((ratings)=>ratings.productId===product.id)
    const stars=productRating.reduce((total, current)=>total+current.stars, 0)
    const averageStars=(stars/productRating.length)
    const percent=Math.round((averageStars/5)*100)
    
    if(action==='number'){
        return averageStars.toFixed(1)
    }else if(action==='percent'){
        return percent
    }else{
        return productRating
    }
}

export function calculateDiscount(product){
    const discount=product.price-(product.discount*product.price/100)
    return discount.toFixed(2)
}

export function createSearchResultSection(ac, searchInput, searchDiv, searchUl){
    let searchResult;
    if(searchInput.value){
        searchDiv.style.display='block'
    }else{
        searchDiv.style.display='none'
    }
    const name=products.filter((product)=>product.name.toLowerCase().startsWith(searchInput.value.trim().toLowerCase()))
    const category=products.filter((product)=>product.category.toLowerCase().startsWith(searchInput.value.toLowerCase()))
    name.length>=1?searchResult=name:searchResult=category
    searchUl.innerHTML=''
    searchResult.forEach((searchedProducts, i)=>{
        searchHTML=`
            <li>
                <a id="product-searched" href="${ac==='account-center'?'../Product Page.html':'./Product Page.html'}?productid=${searchedProducts.id}">
                    <img class="search-product-img" data-src=${ac==='account-center'?'.'+searchedProducts.img[0]:searchedProducts.img[0]} alt="${searchedProducts.name}">
                    <div>
                        <p>${searchedProducts.name}</p>
                        <span style="--rating-width: ${calculateAverageStars(searchedProducts, 'percent')+'%'}"></span>
                    </div>
                    <h4>$${searchedProducts.price.toFixed(2)}</h4>
                </a>
            </li>
        `
        searchUl.insertAdjacentHTML('beforeend', searchHTML)
    })
    const allImages=document.querySelectorAll('.search-product-img')
    setupObserver(allImages, searchDiv, 'top')
    if(name.length===0 && category.length===0){
        searchUl.innerHTML='<p>No products found</p>'
    }
    
}
export function modifyPagination(action, totalPages, onPageChange){
    const paginationB=document.getElementById('total-pages-b')
    const paginationDiv=document.querySelector('.pagination')
    const paginationInput=document.getElementById('pagi-input')
    const previousSpan=document.querySelector('.previous')
    const nextSpan=document.querySelector('.next')

    paginationB.textContent=totalPages
    if(totalPages<=1){
        paginationDiv.style.display='none'
        return
    }
    paginationDiv.style.display='flex'
    if(action==='next'){
        if(paginationInput.value<totalPages){
            paginationInput.value++
            previousSpan.classList.remove('disabled-pagination')
        }else{
            nextSpan.classList.add('disabled-pagination')
        }
    }else if(action==='previous'){
        if(paginationInput.value>1){
            nextSpan.classList.remove('disabled-pagination')
            paginationInput.value--
        }else{
            previousSpan.classList.add('disabled-pagination')
        }
    }else{
        paginationInput.value=1
    }
    const nextPage=Number(paginationInput.value)
    onPageChange?onPageChange(nextPage):''
}

export function modifyPaginationButton(totalPages, onPageChange){
    const paginationInput=document.getElementById('pagi-input')
    const previousSpan=document.querySelector('.previous')
    const nextSpan=document.querySelector('.next')
    if(totalPages===0){
        paginationInput.value=0
        nextSpan.classList.add('disabled-pagination')
        previousSpan.classList.add('disabled-pagination')
    }else if(paginationInput.value>1 && paginationInput.value<totalPages){
        nextSpan.classList.remove('disabled-pagination')
        previousSpan.classList.remove('disabled-pagination')
    }

    if(Number(paginationInput.value)===totalPages){
        nextSpan.classList.add('disabled-pagination')
        previousSpan.classList.remove('disabled-pagination')
    }else if(Number(paginationInput.value)===1){
        nextSpan.classList.remove('disabled-pagination')
        previousSpan.classList.add('disabled-pagination')
    }

    onPageChange?onPageChange(Number(paginationInput.value)):''
}
export function setupObserver(images, container=null, margin){
    
    const searchObserver= new IntersectionObserver((entries, observer)=>{
        entries.forEach((entry)=>{
            if(entry.isIntersecting){
                const image=entry.target
                image.src=image.dataset.src
                observer.unobserve(image)
            }
        })
    },{
        root: container,
        rootMargin: margin==='top'?'20px 0px 20px 0px':'0px -10px 0px -10px'
    })
    
    images.forEach((image)=>{
        searchObserver.observe(image)
    })
}
export function hideDropdowns(e){
    const dropdowns=document.querySelectorAll('.dropdown')
    const dropdownArrows=document.querySelectorAll('.arrow')
    dropdowns.forEach((dropdown)=>{
        if(!e.target.classList.contains('arrow') && !e.target.closest('li')){
            dropdown.classList.remove('visibility')
            dropdownArrows.forEach((dropdownArrow)=>{
                dropdownArrow.classList.remove('rotate')
            })
        }
    })
    if(!e.target.classList.contains('search-input input')){
        searchResultsDiv.classList.remove('visibility')
    }
    
}
export function sideMenuLogic(ac){
    const sideMenu=document.querySelector('.primary-side-menu')
    const SMExpandable=document.querySelector('.sm-expandable')
    const SMDropdown=document.querySelector('.dropdown-category')
    const SMSearchInput=document.querySelector('.sm-search input')
    const SMSearchResult=document.querySelector('.sm-search-result')
    const SMSearchResultUl=document.querySelector('.sm-search-result ul')
    const sideMenuCloseB=document.querySelector('.primary-side-menu-close')
    const sideMenuOpenB=document.querySelector('.primary-side-menu-open')
    const overlay=document.querySelector('.overlay')
    
    SMExpandable.addEventListener('click', ()=>{
        const height=getComputedStyle(SMDropdown).height
        const arrow=SMExpandable.querySelector('.sm-arrow')
        
        if(height==='0px'){
            SMDropdown.style.height=SMDropdown.scrollHeight+'px'
            arrow.classList.add('rotate')
        }else{
            SMDropdown.style.height='0px'
            arrow.classList.remove('rotate')
        }
    })
   
    sideMenuCloseB.addEventListener('click', ()=>{
        sideMenu.classList.remove('active')
        overlay.style.display='none'
        SMSearchResult.style.display='none'
    })

    SMSearchInput.addEventListener('input', ()=>{
        createSearchResultSection(ac, SMSearchInput, SMSearchResult, SMSearchResultUl)
    })
    sideMenuOpenB.addEventListener('click', ()=>{
        sideMenu.classList.add('active')
        overlay.style.display='block'
    })
}
export function accountMenuToggler(){
    const accountMenu=document.querySelector('.account-center-option')
    const AMBackArrow=document.querySelector('.backarrow')
    const AMOpen=document.getElementById('account-menu')
    const overlay=document.querySelector('.overlay')
    AMOpen.addEventListener('click', ()=>{
        accountMenu.classList.add('active')
        overlay.classList.add('visibility')
    })
    AMBackArrow.addEventListener('click', ()=>{
        accountMenu.classList.remove('active')
        overlay.classList.remove('visibility')
    })

    window.addEventListener('resize', ()=>{
        if(!window.matchMedia('(max-width:870px)').matches){
            accountMenu.classList.remove('active')
            overlay.classList.remove('visibility')
        }
    })
    
}