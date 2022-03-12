// enter button press
const button = document.getElementById("button-search");
const input = document.getElementById("search-field");

input.addEventListener("keypress", function (event) {
    if (event.key == 'Enter')
        button.click();
});

// error msg
document.getElementById('error-message').style.display = 'none'

const searchFood = () => {
    
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value

    // clear search box data
    searchField.value = ''
    // error massge
    document.getElementById('error-message').style.display = 'none'
    // empty search error handle
    if (searchText == '') {
        // home work : please write something in serchBox
    }
    else {
        // dynamic section search food by food name
        const dynamicFoodUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`

        fetch(dynamicFoodUrl)
            .then(res => res.json())
            .then(data => displaySearchResult(data.meals))
            // error handle
            .catch(error => displayError(error))
    }
}

const displayError = (error) => {
    document.getElementById('error-message').style.display = 'block'
}


// show search result
const displaySearchResult = (meals) => {
    const searchResult = document.getElementById('search-result')

    // clear display result data
    /* searchResult.innerHTML = '' */
    searchResult.textContent = ''

    // search result not fund error handle
    /* if (meals.length == 0) {
        home work : show an error no result fund
    } */

    meals.forEach(meal => {
        // console.log(meal)
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
        <div onclick="loadMealDetail(${meal.idMeal})" class="card h-100">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title"> ${meal.strMeal} </h5>
                <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
                
            </div>
        </div>
        `
        searchResult.appendChild(div)
    })
}

// after click on meal display meal details 
const loadMealDetail = mealId => {
    const mealIdUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`

    fetch(mealIdUrl)
        .then(res => res.json())
        .then(data => displayMealDetail(data.meals[0]))
}

const displayMealDetail = meal => {
    const mealDetails = document.getElementById('meal-details')
    mealDetails.textContent = ''
    const div = document.createElement('div')
    // div.classList.add('card', 'rounded', "mx-auto" )
    div.innerHTML = `
        <div class="card border-0 shadow-lg text-center mx-auto" style="width: 15rem; height: 32rem">

        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
            <a href="${meal.strYoutube}" target="_blank" class="btn btn-primary">Watch Recipe</a>
        </div>
        </div>
        `
    mealDetails.appendChild(div)
}
