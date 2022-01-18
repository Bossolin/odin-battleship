import Dom from "./Dom";
import Player from "./factories/Player";

const Game = () => {
  const player = Player("Player");
  const computer = Player("Computer");

  player.gameboard.placeShip(2, 2, 5, true);
  player.gameboard.placeShip(2, 4, 4, true);
  player.gameboard.placeShip(2, 6, 3, true);
  player.gameboard.placeShip(2, 8, 3, true);
  player.gameboard.placeShip(2, 10, 2, true);

  computer.gameboard.placeShip(2, 2, 5, true);
  computer.gameboard.placeShip(2, 4, 4, true);
  computer.gameboard.placeShip(2, 6, 3, true);
  computer.gameboard.placeShip(2, 8, 3, true);
  computer.gameboard.placeShip(2, 10, 2, true);

  const dom = Dom();
  dom.renderDom(player, computer);
  dom.renderShips(player, computer);
};

export default Game;
