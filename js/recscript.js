const recipeList = document.getElementById('display');
const searchInput = document.getElementById('search-input');
const defaultInput = 'thai';
const url = `https://api.edamam.com/search?q=`;
const url2 = `&app_id=0a632c71&app_key=ba9608ccef36ce5288c844cb14509336`;
const pagination = `&?from=0?&to=50`;
//var diet1 = '&diet=';
var diet = '';
var health = '';
var cuisine = '';

function choose(choice) {
    diet = choice;
}

function choose2(choice) {
    health = choice;
}

function choose3(choice) {
    cuisine = choice;
}

$(".dietlist li a").click(function () {

    $(this).parents(".btn-group").find('.selection').text($(this).text());
    $(this).parents(".btn-group").find('.selection').val($(this).text());
    $(this).parents(".btn-group").find(".dietbtn").css('background-color', '#18ab29');
    $(this).parents(".btn-group").find(".selection").css('color', 'white');


});

$(".healthlist li a").click(function () {

    $(this).parents(".btn-group").find('.selection2').text($(this).text());
    $(this).parents(".btn-group").find('.selection2').val($(this).text());
    $(this).parents(".btn-group").find(".healthbtn").css('background-color', '#E56B1F');
    $(this).parents(".btn-group").find(".selection2").css('color', 'white');

});

$(".cuisinelist li a").click(function () {

    $(this).parents(".btn-group").find('.selection3').text($(this).text());
    $(this).parents(".btn-group").find('.selection3').val($(this).text());
    $(this).parents(".btn-group").find(".cuisinebtn").css('background-color', '#E12B38');
    $(this).parents(".btn-group").find(".selection3").css('color', 'white');

});

$(".myButton").click(function () {

    $(this).css('background-color', '#18ab29');
    $(this).css('color', 'white');
    $(this).css('border', '#18ab29 4px solid');

});

$(".myButton2").click(function () {

    $(this).css('background-color', '#E56B1F');
    $(this).css('color', 'white');
    $(this).css('border', '#E56B1F 4px solid');

});

$(".myButton3").click(function () {

    $(this).css('background-color', '#E12B38');
    $(this).css('color', 'white');
    $(this).css('border', '#E12B38 4px solid');

});



const findRecipes = (food) => {

    fetch(url + food + url2 + diet + health + cuisine + pagination, {

            method: 'get',

        })
        .then(function (res) {

            return res.json();

        })
        .then(function (data) {

            var obj = data.hits

            recipeList.innerHTML = obj.map(function (result) {

                //            return '<h1>' + result.recipe.label + '</h1>';

                return `

            
                <div class="recipe col-lg-3 col-md-3 col-sm-12" style="background-image: linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5)), url('${result.recipe.image}'); ">

                    <div class="content text-center">
                            
                            <div>
                                <img id="poster" src="${result.recipe.image}">
                            </div>
                            <div class="text-center">

                                <a href="${result.recipe.url}"><h3 class="head" id="title">${result.recipe.label}</h3></a>
                                
                                    <strong class="dietbutton">${result.recipe.dietLabels}</strong>

                                    <div class="time"><p><strong><i class="fas fa-clock"></i> ${result.recipe.totalTime} Minutes</strong></p></div>

                            </div>
                            <div class="data-block">
                                <h3>Ingredients <i class="fas fa-mortar-pestle"></i></h3>

                                <div class="inglist">
                                    <ul>
                                        ${result.recipe.ingredientLines.map((line) => 
                                                                        
                                            `<li class="ing">${line}</li>`
                                        
                                                                        
                                        ).join('<br>')}

                                    </ul>
                                </div>
                                
                            </div>

                    </div>

                </div>
        
            `;

            }).join('');

        })
        .catch(function (err) {
            console.log("error");
        });
};

//findRecipes(defaultInput);

searchInput.addEventListener('keypress', (e) => {
    if (e.keyCode === 13 && searchInput.value) findRecipes(searchInput.value);
});
