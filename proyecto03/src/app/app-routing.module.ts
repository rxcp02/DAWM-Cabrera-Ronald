import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FirstpageComponent } from './components/firstpage/firstpage.component';
import { GamesComponent } from './components/games/games.component';
import { GameComponent } from './components/game/game.component';
import { EditorComponent } from './components/editor/editor.component';

const routes: Routes = [
  { path: 'firstgame', component: FirstpageComponent },
  { path: 'games', component: GamesComponent },
  { path: 'game/:id', component: GameComponent },
  { path: 'editor', component: EditorComponent },
  { path: '**', redirectTo: 'firstgame' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
