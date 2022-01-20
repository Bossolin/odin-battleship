import Dom from "./Dom";
import Player from "./factories/Player";

const Game = () => {
  const player = Player("Player");
  const computer = Player("Computer");
  const dom = Dom();

  // player.gameboard.placeShip(2, 2, 5, true);
  // player.gameboard.placeShip(2, 4, 4, true);
  // player.gameboard.placeShip(2, 6, 3, true);
  // player.gameboard.placeShip(2, 8, 3, true);
  // player.gameboard.placeShip(2, 10, 2, true);

  const lazyCPU = () => {
    const random = Math.floor(Math.random() * 5) + 1;

    switch (random) {
      case 5:
        computer.gameboard.placeShip(2, 2, 5, true);
        computer.gameboard.placeShip(2, 4, 4, true);
        computer.gameboard.placeShip(2, 6, 3, true);
        computer.gameboard.placeShip(2, 8, 3, true);
        computer.gameboard.placeShip(2, 10, 2, true);
        break;

      case 4:
        computer.gameboard.placeShip(5, 10, 5, true);
        computer.gameboard.placeShip(3, 2, 4, false);
        computer.gameboard.placeShip(5, 3, 3, false);
        computer.gameboard.placeShip(8, 2, 3, false);
        computer.gameboard.placeShip(8, 7, 2, true);
        break;

      case 3:
        computer.gameboard.placeShip(5, 6, 5, false);
        computer.gameboard.placeShip(3, 2, 4, true);
        computer.gameboard.placeShip(1, 10, 3, true);
        computer.gameboard.placeShip(7, 9, 3, true);
        computer.gameboard.placeShip(8, 4, 2, true);
        break;

      case 2:
        computer.gameboard.placeShip(1, 6, 5, true);
        computer.gameboard.placeShip(1, 10, 4, true);
        computer.gameboard.placeShip(3, 2, 3, false);
        computer.gameboard.placeShip(6, 8, 3, true);
        computer.gameboard.placeShip(9, 10, 2, true);
        break;

      case 1:
        computer.gameboard.placeShip(5, 3, 5, false);
        computer.gameboard.placeShip(8, 5, 4, false);
        computer.gameboard.placeShip(2, 8, 3, false);
        computer.gameboard.placeShip(7, 10, 3, true);
        computer.gameboard.placeShip(7, 1, 2, true);
        break;

      default:
        break;
    }
  };

  lazyCPU();

  const isFleetPlaced = () => {
    const ships = Object.keys(player.gameboard.fleet);

    const { fleet } = player.gameboard;

    const status = [];

    ships.forEach((ship) =>
      fleet[ship] ? status.push(true) : status.push(false)
    );

    return status.every((ship) => ship);
  };

  dom.renderDom();
  dom.generateGrid(player);

  const checkFleet = () => {
    if (isFleetPlaced()) {
      dom.generateGrid(computer);
      dom.renderShips(player, computer);

      document.body.removeEventListener("click", checkFleet);
    }
  };

  document.body.addEventListener("click", checkFleet);
};

export default Game;
