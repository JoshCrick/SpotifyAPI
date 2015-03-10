// find template's within index.hmtl and compile it using handlbars.js
var templateSource = document.getElementById('results-template').innerHTML;
var templateSource2 = document.getElementById('results-template2').innerHTML;
var templateSource3 = document.getElementById('results-template3').innerHTML;
var templateSource4 = document.getElementById('results-template4').innerHTML;
var templateSource5 = document.getElementById('results-template5').innerHTML;
var templateSource6 = document.getElementById('results-template6').innerHTML;

    template = Handlebars.compile(templateSource),
    template2 = Handlebars.compile(templateSource2),
    template3 = Handlebars.compile(templateSource3),
    template4 = Handlebars.compile(templateSource4),
    template5 = Handlebars.compile(templateSource5),
    template6 = Handlebars.compile(templateSource6),

    resultsPlaceholder = document.getElementById('results'),
    AresultsPlaceholder = document.getElementById('artistresutlts'),
    SresultsPlaceholder = document.getElementById('songresutlts'),
    AlresultsPlaceholder = document.getElementById('a1results'),
    Al1resultsPlaceholder = document.getElementById('a2results'),
    Al2resultsPlaceholder = document.getElementById('a3results'),

    playingCssClass = 'playing',
    audioObject = null;


//fetchTracksforAlbum function taking in albumID & callback for preview_url within jsonObject for 30 second preview of searched/displayed album
var fetchTracksforAlbum = function (albumId, callback) {
    $.ajax({
        url: 'https://api.spotify.com/v1/albums/' + albumId,
        success: function (response) {
            callback(response);
        }
    });
};

//getTrack function taking in trackID of a specific track sleceted by the user for preview_url within jsonObject for 30 second preview of desired track

var getTrack = function(trackId, callback){
$.ajax({
        url: 'https://api.spotify.com/v1/tracks/' + trackId,
        success: function (response) {
            callback(response); 
        }
    });

};

//Get Several Artist Function to get specific artists hardcoded into js
var getArtists = function (query) {
    $.ajax({
        url: 'https://api.spotify.com/v1/artists',
        data: {
            ids: query,
            type: 'artist'
        },

        success: function (response) {
            AresultsPlaceholder.innerHTML = template2(response); //updates template with response
        }
    });
};

//get desired artist songs, nested querys for multiple artists songs
var getArtistSongs = function (query, query1, query2) {

    $.ajax({
        url: 'https://api.spotify.com/v1/artists/'+ query + '/top-tracks?country=US',

        success: function (response) {
            $.ajax({
                url: 'https://api.spotify.com/v1/artists/'+ query1 + '/top-tracks?country=US',
                    success: function (response1) {
                        $.ajax({
                            url: 'https://api.spotify.com/v1/artists/'+ query2 + '/top-tracks?country=US',
                                success: function (response2) {
                                    SresultsPlaceholder.innerHTML  = template3(response) + template3(response1) + template3(response2) ; //updates templates with all three responses
                                }
                         });  
                    }
            });
        }
    });

    
    
};
//Search Function to allow the user to search any artist. 
var searchAlbums = function (query) {
    $.ajax({
        url: 'https://api.spotify.com/v1/search',
        data: {
            q: query,
            type: 'album'
        },
        success: function (response) {
            resultsPlaceholder.innerHTML = template(response); //updates template with response
        }
    });
};

//getAlbum funciton to get all the albums limited to 5 from the desired artist (hardcoded)  
var getMJAlbums = function (query) {
    $.ajax({
        url: 'https://api.spotify.com/v1/artists/' + query + '/albums?album_type=album&limit=5',

        success: function (response) {
            AlresultsPlaceholder.innerHTML = template4(response);//updates template with response
            
        }
    });
};

//getAlbum funciton to get all the albums limited to 5 from the desired artist (hardcoded)  
var getLightAlbums = function (query) {
    $.ajax({
        url: 'https://api.spotify.com/v1/artists/' + query + '/albums?album_type=album&limit=5',

        success: function (response) {
            Al1resultsPlaceholder.innerHTML = template5(response);//updates template with response
            
        }
    });
};
//getAlbum funciton to get all the albums limited to 5 from the desired artist (hardcoded)  

