import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Game } from '../../interface/game';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent {
  games!: Game[];

  someArray: { key: string; value: string }[] = [
    { key: 'Overwatch 2', value: 'one' },
    { key: 'League of Legends', value: 'two' },
    { key: 'Brawlhalla', value: 'three' },
  ];

  constructor(private location: Location) {
    this.editGames();
  }

  loadGames() {
    let mmorpg = JSON.parse(localStorage.getItem('mmorpg')!);
    if (mmorpg) {
      this.games = mmorpg as Game[];
    }
    this.games = this.games.filter(
      (game) =>
        game['title'] == 'Overwatch 2' ||
        game['title'] == 'League of Legends' ||
        game['title'] == 'Brawlhalla'
    );
  }

  editGames() {
    this.loadGames();
    for (let i = 0; i < this.games.length; i++) {
      for (let j = 0; j < this.someArray.length; j++) {
        if (this.someArray[j].key == this.games[i].title) {
          this.games[i].short_description = this.someArray[j].value;
        }
      }
    }
  }

  goBack() {
    this.location.back();
  }
}
