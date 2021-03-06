import { Component } from '@angular/core';

export interface Team {
  player1: string;
  player2: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  teams: Array<Team> = [];
  chosenPlayers: Array<string> = [];
  mixedChosenPlayers: Array<string> = [];

  players = [
    { id: 1, name: 'Jakub', checked: false },
    { id: 2, name: 'Libor', checked: false },
    { id: 3, name: 'Radek', checked: false },
    { id: 4, name: 'Ondra', checked: false },
    { id: 5, name: 'Víťa', checked: false },
    { id: 6, name: 'Patrik', checked: false },
    { id: 7, name: 'David', checked: false },
    { id: 8, name: 'Michal', checked: false },
    { id: 9, name: 'Robert', checked: false },
    { id: 10, name: 'Aleš', checked: false },
    { id: 11, name: 'Marcel', checked: false },
  ];

  createTeams() {
    this.fillPlayersArray();
    this.mixPlayers();
    this.fillTeamsArray();
  }

  fillTeamsArray() {
    this.teams = [];
    let team: Team = {player1: '', player2: ''};

    while (this.mixedChosenPlayers.length > 0) {
      team.player1 = this.mixedChosenPlayers[0];
      this.mixedChosenPlayers.splice(0, 1);
      if (this.mixedChosenPlayers[0]) {
        team.player2 = this.mixedChosenPlayers[0];
        this.mixedChosenPlayers.splice(0, 1);
      } else {
        team.player2 = ' ';
      }
      this.teams.push({ player1: team.player1, player2: team.player2});
    }
  }

  mixPlayers() {
    const tempPlayersArray = Object.assign([], this.chosenPlayers);
    this.mixedChosenPlayers = [];

    while (tempPlayersArray.length > 0) {
      const index = this.chooseIndex(tempPlayersArray.length);
      this.mixedChosenPlayers.push(tempPlayersArray[index]);
      tempPlayersArray.splice(index, 1);
    }
  }

  chooseIndex(max) {
    return Math.floor(Math.random() * max);
  }

  fillPlayersArray() {
    for (const player of this.players) {
      if ((player.checked) && !(this.chosenPlayers.indexOf(player.name) > -1)) {
          this.chosenPlayers.push(player.name);
        } else if (!(player.checked) && (this.chosenPlayers.indexOf(player.name) > -1)) {
           const index = this.chosenPlayers.indexOf(player.name);
           this.chosenPlayers.splice(index, 1);
        }
      }
  }

  selectAll() {
    for (let player of this.players) {
      player.checked = true;
    }
  }

  unselectAll() {
    for (let player of this.players) {
      player.checked = false;
    }
  }

  selectChampions() {
    for (let i = 0; i < 6; i++) {
      this.players[i].checked = true;
    }
    for (let i = 6; i < this.players.length; i++) {
      this.players[i].checked = false;
    }
  }
}
