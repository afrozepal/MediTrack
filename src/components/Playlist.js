import React, { Component } from 'react';
import '../styles/Playlist.css';
import Sidebar from './Sidebar';

class Playlist extends Component {
  render() {
    const songs = [
      {
        id: 1,
        title: "Electric Storm",
        artist: "Aurora Wave",
        album: "Album 1",
        imageurl: "https://picsum.photos/200/300",
        linke: "(link unavailable)"
      },
      {
        id: 2,
        title: "Midnight Sky",
        artist: "Luna Nightingale",
        album: "Album 2",
        imageurl: "https://picsum.photos/200/301",
        linke: "(link unavailable)"
      },
      {
        id: 3,
        title: "Whispers in the Dark",
        artist: "Raven Blackwood",
        album: "Album 3",
        imageurl: "https://picsum.photos/200/302",
        linke: "(link unavailable)"
      },
      {
        id: 4,
        title: "Fading Light",
        artist: "Solara Flux",
        album: "Album 4",
        imageurl: "https://picsum.photos/200/303",
        linke: "(link unavailable)"
      },
      {
        id: 5,
        title: "Shattered Dreams",
        artist: "Kairos Requiem",
        album: "Album 5",
        imageurl: "https://picsum.photos/200/304",
        linke: "(link unavailable)"
      },
      {
        id: 6,
        title: "Echoes in the Night",
        artist: "Aria Nocturne",
        album: "Album 6",
        imageurl: "https://picsum.photos/200/305",
        linke: "(link unavailable)"
      },
      {
        id: 7,
        title: "Lost in the Haze",
        artist: "Nova Spire",
        album: "Album 7",
        imageurl: "https://picsum.photos/200/306",
        linke: "(link unavailable)"
      },
      {
        id: 8,
        title: "Ghostly Whispers",
        artist: "Lila Shadow",
        album: "Album 8",
        imageurl: "https://picsum.photos/200/307",
        linke: "(link unavailable)"
      },
      {
        id: 9,
        title: "Starlight Serenade",
        artist: "Caelum Astrum",
        album: "Album 9",
        imageurl: "https://picsum.photos/200/308",
        linke: "(link unavailable)"
      }
    ];

    return (
      <>
        <Sidebar />
        <br />
        <br />
        <h1>SONGS</h1>
        <br />
        <br />
        <div className="songs-container">

          {songs.map((song, index) => (
            <div key={index} className="card" style={{ width: 'calc(24.33% - 20px)', margin: '20px' }}>
              <img src={song.imageurl} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{song.title}</h5>
                <p className="card-text">{song.artist} - {song.album}</p>
                <a href={song.linke} className="bt" target="_blank" rel="noreferrer">
                  <i className="fa fa-play" aria-hidden="true"></i> Play
                </a>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default Playlist;