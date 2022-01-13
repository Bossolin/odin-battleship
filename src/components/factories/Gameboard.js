import Ship from "./Ship";

/* eslint-disable no-plusplus */
const Gameboard = () => {
  const grid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  const fleet = {
    carrier: null,
    battleship: null,
    destroyer: null,
    submarine: null,
    patrolBoat: null,
  };

  const placeShip = (coordX, coordY, length, xDirection) => {
    const ship = {
      x: [coordX],
      y: [coordY],
      func: Ship(length),
    };

    const populateX = () => {
      for (let i = 1; i < length; i++) {
        ship.x.push(ship.x[0] + i);
      }
    };

    const populateY = () => {
      for (let i = 1; i < length; i++) {
        ship.y.push(ship.y[0] + i);
      }
    };

    if (xDirection) {
      populateX();
    } else {
      populateY();
    }

    const shipPosition = (shipName) => {
      if (xDirection) {
        for (let i = 0; i < length; i++) {
          grid[coordY - 1][coordX - 1 + i] = shipName;
        }
      } else {
        for (let i = 0; i < length; i++) {
          grid[coordY - 1 + i][coordX - 1] = shipName;
        }
      }
    };

    switch (length) {
      case 5:
        fleet.carrier = { name: "carrier", ...ship };
        shipPosition("carrier");
        break;
      case 4:
        fleet.battleship = { name: "battleship", ...ship };
        shipPosition("battleship");
        break;
      case 3:
        if (!fleet.destroyer) {
          fleet.destroyer = { name: "destroyer", ...ship };
          shipPosition("destroyer");
        } else {
          fleet.submarine = { name: "submarine", ...ship };
          shipPosition("submarine");
        }
        break;
      case 2:
        fleet.patrolBoat = { name: "patrolBoat", ...ship };
        shipPosition("patrolBoat");
        break;

      default:
        break;
    }
  };

  return { placeShip };
};

export default Gameboard;