var getOhSAlbums = function (query) {
    $.ajax({
        url: 'https://api.spotify.com/v1/artists/' + query + '/albums?album_type=album&limit=5',

        success: function (response) {
            Al2resultsPlaceholder.innerHTML = template6(response);//updates template with response
            
        }
    });
};

//on Click event via an EventListener to exectue Function
results.addEventListener('click', function(e) {
    var target = e.target;
    if (target !== null && target.classList.contains('cover')) { //Checks if the target within "results" div contains 'cover' element
        if (target.classList.contains(playingCssClass)) { 
            audioObject.pause();
        } else {
            if (audioObject) {
                audioObject.pause();
            }
            fetchTracksforAlbum(target.getAttribute('data-album-id'), function(data) { //obtains the variable "data-album-id" which contains ID to be queried.           
                audioObject = new Audio(data.tracks.items[0].preview_url); //obtains the preview_url within data received to play sample 
                audioObject.play(); //play sample
                target.classList.add(playingCssClass);
                audioObject.addEventListener('ended', function() {
                    target.classList.remove(playingCssClass);
                });
                audioObject.addEventListener('pause', function() {
                    target.classList.remove(playingCssClass);
               });
            });
        }
    }
});

function getPreview (e){

    var target = e.target;
    if (target !== null && target.classList.contains('artist-cover')) {
        if (target.classList.contains(playingCssClass)) {
            audioObject.pause();
        } else {
            if (audioObject) {
                audioObject.pause();
            }
            fetchTracksforAlbum(target.getAttribute('data-album-id'), function(data) {            
                audioObject = new Audio(data.tracks.items[0].preview_url);
                audioObject.play();
                target.classList.add(playingCssClass);
                audioObject.addEventListener('ended', function() {
                    target.classList.remove(playingCssClass);
                });
                audioObject.addEventListener('pause', function() {
                    target.classList.remove(playingCssClass);
               });
            });
        }
    }


}
a1results.addEventListener('click', function(e) {
    getPreview(e);
    
});
a2results.addEventListener('click', function(e) {
    getPreview(e);
});
a3results.addEventListener('click', function(e) {
    getPreview(e);
});
songresutlts.addEventListener('click', function(e) {
    var target = e.target;
    if (target !== null && target.classList.contains('song-text')) {
        if (target.classList.contains(playingCssClass)) {
            audioObject.pause();
        } else {
            if (audioObject) {
                audioObject.pause();
            }
            getTrack(target.getAttribute('data-track-id'), function(data) {            
                audioObject = new Audio(data.preview_url);
                audioObject.play();
                target.classList.add(playingCssClass);
                audioObject.addEventListener('ended', function() {
                    target.classList.remove(playingCssClass);
                });
                audioObject.addEventListener('pause', function() {
                    target.classList.remove(playingCssClass);
               });
            });
        }
    }
});
function clearDIV(elementID)
{
    document.getElementById(elementID).innerHTML = "";
}


document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault();
    clearDIV('results');
    clearDIV('songresutlts');
    clearDIV('a1results');
    clearDIV('a2results');
    clearDIV('a3results');
    searchAlbums(document.getElementById('query').value);
}, false);

document.getElementById('artistssbtn').addEventListener('click', function (e) {
    e.preventDefault();
    getArtists('5pdyjBIaY5o1yOyexGIUc6,3fMbdgg4jU18AjLCKBhRSm,3HMsQNXUa0je3yG5REHkQ7');
}, false);

document.getElementById('songsbtn').addEventListener('click', function (e) {
    e.preventDefault();
    clearDIV('results');
    clearDIV('songresutlts');
    clearDIV('a1results');
    clearDIV('a2results');
    clearDIV('a3results');
    getArtistSongs('5pdyjBIaY5o1yOyexGIUc6', '3fMbdgg4jU18AjLCKBhRSm','3HMsQNXUa0je3yG5REHkQ7' );

}, false);

document.getElementById('albumsbtn').addEventListener('click', function (e) {
    e.preventDefault();
    clearDIV('results');
    clearDIV('songresutlts');
    clearDIV('a1results');
    clearDIV('a2results');
    clearDIV('a3results');
    getMJAlbums('3fMbdgg4jU18AjLCKBhRSm');
    getLightAlbums('5pdyjBIaY5o1yOyexGIUc6');
    getOhSAlbums('3HMsQNXUa0je3yG5REHkQ7');

}, false);
//searchAlbums('Bring Me the Horizon');


