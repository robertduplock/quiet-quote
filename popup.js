document.addEventListener('DOMContentLoaded', function() {
    getQuote();    
}, false);

function getQuote() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=json&lang=en", true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                try {
                    var resp = JSON.parse(xhr.responseText);
                    document.getElementById('loadImg').style.display = "none";
                    var wrapper = document.getElementById('wrapper');
                    wrapper.querySelector('#quote').innerText = resp.quoteText;
                    var author = resp.quoteAuthor ? resp.quoteAuthor : "Anon";
                    wrapper.querySelector('#author').innerText = '- ' + author;
                    // if quote is too long, make the font smaller
                    if (resp.quoteText.length > 145) {
                        wrapper.querySelector('#quote').style.fontSize = '20px';
                        wrapper.querySelector('#author').style.fontSize = '18px';
                    }
                } catch (e) {
                    // if API fails, try again in 1 second
                    console.log('API call failed - retrying in 1 second...')
                    setTimeout(function() {
                        getQuote();
                    }, 1000);                
                }
            } 
        }
        xhr.send();
}