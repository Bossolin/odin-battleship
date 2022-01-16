import Gameboard from "./Gameboard";

const Player = (name) => {
  const playerName = name;

  const gameboard = Gameboard();

  const attack = (x, y, enemyObj) => {
    enemyObj.gameboard.receiveAttack(x, y);
  };

  return { playerName, gameboard, attack };
};

export default Player;
