const getInput = async() => {
    const inputSong = document.getElementById('inputSongs').value;
    const url = `https://api.lyrics.ovh/suggest/${inputSong}`
    try {
        const res = await fetch(url);
        const data = await res.json();
        viewInput(data.data);
    }
    catch (error) {
        displayError('Something wrong');
    }
    
}

const viewInput = (data) => {
    const ul = document.getElementById('items');
    ul.innerHTML = '';
    data.forEach(element => {
        const li = document.createElement('div');
        li.className = 'single-result row align-items-center my-3 p-3';
        li.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${element.title}</h3>
                <p class="author lead">${element.artist.name}</span></p>
            <audio controls>
               <source src="${element.preview}" type="audio/ogg">
            </audio> 
            </div>
        <div class="col-md-3 text-md-right text-center">
            <button onClick = "getLyrics('${element.artist.name}','${element.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
                               
        `
        ul.appendChild(li);
    });
    
}

const getLyrics = (artist, title) => {
    const lyrics = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    fetch(lyrics)
        .then(res => res.json())
        .then(data => displayLyrics(data.lyrics))
    .catch(error => displayError(error))
}

const displayLyrics = lyrics => {
    const lyric = document.getElementById('lyrics');
    lyric.innerText = '';
    lyric.innerText = lyrics;
}

const displayError = error => {
    const showError = document.getElementById('display-error');
    showError.innerText = error;
}

