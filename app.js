// opt in to strict mode (javascript subset, with different semantics). opts out of "sloppy mode"
'use strict';

// set base url definition for API (random dog image generator)
let url = 'https://dog.ceo/api/breeds/image/random';

// get dog image through fetching URL. ex: "https://dog.ceo/api/breeds/image/random/3"
function getDogImages(dogNumber) {
    let dogURL= url + '/' + dogNumber; // add "/dogNumber" to url
    return fetch(dogURL) // fetch returns promise
    // convert response to json for readable format
    // (promise method. response is a parameter (url). doesn't have to be called "response". just an argument of a function (this is a function =>))
        .then(response => response.json())
        .then(responseJson => displayResults(responseJson))
    // if error happens, give alert message
        .catch(error => alert('Something went wrong. Try again later.'));
}

// display results by setting "responseJson" variable to "response" url from above
function displayResults(responseJson) {
    // print json dog image url info to console
    console.log(responseJson);
    // empty old results
    $('.results').empty();

    //replace the existing images with new ones
    for (let i=0; i<responseJson.message.length; i++) {
        // replace placeholder images with dog images
        $('.results').append(
        `<img src="${responseJson.message[i]}" class="results-img">`
        )
        //display the results section
        $('.results').removeClass('hidden');
    }
}

// when form is submitted ("generate dog pic(s)!" is pressed), run getDogImages function
function watchForm() {
    $('form').submit(event => {
        // prevent default action of form submit (prevent from submitting form and just perform action below)
        event.preventDefault();
        // get number of images entered by user
        const dogNumber = $('#dogNum').val();
        // get dog images and display for user
        getDogImages(dogNumber);
    });
}

// run functions
$(function() {
    // when web page first loads, the function runs and this message runs
    console.log('App loaded! Waiting for submit!');
    // watch form will not run until submit is pressed. once watch form runs, all previous functions are triggered
    watchForm();
});
