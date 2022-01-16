import Gameboard from "./Gameboard";

const Player = (name) => {
  const playerName = name;

  const gameboard = Gameboard();

  const attack = (x, y, enemyObj) => enemyObj.gameboard.receiveAttack(x, y);

  const randomAttack = (enemyObj) => {
    let x;
    let y;

    const generateNum = () => Math.floor(Math.random() * 10) + 1;

    const generateCoords = () => {
      x = generateNum();
      y = generateNum();
    };

    const shootCoords = () => {
      generateCoords();
      return attack(x, y, enemyObj);
    };

    let execute = shootCoords();

    while (execute === "Position already hit") {
      execute = shootCoords();
    }

    return execute;
  };

  return { playerName, gameboard, attack, randomAttack };
};

export default Player;
