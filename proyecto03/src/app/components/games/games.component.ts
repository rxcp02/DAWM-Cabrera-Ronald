import { Component } from '@angular/core';
import { Game } from '../../interface/game';
import { Location } from '@angular/common';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
})
export class GamesComponent {
  games!: Game[];
  platforms: string[] = ['PC (Windows)', 'Web Browser'];
  genres: string[] = [
    'Card Game',
    'MMORPG',
    'MOBA',
    'Shooter',
    'Strategy',
    'Battle Royale',
    'Sports',
  ];

  constructor(private location: Location) {
    this.loadGames();
  }

  loadGames() {
    let mmorpg = JSON.parse(localStorage.getItem('mmorpg')!);
    if (mmorpg) {
      this.games = mmorpg as Game[];
    }
  }

  filterByPlatform(platform: string) {
    this.loadGames();
    this.games = this.games.filter((game) => game['platform'] == platform);
    let titlePage = document.getElementsByClassName('titlePage');
    titlePage[0].innerHTML = platform + ' Games';
  }

  filterByGenre(genre: string) {
    this.loadGames();
    this.games = this.games.filter((game) => game['genre'] == genre);
    let titlePage = document.getElementsByClassName('titlePage');
    titlePage[0].innerHTML = genre + ' Games';
  }

  resetFilter() {
    this.loadGames();
    let titlePage = document.getElementsByClassName('titlePage');
    titlePage[0].innerHTML = 'MMO Games';
  }

  goBack() {
    this.location.back();
  }
}
