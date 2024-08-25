/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    //  for (game in games){

     

    //     // create a new div element, which will become the game card
    //     const gameCard = document.createElement("div");
    //     gameCard.classList.add("game-card");
    //     gameCard.innerHTML = `
    //     <p>game.name</p>
    //     <p>game.description</p>
    //     <p>game.pledged</p>
    //     <p>game.goal</p>
    //     <p>game.backers</p>
    //     <img class = "game-img" src=game.img alt="game.name"/>
    //     `
       

    //     // add the class game-card to the list
         
    //     // set the inner HTML using a template literal to display some info 
    //     // about each game
    //     // TIP: if your images are not displaying, make sure there is space
    //     // between the end of the src attribute and the end of the tag ("/>")
    //     gamescontainer.appendChild(gameCard);
    //     // append the game to the games-container
    //  }
     // Loop over each game in the data using a for...of loop
     for (const game of games) {
        // Create a new div element for the game card
        const gameCard = document.createElement("div");

        // Add the class game-card to the div
        gameCard.classList.add("game-card");

        // Set the inner HTML using a template literal to display game info
        gameCard.innerHTML = `
            <img class="game-img" src="${game.img}" alt="${game.name}"/>
            <p>${game.name}</p>
            <p>${game.description}</p>
            <p>Pledged: $${game.pledged.toLocaleString()}</p>
            <p>Goal: $${game.goal.toLocaleString()}</p>
            <p>Backers: ${game.backers}</p>
           
        `;

        // Append the game card to the games-container
        gamesContainer.appendChild(gameCard);
    }
}
addGamesToPage(GAMES_JSON);
// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((total, game)=>{
    return total + game.backers
},0 );

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised  = GAMES_JSON.reduce((total, game)=>{
    return total + game.pledged
}, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `${totalRaised.toLocaleString()}`
// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `${GAMES_JSON.length}`

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal)

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames) 
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal

    let fundedGames = GAMES_JSON.filter((game) => game.pledged >= game.goal)
    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames)
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(gamesContainer)

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", (e) => { filterUnfundedOnly() });
fundedBtn.addEventListener("click", (e) => { filterFundedOnly() });
allBtn.addEventListener("click", (e) => { showAllGames() });

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const countunfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal);

// create a string that explains the number of unfunded games using the ternary operator
const display = countunfundedGames.length > 1 ? `There are ${countunfundedGames.length} games that have not met their funding goal` : `There is ${countunfundedGames.length} game has not met their funding goal requirement`;

// create a new DOM element containing the template string and append it to the description container
const descriptionelement = document.createElement("p");
descriptionelement.innerHTML = display;
descriptionContainer.appendChild(descriptionelement);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [game1, game2, ...rest] = sortedGames;
// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameelement = document.createElement("p");
firstGameelement.innerHTML = game1.name;
firstGameContainer.appendChild(firstGameelement);
// do the same for the second game
const secondGameelement = document.createElement("p");
secondGameelement.innerHTML = game2.name;
secondGameContainer.appendChild(secondGameelement);
console.log("First word of top funded game:", game1.name.split(' ')[0]);
console.log("First word of second most funded game:", game2.name.split(' ')[0]);
// do the same for the runner up item
// Assuming you have a container for the runner-up game
const runnerUpContainer = document.getElementById("runner-up-container");

// Create a new element to hold the name of the runner-up game
const runnerUpElement = document.createElement("p");
runnerUpElement.innerHTML = rest[0]?.name || "No runner-up";

// Append the runner-up game element to the runner-up container
runnerUpContainer.appendChild(runnerUpElement);