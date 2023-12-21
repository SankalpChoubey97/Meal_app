let mealArray=[];//arrays from api
const mealList = document.getElementById('list');//li tag for main page
// const mealListFavour= document.getElementById('listfavour');
const addSearchEvent=document.getElementById('input-box');
const inputBox=document.getElementById('result-box');

let matchMeal=[];

//for render list on main page
function addMealToDom(meal){
	const li=document.createElement('li');

	li.innerHTML=`<div class="more_info" id="${meal.idCategory}">
		click for more info
	</div>
	<div class="mealdescription">
		<div id="image">
			<img src="${meal.strCategoryThumb}">
		</div>

		<div id="description">
			<h4>${meal.strCategory}</h4>
		    <p>${meal.strCategoryDescription.substring(0,50)}....
		</div>

		<div class="fav" id="${meal.idCategory}">favourite</div>
	</div>`

	mealList.append(li);
}
//to make main list
function renderListMain(){
	mealList.innerHTML="";

	for(let i=0;i<mealArray.length;i++)
	{
		addMealToDom(mealArray[i]);
	}

	let v1=document.querySelectorAll(".fav");
}

function renderListSearchDetails(){
	mealList.innerHTML="";

	for(let i=0;i<matchMeal.length;i++)
	{
		addMealToDom(matchMeal[i]);
	}

	let v1=document.querySelectorAll(".fav");
}

//render list on detail page
function addMealToDomMain(meal)
{
	const li=document.createElement('li');

	li.innerHTML=`<div class="mealdescription">
		<div id="image">
			<img src="${meal.strCategoryThumb}">
		</div>

		<div id="description">
			<h4>${meal.strCategory}</h4>
		    <p>${meal.strCategoryDescription}
		</div>

		<div class="fav" id="${meal.idCategory}">favourite</div>
	</div>`

	mealList.append(li);
}

//render list on detail page
function renderListDetails(id){
	mealList.innerHTML="";

	for(let i=0;i<mealArray.length;i++)
	{
		if(id==mealArray[i].idCategory)
		{
			addMealToDomMain(mealArray[i]);
		}
	}
}

//render list on fav page
function addMealToDomFav(meal){
	const li=document.createElement('li');

	li.innerHTML=`<div class="more_info" id="${meal.idCategory}">
		click for more info
	</div>
	<div class="mealdescription">
		<div id="image">
			<img src="${meal.strCategoryThumb}">
		</div>

		<div id="description">
			<h4>${meal.strCategory}</h4>
		    <p>${meal.strCategoryDescription.substring(0,50)}....
		</div>

		<div class="remove" id="${meal.idCategory}">remove from favourite</div>
	</div>`

	mealList.append(li);
}

//render list on fav page
function renderListFavourite(){
	mealList.innerHTML="";

	for(let i=0;i<mealArray.length;i++)
	{
		if(mealArray[i].favourite)
		{
			addMealToDomFav(mealArray[i]);
		}
	}
}

//toggle fav function
function toggleFavourite(id){
	for(let i=0;i<mealArray.length;i++)
	{
		if(id==mealArray[i].idCategory)
		{
			mealArray[i].favourite=!mealArray[i].favourite;
			if(mealArray[i].favourite)
				alert("added to favourite");
			else
				alert("removed from favourite");
			break;
		}
	}

	console.log("toggled successfully");
}

function renderListSearch(){
	inputBox.innerHTML='';

	let ul=document.createElement('ul');
	for(let i=0;i<matchMeal.length;i++)
	{
		const li=document.createElement('li');
		li.innerHTML=`<div class="search-result" id="${matchMeal[i].idCategory}">${matchMeal[i].strCategory}</div>`;
		ul.append(li);
	}

	inputBox.append(ul);
}

function fillArray(text){
	matchMeal=[];

	for(let i=0;i<mealArray.length;i++)
	{
		let compare=true;
		for(let j=0;j<text.length;j++)
		{
			if(j>mealArray[i].strCategory.length || mealArray[i].strCategory.charAt(j).toLowerCase()!=text.charAt(j).toLowerCase())
			{
				compare=false;
				break;
			}
		}
		if(compare)
		{
			matchMeal.push(mealArray[i]);
		}
	}

	// if(matchMeal.length>0)
	// {
	// 	renderListSearch();
	// }
	// else
	// {
	// 	inputBox.innerHTML='';
	// 	return;
	// }
}

//adding meals from API to array
function fetchMeals(){
	fetch('https://www.themealdb.com/api/json/v1/1/categories.php').then(function (response) {
		return response.json();
	}).then(function(data){
		mealArray=data.categories;
		for(let i=0;i<mealArray.length;i++)
		{
			mealArray[i].favourite=false;
		}
		renderListMain();
	})
}

fetchMeals();

function handleClickListner(e){
	const target=e.target;
	console.log(target);

	if(target.className=='main')
	{
		renderListMain();
		return;
	}
	if(target.className=='favourite')
	{
		renderListFavourite();
		return;
	}
	if(target.className=='fav')
	{
		const id=target.id;
		toggleFavourite(id);
		return;
	}
	if(target.className=='more_info')
	{
		const id=target.id;
		renderListDetails(id);
		return;
	}
	if(target.className=='remove')
	{
		const id=target.id;
		toggleFavourite(id);
		renderListFavourite();
		return;
	}
	if(target.className=='search-result')
	{
		const id=target.id;
		addSearchEvent.value=target.innerHTML;
		inputBox.innerHTML='';
		return;
	}
	if(target.className=='search')
	{
		console.log(addSearchEvent.value);
		fillArray(addSearchEvent.value);
		renderListSearchDetails();
		inputBox.innerHTML='';
		return;
	}
}

function handleInputKeyPress(e)
{
	const text=e.target.value;
	if(e.key=='Enter')
	{
		console.log(addSearchEvent.value);
		fillArray(addSearchEvent.value);
		renderListSearchDetails();
		inputBox.innerHTML='';
		return;
	}
	if(text.length>0)
	{
		fillArray(text);
		if(matchMeal.length>0)
		{
			renderListSearch();
		}
		else
		{
			inputBox.innerHTML='';
			return;
		}
	}
	else
	{
		inputBox.innerHTML='';
		renderListMain();
		return;
	}
}

document.addEventListener('click',handleClickListner);
addSearchEvent.addEventListener('keyup',handleInputKeyPress);