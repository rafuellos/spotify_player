Week 5 Friday Exercise: Playing Spotify songs
=============================================

Iteration #1: Song search
-------------------------

1. Make a page with a search form.
2. When user searches,
search the Spotify API for songs matching the search term.
3. Use the first song in the results.
4. Update the player HTML with the song and artist info.


Iteration #2: Audio playback
----------------------------

1. When the user searches, add the song's preview to the `<audio>` tag's `src`.
2. When the user clicks the play button,
select the `<audio>` tag with jQuery and trigger playback.
3. Update the play button's appearance by adding the `playing` class.
4. When the user clicks again, trigger a pause on the audio element.
5. When pausing remove the play button's `playing` class
6. Once your click event is set up,
remove the `disabled` class from the play button.


Iteration #3: Progress bar
--------------------------

1. The `<audio>` tag has a `timeupdate` event
that notifies you as the playback time progresses.
2. Listen for the `timeupdate` event
and update the progress bar's `value` attribute with the tag's `currentTime`.


Advanced Iteration #1: Artist modal
-----------------------------------

1. Make the artist name a button or link.
2. When a user clicks the artist name,
make a request to the Spotify API to get the artist's information.
Show a Bootstrap modal containing the artist's information.


The `<audio>` tag
-----------------

All an `<audio>` tag needs for playing audio is a `src` attribute.
The `src` attribute needs to be the URL to an audio file
that the browser can play.
For example, mp3:

```html
<audio src="https://example.com/song.mp3" class="js-player"></audio>
```

Now you can use jQuery to trigger playback whenever you want:

```js
// Play audio
$('.js-player').trigger('play');
```

When you want to pause, you also use jQuery's `.trigger()` function:

```js
// Pause audio
$('.js-player').trigger('pause');
```

The `<audio>` element can also tell you the current playback time
with the `currentTime` property:

```js
$('.js-player').prop('currentTime');
```

That isn't too useful on its own,
but in conjunction with the `timeupdate` event it can be.
If you register a callback on the element's `timeupdate` event,
your function will be called several times as the `currentTime` changes.

```js
// Define a function to print the player's current time
function printTime () {
  var current = $('.js-player').prop('currentTime');
  console.debug('Current time: ' + current);
}

// Have printTime be called when the time is updated
$('.js-player').on('timeupdate', printTime);
```


Bootstap's modal
----------------

To use Bootstrap's [modal](http://getbootstrap.com/javascript/#live-demo), you need to add some HTML for the modal to your page.

```html
<div class="modal fade js-modal">
  <div class="modal-dialog">
    <div class="modal-content">

      <div class="modal-header">
        <!-- Close button -->
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span>&times;</span>
        </button>

        <h2>This is the modal's header.</h2>
      </div>

      <div class="modal-body">
        <p>This is the modal's body.</p>
      </div>

    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
```

Yes you **do** need all those `<div>` tags.
Replace the `modal-header` and `modal-body` content with what you require.

With your modal in the HTML, you can now select it and open it like this:

```js
$('.js-modal').modal();
```


The player HTML and CSS
-----------------------

```html
<div class="widget">
  <div class="header">
    <!-- Try adding/removing these classes: -->
    <!-- disabled -->
    <!-- playing -->
    <div class="btn-play disabled"></div>

    <div class="metadata">
      <p class="title">Hunger of The Pine</p>
      <p class="author">alt-J</p>

      <div class="seekbar">
        <progress value="5" max="30"></progress>
      </div>
    </div>
  </div>
  <div class="cover">
    <img src="https://i.scdn.co/image/04da6dfc1f5f45fdeba938a0cc71cf372524fd43">
  </div>

  <audio src="https://p.scdn.co/mp3-preview/8e9c5ffdc38e91659bfe8b6bd44650dfc25a3d31"></audio>
</div>
```

```css
.widget {
  width: 300px;
  margin: 10px auto 0;
  border-radius: 5px;
  overflow: hidden;
  display: block;
}

.header {
  height: 78px;
  background-color: #ccc;
  position: relative;
  font-size: 12px;
}

.btn-play {
  margin: 9px;
  width: 60px;
  height: 60px;
  float: left;
  border-radius: 50px;
  border: 1px solid #3c3c3c;
  user-select: none;
  -webkit-user-select: none;
}

.btn-play:after {
  content: ' ';
  position: relative;
  display: block;
  width: 0px;
  height: 0px;
  margin-left: 50%;
  margin-top: 50%;
  left: -10px;
  top: -18px;
  border-top: 18px solid transparent;
  border-bottom: 18px solid transparent;
  border-left: 30px solid #3c3c3c;
}

.btn-play:hover {
  cursor: pointer;
  border-color: #666;
}

.btn-play:hover:after {
  border-left-color: #666;
}

.btn-play:active:after {
  border-left-color: #000;
}

.btn-play.playing:before, .btn-play.playing:after {
  width: 9px;
  height: 36px;
  background-color: #3c3c3c;
  position: absolute;
  content: "";
  top: 22px;
  left: 27px;
  border: 0;
  margin: 0;
}

.btn-play.playing:after {
  left: 43px;
}

.btn-play.playing:hover:before, .btn-play.playing:hover:after {
  background-color: #666;
}

.btn-play.playing:active:before, .btn-play.playing:active:after {
  background-color: #000;
}

.btn-play.disabled {
  border-color: #888;
}

.btn-play.disabled:hover {
  cursor: auto;
}

.btn-play.disabled:after {
  border-left-color: #888;
}

.metadata {
  display: inline-block;
  padding: 10px;
  width: calc(100% - 100px);
}

.title, .author {
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
  line-height: 1.4em;
  height: 1.4em;
  font-size: 14px;
  font-weight: bold;
}

.author {
  font-weight: normal;
}

.seekbar {
  margin-top: 5px;
  width: 100%;
}

.cover {
  height: 300px;
  position: relative;
}

.cover img {
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  left: 0;
  border: 0;
}

audio {
  display: none;
}

progress {
  width: 100%;
  height: 5px;
  padding: 0;
  background-color: #3e3e40;
  position: relative;
  border: 0;
  overflow: hidden;
}

progress::-webkit-progress-bar {
  background-color: #3e3e40;
}

progress::-webkit-progress-value {
  background-color: #45a800;
}

progress::-moz-progress-bar {
  background-color: #45a800;
}
```
