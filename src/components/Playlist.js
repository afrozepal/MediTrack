import React, { Component } from 'react';
import { useState } from 'react';
import '../styles/Playlist.css';
import Sidebar from './Sidebar';
import searchIcon from '../assets/icons8-search-100.png';
import { useSelector } from 'react-redux';

const Playlist = () => {
  const songs = [
    {
      id: 1,
      title: "Electric Storm",
      artist: "Aurora Wave",
      album: "Album 1",
      imageurl: "https://picsum.photos/200/300",
      linke: "https://www.youtube.com/watch?v=gjuS3CS_9Bw"
    },
    {
      id: 2,
      title: "Midnight Sky",
      artist: "Luna Nightingale",
      album: "Album 2",
      imageurl: "https://picsum.photos/200/301",
      linke: "https://www.youtube.com/watch?v=XTCaxna7Mpo"
    },
    {
      id: 3,
      title: "Whispers in the Dark",
      artist: "Raven Blackwood",
      album: "Album 3",
      imageurl: "https://picsum.photos/200/302",
      linke: "https://www.youtube.com/watch?v=79kpoGF8KWU"
    },
    {
      id: 4,
      title: "Fading Light",
      artist: "Solara Flux",
      album: "Album 4",
      imageurl: "https://picsum.photos/200/303",
      linke: "https://www.youtube.com/watch?v=xm0zT8Sim3c"
    },
    {
      id: 5,
      title: "Shattered Dreams",
      artist: "Kairos Requiem",
      album: "Album 5",
      imageurl: "https://picsum.photos/200/304",
      linke: "https://www.youtube.com/watch?v=cny0FPLPN_s"
    },
    {
      id: 6,
      title: "Echoes in the Night",
      artist: "Aria Nocturne",
      album: "Album 6",
      imageurl: "https://picsum.photos/200/305",
      linke: "https://www.youtube.com/watch?v=XwCad_n5HLY"
    },
    {
      id: 7,
      title: "Lost in the Haze",
      artist: "Nova Spire",
      album: "Album 7",
      imageurl: "https://picsum.photos/200/306",
      linke: "https://www.youtube.com/watch?v=XwCad_n5HLY"
    },
    {
      id: 8,
      title: "Ghostly Whispers",
      artist: "Lila Shadow",
      album: "Album 8",
      imageurl: "https://picsum.photos/200/307",
      linke: "https://www.youtube.com/watch?v=XwCad_n5HLY"
    },
    {
      id: 9,
      title: "Starlight Serenade",
      artist: "Caelum Astrum",
      album: "Album 9",
      imageurl: "https://picsum.photos/200/308",
      linke: "https://www.youtube.com/watch?v=XwCad_n5HLY"
    }
  ];
  const [searchQuery, setSearchQuery] = useState('');
  const username = useSelector(state => state.username);
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredSongs = songs.filter(song => {
    return song.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <div className="search-bar1 d-flex justify-content-center align-items-center">
              <input type="text" className="search-inpu form-control" placeholder="Search..." value={searchQuery}
                onChange={handleSearchChange} />
              <button className="btndesign btn btn-outline-secondary" type="button">
                <img src={searchIcon} alt="Search" width="20" height="20" />
              </button>
            </div>
            <div className="dropdown-profile">
              <a href="/" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
              </a>
              <p className='username-text'>Welcome {username}</p> {/* Display the username here */}
              <ul className="dropdown-menu text-small shadow">
                <li><a className="dropdown-item" href="/">My Profile</a></li>
                {/* <li><a className="dropdown-item" href="/">Settings</a></li> */}
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="/">Sign out</a></li>
              </ul>
            </div>
            <br />
            <h2 className='Articles-heading'>Playlist</h2>
            <div className='desc-profile'>Here you can listen to relaxing music.</div>
            <div className="song-container row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

              {filteredSongs.map((song, index) => (
                <div key={index} className="playcard card" style={{ margin: '20px' }}>
                  <img src={song.imageurl} className="play-card-image card-img-top" alt="..." />
                  <div className="playcardbody card-body">
                    <h5 className="playcardtitle card-title">{song.title}</h5>
                    <p className="playtext card-text">{song.artist} - {song.album}</p>
                    <a href={song.linke} className="bt" target="_blank" rel="noreferrer">
                      <i className="fa fa-play" aria-hidden="true"></i> Play
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Playlist;

