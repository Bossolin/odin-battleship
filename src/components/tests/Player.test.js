import Player from "../factories/Player";

describe("Playah tests", () => {
  let player;
  let enemy;

  beforeEach(() => {
    player = Player("Vlad");
    enemy = Player("Computer");
    enemy.gameboard.placeShip(2, 4, 4, true);
  });

  test("Players can take turns playing the game by attacking the enemy Gameboard", () => {
    expect(player.gameboard.fleet.battleship).toBe(null);

    player.attack(2, 3, enemy);
    player.attack(2, 4, enemy);

    expect(enemy.gameboard.grid[2][1]).toBe(-1);
    expect(enemy.gameboard.grid[3][1]).toBe(1);
    expect(enemy.gameboard.fleet.battleship.func.status).toEqual([1, 0, 0, 0]);
  });

  test("The game is played against the computer, so make ‘computer’ players capable of making random plays. The AI does not have to be smart, but it should know whether or not a given move is legal. (i.e. it shouldn’t shoot the same coordinate twice).", () => {});
});
