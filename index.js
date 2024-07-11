
function searchInput() {
    searchContainer.innerHTML = `
    <div class="row py-5">
            <div class="col-md-6">
                <input onkeyup="searchByName(this.value)" class="from-control bg-transparent w-100 text-white" type="text" placeholder="Search By Name">
            </div>
            <div class="col-md-6">
                <input onkeyup="searchByFirstLitter(this.value)" maxlength="1" class="from-control bg-transparent w-100 text-white" type="text" placeholder="Search By Name">
            </div>
        </div>
    `
    rowData.innerHTML = ""
}
async function searchByName(byName) {
    let apiresponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${byName}`);
    let finalresponse = await apiresponse.json();
    finalresponse.meals ? displayMeals(finalresponse.meals) : displayMeals([])
}
async function searchByFirstLitter(byFirstLitter) {
    term == "" ? term = "a" : "";
    let apiresponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${byFirstLitter}`);
    let finalresponse = await apiresponse.json();
    finalresponse.meals ? displayMeals(finalresponse.meals) : displayMeals([])
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function searchByName(term) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    response = await response.json();
    displayMeals(response.meals)
    console.log(response)
}

function displayMeals(arr) {
    let cartona = '';
    for (let i = 0; i < arr.length; i++) {
        cartona += `
    <div class="col-md-3">
        <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-3">
            <img class="w-100" src="${arr[i].strMealThumb}" alt="">
            <div class="meal-layer position-absolute d-flex align-items-center text-black">
                <h3>${arr[i].strMeal}</h3>
            </div>
        </div>
    </div>
        `
    }
    rowData.innerHTML = cartona

}
searchByName("")
////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function getCategories() {
    searchContainer.innerHTML = "";
    let apiresponse = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let finalresponse = await apiresponse.json();
    displayCategories(finalresponse.categories)
    console.log(finalresponse)
}
function displayCategories(arr) {
    let cartona = '';
    for (let i = 0; i < arr.length; i++) {
        cartona += `
    <div class="col-md-3">
        <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-3">
            <img class="w-100" src="${arr[i].strCategoryThumb}" alt="">
            <div class="meal-layer position-absolute text-center text-black">
                <h3>${arr[i].strCategory}</h3>
                <p>${arr[i].strCategoryDescription.split(" ").slice(0, 30).join(" ")}</p>
            </div>
        </div>
    </div>
    `
    }
    rowData.innerHTML = cartona
}
async function getCategoryMeals(category) {
    let apiresponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    let finalresponse = await apiresponse.json();
    displayMeals(finalresponse.meals)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function gatArea() {
    searchContainer.innerHTML = "";
    let apiresponse = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let finalresponse = await apiresponse.json();
    displayArea(finalresponse.meals)
}
function displayArea(arr) {
    let cartona = '';
    for (let i = 0; i < arr.length; i++) {
        cartona += `
    <div class="col-md-3">
        <div onclick="getAreaMeals('${arr[i].strArea}')" class=" rounded-3 text-center shadow">
            <i class="fa-solid fa-city bg-danger fa-4x"></i>
                <h3>${arr[i].strArea}</h3>
        </div>
    </div>
    `
    }
    rowData.innerHTML = cartona
}
async function getAreaMeals(area) {
    let apiresponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    let finalresponse = await apiresponse.json();
    displayMeals(finalresponse.meals)
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function getIngredients() {
    searchContainer.innerHTML = "";
    let apiresponse = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let finalresponse = await apiresponse.json();
    displayIngredients(finalresponse.meals.slice(0, 20))
    console.log(finalresponse.meals)
}
function displayIngredients(arr) {
    let cartona = '';
    for (let i = 0; i < arr.length; i++) {
        cartona += `
    <div class="col-md-3">
        <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class=" rounded-3 text-center shadow">
            <i class="fa-solid fa-bowl-food bg-success fa-4x"></i>
            <h3>${arr[i].strIngredient}</h3>
            <p>${arr[i].strDescription.split(" ").slice(0, 30).join(" ")}</p>
        </div>
    </div>
    `
    }
    rowData.innerHTML = cartona
}
async function getIngredientsMeals(ingredient) {
    let apiresponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    let finalresponse = await apiresponse.json();
    displayMeals(finalresponse.meals)
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function getMealDetails(mealID) {
    close()
    searchContainer.innerHTML = "";
    let apiresponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    let finalresponse = await apiresponse.json();
    displayMealDetails(finalresponse.meals[0])
}
function displayMealDetails(meal) {
    searchContainer.innerHTML = "";
    let ingredients = ``
    for (let i = 1; i < 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}`
        }  
        
    }
    let tags = meal.strTags?.split(",")
        if(!tags) tags =[]
        let tagsStr = ''
        for(let i=0;i<tags.length;i++){
            tagsStr +=`
                <li class="alert alert-danger m-2 p-1" > ${ tags[i] }</li> `
        }
    
    let cartona = `
            <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}">
                <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area :</span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category :</span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">${ingredients}</ul>
                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">${tagsStr} </ul>
                <a class="btn bg-success" href="${meal.strSource}">Source</a>
                <a class="btn bg-danger" href="${meal.strYoutube}">Youtube</a>
            </div>
            `
    rowData.innerHTML = cartona
}
//${tagsStr} ${ingredients}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
function showContact(){
    rowData.innerHTML =`
                    <div class="container w-75 text-center">
                        <div class="row g-4">
                            <div class="col-md-6 ">
                                <input id="name" type="text" class="from-control bg-transparent p-1 w-75 " placeholder="Enter Your Name">
                            </div>
                            <div class="col-md-6 ">
                                <input id="email" type="email" class="from-control bg-transparent p-1 w-75" placeholder="Enter Your Email">
                            </div>
                            <div class="col-md-6 ">
                                <input id="phone" type="text" class="from-control bg-transparent p-1 w-75" placeholder="Enter Your Phone">
                            </div>
                            <div class="col-md-6 ">
                                <input id="age" type="number" class="from-control bg-transparent p-1 w-75" placeholder="Enter Your Age">
                            </div>
                            <div class="col-md-6 ">
                                <input id="password" type="password" class="from-control bg-transparent p-1 w-75" placeholder="Enter Your Password">
                            </div>
                            <div class="col-md-6 ">
                                <input id="repassword" type="password" class="from-control bg-transparent p-1 w-75" placeholder="Enter Your Repassword">
                            </div>
                        </div>
                        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
                    </div>
    </div >
                `
    submitBtn = document.getElementById(submitBtn)
}
let submitBtn;
function inputvalidation(){
    if (nameValidation()&&
        emailValidation()&&
        phoneValidation()&&
        ageValidation()&&
        phoneValidation()&&
        repasswordValidation()){
            submitBtn.removeAttribute("disabled")
        }else{
            SubmitBtn.setAttribute("disabled,true")
        }
}
function nameValidation(){
    return (/^[a-zA-Z]+$/.test(document.getElementBy("name").value))
}
function emailValidation(){
    return (/^[a-zA-Z]+$/.test(document.getElementBy("email").value))
} 
function phoneValidation(){
    return (/^[a-zA-Z]+$/.test(document.getElementBy("phone").value))
}
function ageValidation(){
    return (/^[a-zA-Z]+$/.test(document.getElementBy("age").value))
}
function passwordValidation(){
    return (/^[a-zA-Z]+$/.test(document.getElementBy("password").value))
}
function repsswordValidation(){
    return (/^[a-zA-Z]+$/.test(document.getElementBy("repassword").value))
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function () {
    $("#loading i").fadeOut(1000, function () {
        $("body").css("overflow","visible")
        $("#loading").fadeOut(1000, function () {
            $("#loading").remove();
        })
    })
})
////////////////////////////////////////////////////////////////////////////////////////////////////////////
function open(){
    $("#nav").animate({left:`0px`} , 1000);
        for (let i = 0; i < 5; i++){
            $(".any-class li").eq(i).animate({
                top: 0
            }, (i+5*100))
        }
}
function close(){
    let boxWidth = $(".any-class").outerWidth(true);
    $("#nav").animate({left:`${ -boxWidth } `} , 1000);
        $(".any-class").animate({top:300},500)
}
close()
$("#nav i.fa-bars").click(function (){
    if($("#nav").css('left')==='0px')
    {
        close()
    }
    else
    {
        open()
    }
    
})
