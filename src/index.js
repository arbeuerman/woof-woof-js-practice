const dogsUrl = 'http://localhost:3000/pups';

allDogs = [];
getDogs();

function getDogs()
{
    fetch(dogsUrl)
    .then(res => res.json())
    .then( (json) => {
        allDogs = json;    
        displayDogs();
    });
}

const dogBar = document.getElementById('dog-bar');
function displayDogs()
{
    dogBar.innerHTML = '';
    allDogs.forEach(displayDog);
}

function displayDog(dog)
{
    const dogSpan = document.createElement('span');
    dogSpan.innerHTML = dog.name;
    
    dogSpan.addEventListener('click', () => {createDogDiv(dog)});
    dogBar.appendChild(dogSpan);
}

function createDogDiv(dog)
{
    const dogInfoDiv = document.getElementById('dog-info'); 
    dogInfoDiv.innerHTML = '';
    const dogDiv = document.createElement('div');
    const buttonLabel = dog.isGoodDog ? "Good Dog!" : "Bad Dog!";
    dogDiv.innerHTML = `
        <img src=${dog.image}>
        <h2> ${dog.name}</h2>
        <button>${buttonLabel}</button>
    `;
    const dogButton = dogDiv.querySelector('button');
    dogButton.addEventListener('click', () => updateDog(dog));
    dogInfoDiv.append(dogDiv);
}

function updateDog(dog)
{
    dog.isGoodDog = !dog.isGoodDog
    const dogUrl = `${dogsUrl}/${dog.id}`;
    fetch(dogUrl, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({isGoodDog : dog.isGoodDog})
    })
    .then(res => res.json())
    .then(createDogDiv);
}

//filter to only good dogs
//get filter button and add event listener
// const dogFilter = document.getElementById('good-dog-filter');
// dogFilter.addEventListener('click', filterDogs);

// function filterDogs(event)
// {
//     let buttonLabel = dogFilter.innerHTML;
//     buttonLabel = buttonLabel == "Filter good dogs: OFF" ? "Filter good dogs: ON" : "Filter good dogs: OFF"; 
//     dogFilter.innerHTML = buttonLabel;

//     allDogs.forEach((dog) => {
//         dogBar.innerHTML = '';
//         if(dog.isGoodDog && buttonLabel == "Filter good dogs: ON")
//         {
//             displayDog(dog);
//         }
//         else
//         {
//             displayDog(dog);
//         }
//     })

// }