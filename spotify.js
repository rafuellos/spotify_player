


$('.search_button').on('click', searchArtist);
$('.song_search').keyup(function (e) {
  if (e.keyCode == 13) {
    searchArtist(event);
  };
});

function searchArtist(event) {
  event.preventDefault();
  $('#play_song').removeClass('disabled')
  console.log('Searching songs with %s', $('.song_search').val());
  var request = $.get('https://api.spotify.com/v1/search?type=track&query=' + $('.song_search').val());
 
  $('.song_search').val('');
  //$('.results').removeClass('hidden');
  function handleArtists(songsList) {

    $('.results').empty();
    songsList.tracks.items.forEach (function handleSongs(song){
      if (song.album.images.length > 0) {
           var img = song.album.images[0].url
         } else {
           var img = 'http://www.craneometal.com/sites/default/files/images/spotify-logo-primary-vertical-dark-background-rgb.jpg'
         };

      console.log(img);
      var html = '<p song_id="' + song.id + '" coverdata="'+ img +'"><b> ' + song.name + '</b> by '; 
       console.log(html.coverdata);
       console.log (song);
      var name = song.artists[0].name;
      if (song.artists.length > 1) {
        for (i = 1; i < song.artists.length; i++) {
          name += ' and ' + song.artists[i].name;
        }
      };

      html += name + '      <span class= "listen_track lead glyphicon glyphicon-play">Play</span></p>'
      $('.results').removeClass('hidden').append(html);
    });
  };

  function handleError(err1, err2, err3) {
    console.error('OH NO!!', err1, err2, err3);
    alert('Please insert a Song')
  }

  request.done(handleArtists);
  request.fail(handleError);
}

$('.results').on('click', '.listen_track', updateSong);

function updateSong (event) {
  event.preventDefault(); 
  console.log('Updating song: %s', $(this).parent().attr('song_id'));
  var cover = $(this).parent().attr('coverdata');
  $('#cover').attr('src', cover);    
  console.log(cover);

  //Add cover if not accesible
  //var img = 'http://www.craneometal.com/sites/default/files/images/spotify-logo-primary-vertical-dark-background-rgb.jpg'
  var url = 'https://api.spotify.com/v1/tracks/' + $(this).parent().attr('song_id');
  console.log(url)
  $.get(url, function(song){
    $('#title').empty().append(song.name) 
    var name = song.artists[0].name;
    if (song.artists.length > 1) {
      for (i = 1; i < song.artists.length; i++) {
        name += ' and ' + song.artists[i].name;
      }
    };
    $('#author').empty().append(name); 
    $('#audio_preview').attr('src', song.preview_url)    
    playSong(event);
  });
};




function playSong(event){
  event.preventDefault();
  console.log('Playing a song');
  var button = $('#audio_preview');

  if (!button.hasClass('disabled') && button.hasClass('pause')) {
      $('#audio_preview').removeClass('pause').addClass('playing').trigger('play');
      $('#play_song').removeClass('playing');

  } else {
      button.removeClass('playing').addClass('pause').trigger('pause');
      $('#play_song').addClass('playing');   
  }    

    
  current = 0;
  $('#audio_preview').on('timeupdate', printTime);
  
  function printTime () {
    var current = $('#audio_preview').prop('currentTime');
    //console.debug('Current time: ' + current)
    $('#progress').attr('value', current);
  }
  
};


// Have printTime be called when the time is updated


$('#play_song').on('click', playSong);
