// day
let day = new Date().getDay();
let days = ['Sunday', 'Monday', 'Tuesday','Wednesday', 'Thursday', 'Friday', 'Saturday'];

document.querySelector('.day').innerHTML = days[day]
// time
 let hours = new Date().getHours();
        let ampm = hours >= 12 ? ' PM' : ' AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        let minutes = new Date().getMinutes();
        minutes = minutes < 10 ? '0' + minutes : minutes;
        let time = hours + " "  + " : " + minutes + ampm ;

 document.querySelector('.time').innerHTML = time;
// links
let link;
let links = document.querySelectorAll('.links ul li ');
// add Event listener for each link
for(let i=0;i< links.length; i++) {
    links[i].addEventListener('click',function(e){
        let category = e.target.getAttribute('select-link');
        getNews(category);
    })
}

async function getNews(category) {
let loader = `<div id="loader" class="center"></div>`;
// console.log(loader);

document.querySelector('#newsCard').innerHTML = loader;
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=5036350d4d5541bb82ab2db44b895896`);
    // console.log(await response.json());
    
    if(!response.ok) {
        throw new Error ('HTTP error!')
    }
    const {articles} = await response.json();
    console.log(articles);
    let content='';
//     let ToggleBtn = document.createElement('span')
//     console.log(ToggleBtn.addEventListener('click', function(){

//     }));

    articles.map((article)=>{
        content+=`
        <div class='col-md-4 col-lg-3 my-2'>
        <div class="card h-100">
   <img class="card-img-top" src=${article.urlToImage} alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${article.title}</h5>
    <p class="card-text"> ${article.description} </p>

    </div>
</div>
        </div>
        `
            // <p class="card-text"> ${article.description.slice(0,50)} </p>
     document.getElementById('newsCard').innerHTML = content;

    })
    
    
}
getNews('sports');
