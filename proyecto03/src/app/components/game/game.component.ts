import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Game } from '../../interface/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent {
  game!: Game;

  constructor(private location: Location, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      let id = params['id'];

      let mmorpg = JSON.parse(localStorage.getItem('mmorpg')!);

      if (mmorpg) {
        let games = mmorpg as Array<Game>;
        let gamesFiltered = games.filter((game) => game['id'] == id);
        this.game = gamesFiltered[0];
      }
    });
  }

  goBack() {
    this.location.back();
  }
}
