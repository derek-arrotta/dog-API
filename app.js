// opt in to strict mode (javascript subset, with different semantics). opts out of "sloppy mode"
'use strict';

// set base url definition for API (random dog image generator)
// https://dog.ceo/api/breed/hound/images/random
let url1 = 'https://dog.ceo/api/breed/';
let url2 = '/images/random';

// get dog image through fetching URL
function getDogImages(dogBreed) {
    // define dogURL
    let dogURL= url1 + dogBreed + url2; 
    // fetch dog images from API URL
    return fetch(dogURL) // fetch returns promise
    // convert response to json for readable format
    // (promise method. response is a parameter (url). doesn't have to be called "response". just an argument of a function (this is a function =>))
        .then(response => response.json())
    // if error happens, give alert message
        .catch(error => alert('Something went wrong. Try again later.'));
}

// display results by setting "responseJson" variable to "response" url from above
function displayResults(responseJson) {
    console.log(responseJson);
    //replace the existing image with the new one
        // replace placeholder images with dog images
    if (responseJson.code == 404) {
        $('.results-img-1').replaceWith(`<p>${responseJson.message}</p>`)
    }

    else {
        $('.results-img-1').replaceWith(
        `<img src="${responseJson.message}" class="results-img-1">`
        )
        //display the results section
        $('.image-title').removeClass('hidden')
        $('.results-img-1').removeClass('hidden');
    }
}

// when form is submitted ("generate dog pic(s)!" is pressed), run getDogImages function
function watchForm() {
    $('form').submit(event => {
        // prevent default action of form submit (prevent from submitting form and just perform action below)
        event.preventDefault();
        // get number of images entered by user
        const dogBreed = $('#dogBreed').val();
        // get dog images and display for user
        getDogImages(dogBreed)
            .then(response => {
                displayResults(response);
        });
    });
}

// run functions
$(function() {
    // when web page first loads, the function runs and this message runs
    console.log('App loaded! Waiting for submit!');
    // watch form will not run until submit is pressed. once watch form runs, all previous functions are triggered
    watchForm();
});
