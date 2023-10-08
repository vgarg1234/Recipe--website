const form = document.querySelector('form');
const inp = document.querySelector('#inp');
const list = document.querySelector('#list');
const container = document.querySelector('.container');
const home = document.querySelector('#home');
const snacks = document.querySelector('#snacks');
const salads = document.querySelector('#salads');
const mainCourse = document.querySelector('#main-course');
const desserts = document.querySelector('#desserts');

addElements('', null, 'Latest Recipes');



home.addEventListener('click', (e) => {
    list.innerText = '';
    addElements('', null, 'Latest Recipes');
});
snacks.addEventListener('click', (e) => {
    list.innerText = '';
    addElements('crispy', 'fried', 'Snacks');
});
salads.addEventListener('click', (e) => {
    list.innerText = '';
    addElements('salad', null, 'Salads');
});
mainCourse.addEventListener('click', (e) => {
    list.innerText = '';
    addElements('veg', 'potatoes', 'Main Course');
});
desserts.addEventListener('click', (e) => {
    list.innerText = '';
    addElements('choco', null, 'Desserts');
});


list.addEventListener('click', (e) => {
    // console.log(e.target.getAttribute('mealid'));
    let click = e.target.getAttribute('id');
    // console.log(click);
    if (click === 'recipe') {
        list.innerText = '';
        recipePage(e.target.getAttribute('mealid'));
    }
    if (click === 'print-btn') {
        window.print();
    }
})


form.addEventListener('submit', (e) => {
    e.preventDefault();
    list.innerText = '';
    getMeal(inp.value);
    inp.value = '';
})

function recipePage(mealid) {
    // console.log(mealid);
    const html = document.createElement('div');
    html.setAttribute('class', 'meal-recipe');

    let URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`;
    axios.get(URL)
        .then((res) => {
            for (let meal of res.data.meals) {
                if (meal) {
                    html.innerHTML += `<h2 class="dishName">${meal.strMeal}</h2>
                    <div class="dish">
                        <div class="dish-img">
                            <img src=${meal.strMealThumb}>
                        </div>
                        <div class="text-area">
                        <h4> Recipe </h4>
                        <p> ${meal.strInstructions} </p>
                        <h6> Cuisine: ${meal.strArea} </h6>
                        <h6> Category: ${meal.strCategory} </h6>
                        <button type="button" class="btn btn-primary" id="print-btn" >Print</button>
                        </div>
                    </div>
                    `
                    list.append(html);
                }
            }
        })

}

function addElements(searchText1, searchText2, heading) {
    const html = document.createElement('div');
    html.setAttribute('class', 'cards');

    html.innerHTML += `<h2>${heading}</h2>`
    const grid = document.createElement('div');
    grid.setAttribute('class', 'grid text-center');

    let URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText1}`;
    axios.get(URL)
        .then((res) => {
            for (let meal of res.data.meals) {
                if (meal) {
                    grid.innerHTML += `<div class="card">
                    <h5>${meal.strMeal}</h5>
                    <div class="img"><img src="${meal.strMealThumb}"></div>
                    <button type="button" mealId = ${meal.idMeal}  class="btn btn-primary" id="recipe" >View Recipe</button>
                </div>`
                }
            }
        })
    if (searchText2 != null) {

        URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText2}`;
        axios.get(URL)
            .then((res) => {
                for (let meal of res.data.meals) {
                    if (meal) {
                        grid.innerHTML += `<div class="card">
                        <h5>${meal.strMeal}</h5>
                    <div class="img"><img src="${meal.strMealThumb}"></div>
                    <button type="button" mealId = ${meal.idMeal} class="btn btn-primary" id="recipe" >View Recipe</button>
                    </div>`
                    }
                }
            })
    }


    html.append(grid);
    list.append(html);
};


function fearutedMeals() {

}

function getMeal(searchText) {
    const html = document.createElement('div');
    html.setAttribute('class', 'cards');

    const grid = document.createElement('div');
    grid.setAttribute('class', 'grid text-center');

    let URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    axios.get(URL)
        .then((res) => {
            if (res.data.meals) {
                for (let meal of res.data.meals) {
                    if (meal) {
                        grid.innerHTML += `<div class="card">
                        <h5>${meal.strMeal}</h5>
                        <div class="img"><img src="${meal.strMealThumb}"></div>
                        <button type="button" mealId = ${meal.idMeal} class="btn btn-primary" id="recipe" >View Recipe</button>
                        </div>`
                    }
                }
            }
            else {
                html.innerHTML += '<h5>Sorry! no recipe found.</h5>';
                list.append(html);
            }
        })
    html.append(grid);
    list.append(html);

}