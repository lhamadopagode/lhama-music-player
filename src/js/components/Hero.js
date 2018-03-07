import React, { Component } from 'react';

export default function Hero(props) {
  return (
    <div className="header-hero">
      <div className="wrapper">
        <div className="header-hero__text-wrapper">
          <h1 className="header-hero__title">O limite da música é o infinito.</h1>
        </div>
        <div className="header-hero__cards">
        <h2 className="header-hero__cards-title">
          Playlists
        </h2>
          <div className="playlist-card-wide__wrapper">
            <a href="javascript:;" className="playlist-card-wide">
              <h2 className="playlist-card-wide__title">Playlist Title</h2>
              <img className="playlist-card-wide__cover" src="http://placehold.it/500x300" alt=""/>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}