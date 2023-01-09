import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ResourcesService } from '../../service/resources.service';
import { Game } from '../../interface/game';

@Component({
  selector: 'app-firstpage',
  templateUrl: './firstpage.component.html',
  styleUrls: ['./firstpage.component.css'],
})
export class FirstpageComponent implements OnInit {
  game!: Game;

  constructor(
    private resourcesService: ResourcesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.resourcesService.getData().subscribe((response) => {
      let mmorpg = localStorage.getItem('mmorpg');
      if (!mmorpg) {
        localStorage.setItem('mmorpg', JSON.stringify(response));
      }
    });

    let id = this.getRandomId();

    let mmorpg = JSON.parse(localStorage.getItem('mmorpg')!);

    if (mmorpg) {
      let games = mmorpg as Array<Game>;
      let gamesFiltered = games.filter((game) => game['id'] == id);
      this.game = gamesFiltered[0];
    }
  }

  getRandomId() {
    let mmorpg = JSON.parse(localStorage.getItem('mmorpg')!);
    const randomId = mmorpg[Math.floor(Math.random() * mmorpg.length)].id;
    return randomId;
  }

  goToRandom() {
    this.router.navigate(['/game', this.getRandomId()]);
  }
}
