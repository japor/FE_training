// Make a div
const div = document.createElement('div');
// add a class of wrapper to it
div.classList.add('wrapper');
// put it into the body
document.body.appendChild(div);

// make an unordered list
const ul = document.createElement('ul');
// add three list items with the words "one, two, three" in them
const li1 = document.createElement('li');
const li2 = document.createElement('li');
const li3 = document.createElement('li');
li1.textContent = 'one';
li2.textContent = 'two';
li3.textContent = 'three';
ul.appendChild(li1);
ul.appendChild(li2);
ul.appendChild(li3);
// put that list into the above wrapper
div.appendChild(ul);
// create an image
const img = document.createElement('img');
// set the source to an image
img.src = 'https://upload.wikimedia.org/wikipedia/commons/3/3e/President_Rodrigo_Duterte.jpg';
// set the width to 250
img.width = 250;
// add a class of cute
img.classList.add('cute');
// add an alt of Cute Puppy
img.alt = 'Cute Doggo';
// Append that image to the wrapper
div.appendChild(img);

// with HTML string, make a div, with two paragraphs inside of it
const htmlGaming = `
<div class="divGaming">
    <p>Lorem ipsum 1</p>
    <p>Lorem ipsum 2</p>
</div>`;
// put this div before the unordered list from above
const ulElement = div.querySelector('ul');
ulElement.insertAdjacentHTML('beforebegin', htmlGaming);
// add a class to the second paragraph called warning
const divGaming = document.querySelector('.divGaming');
divGaming.lastElementChild.classList.add('warning');
// remove the first paragraph
divGaming.firstElementChild.remove();
// create a function called generatePlayerCard that takes in three arguments: name, age, and height
function generatePlayerCard( name, age, height ) {
    return `
    <div class="playerCard">
        <h2>${name} — ${age}</h2>
        <p>They are ${height} and ${age} years old. In Dog years this person would be AGEINDOGYEARS. That would be a tall dog!</p>
        <button type="button" class="delete">&times;</button>
    </div>
    `;
}
 
// have that function return html that looks like this:
// <div class="playerCard">
//   <h2>NAME — AGE</h2>
//   <p>They are HEIGHT and AGE years old. In Dog years this person would be AGEINDOGYEARS. That would be a tall dog!</p>
// </div>

// make a new div with a class of cards
const newDiv = document.createElement('div');
newDiv.classList.add('cards');
// make 4 player cards using generatePlayerCard
const cards = [
    { name : 'sven', age : 10, height: 100 },
    { name : 'luna', age : 8, height: 90 },  
    { name : 'shadow fiend', age : 15, height: 150 },
];

// append those cards to the div
let cardsHtml = '';
cards.forEach(card => {
    cardsHtml += generatePlayerCard( card.name, card.age, card.height );
});
newDiv.innerHTML = cardsHtml;
// put the div into the DOM just before the wrapper element
div.insertAdjacentElement('beforebegin', newDiv);
// Bonus, put a delete Button on each card so when you click it, the whole card is removed

// select all the buttons!
// make out delete function
// loop over them and attach a listener
const btnDelete = document.querySelectorAll('.delete');
btnDelete.forEach( button => button.addEventListener('click', function(e) {
    e.currentTarget.parentNode.remove();
} ) );