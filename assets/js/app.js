//Variables
const tweetForm = document.querySelector("#form");
const tweetList = document.querySelector("#tweet-list");

//Event Listeners
tweetForm.addEventListener("submit", newTweet);
tweetList.addEventListener('click', removeElement);
document.addEventListener('DOMContentLoaded', localStorageOnLoad);

//Functions
function newTweet(e) {
    e.preventDefault();
    const tweetText = document.querySelector("#tweet").value;

    if (tweetText) {
        //Create list items on form submit, if the value is not empty
        const listElement = document.createElement("li");
        listElement.textContent = tweetText;

        //Create Remove button and append to list
        const removeBtn = document.createElement('a');
        removeBtn.textContent = 'X';
        removeBtn.classList = 'remove-tweet';
        listElement.appendChild(removeBtn);

        //Append list items to container
        tweetList.appendChild(listElement);

        //Add list items  to Local Storage
        addTweetsToStorage(tweetText);

        //Show message after adding element
        message('success', '✔ Tweet added!');

        //Remove form value after adding new item
        this.reset();
    }

}

function removeElement(e) {
    //Remove list items on click the X button
    if (e.target.classList.contains('remove-tweet')) {
        e.target.parentElement.remove();
    }
    
    //On X click, Remove list items from Local Storage
    removeTweetFromLS(e.target.parentElement.textContent);

    //Show message after removing list item
    message('removed', 'X Tweet removed!');

}

function addTweetsToStorage(tweetText) {
    let tweets = getTweetsFromStorage();
    tweets.push(tweetText);
    localStorage.setItem('tweets', JSON.stringify(tweets))
}

function getTweetsFromStorage() {
    let tweets;

    const tweetLS = localStorage.getItem('tweets');
    if (tweetLS === null) {
        tweets = []
    } else {
        tweets = JSON.parse(tweetLS)
    }
    return tweets
}

function localStorageOnLoad() {
    //Bring back the items on Page load     
    let tweets = getTweetsFromStorage();

    tweets.forEach(tweetText => {
        const listElement = document.createElement("li");

        if (tweetText) {
            listElement.textContent = tweetText;

            const removeBtn = document.createElement('a');
            removeBtn.textContent = 'X';
            removeBtn.classList = 'remove-tweet';
            listElement.appendChild(removeBtn);

            tweetList.appendChild(listElement);
        }
    });
}
function removeTweetFromLS(tweetText) {
    let tweets = getTweetsFromStorage();

    //Remove X letter from each value
    const tweetTextDelete = tweetText.substring(0, tweetText.length - 1);

    //Find element in array and remove from it
    tweets.forEach((tweetLS, index) => {
        if (tweetTextDelete === tweetLS) {
            tweets.splice(index, 1)
        }
    })

    //Update local storage after removing list item
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function message(className, textContent) {
    const addedElement = document.createElement('p');
    addedElement.classList = className;
    addedElement.textContent = textContent;
    tweetForm.appendChild(addedElement);
    setTimeout(function () {
        addedElement.remove();
    }, 500)
}