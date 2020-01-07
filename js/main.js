// listen for form submit

document.getElementById("myForm").addEventListener("submit", saveBookmark);


//Save bookmark
function saveBookmark(e) {
    //get form values

    let siteName = document.getElementById('siteName').value;
    let siteUrl = document.getElementById('siteUrl').value;

    if (!validateForm(siteName, siteUrl)) {
        return false;


    }


    let bookmark = {
        name: siteName,
        url: siteUrl
    }






    // test if bookmarks is null
    if (localStorage.getItem('bookmarks') === null) {
        //init array
        let bookmarks = [];
        // Add to array
        bookmarks.push(bookmark);
        //set to localStorage
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
    } else {
        // get element from local storage
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // add bookmark to array
        bookmarks.push(bookmark);
        // re-set back to local storage
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    }

// clear form 
document.getElementById('myForm').reset();


    // re - fetch bookmark
    fetchBookmarks();

    //prevents form from submitting;
    e.preventDefault();
}
// delete bookmark
function deleteBookmark(url) {

    //get bookmark
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // loop through bookmarks
    for (let i = 0; i < bookmarks.length; i++) {

        if (bookmarks[i].url == url) {
            // remove from array 
            bookmarks.splice(i, 1);

        }

    }

    // re-set back to local storage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    // re - fetch bookmark
    fetchBookmarks();
}





// fetch bookmarks

function fetchBookmarks() {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //get output id
    let bookmarksResults = document.getElementById('bookmarksResults');
    // build output
    bookmarksResults.innerHTML = '';

    for (let i = 0; i < bookmarks.length; i++) {
        const url = bookmarks[i].url;
        const name = bookmarks[i].name ? bookmarks[i].name : url;
        bookmarksResults.innerHTML += '<div class="well">' +
            '<h3>' + name +
            ' <a class="btn btn-light" target="_blank" href="' + url + '"> Visit </a> ' +
            ' <a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger" href="#"> Delete </a> ' +
            '</h3>' +
            '</div>';
    }
}
// Validate form

function validateForm (siteName, siteUrl) {

    if (!siteUrl) {
        alert("Please enter valid site url");
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteUrl.match(regex)) {
        alert("Please enter valid site url");
        return false;

    }

    return true;

}