import Gameboard from "../factories/Gameboard";

describe("Gameboard tests", () => {
  let gameboard;

  beforeEach(() => {
    gameboard = Gameboard();
  });

  test("Gameboards should be able to place ships at specific coordinates by calling the ship factory function.", () => {
    gameboard.placeShip(4, 5, 3, true);

    expect(gameboard.grid).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, "destroyer", "destroyer", "destroyer", 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);

    expect(gameboard.fleet.destroyer.name).toBe("destroyer");
  });

  test("Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.", () => {
    gameboard.placeShip(2, 3, 4, true);
    gameboard.receiveAttack(1, 1);
    gameboard.receiveAttack(2, 3);
    gameboard.receiveAttack(3, 3);

    expect(gameboard.grid[0][0]).toBe(-1);
    expect(gameboard.grid[2][1]).toBe(1);
    expect(gameboard.fleet.battleship.func.status).toEqual([1, 1, 0, 0]);
  });

  test("Gameboards should keep track of missed attacks so they can display them properly.", () => {
    gameboard.receiveAttack(7, 8);

    expect(gameboard.grid[7][6]).toBe(-1);

    expect(gameboard.receiveAttack(7, 8)).toBe("Position already hit");
  });

  test("Gameboards should be able to report whether or not all of their ships have been sunk.", () => {
    gameboard.placeShip(2, 2, 5, true);
    gameboard.placeShip(2, 4, 4, true);
    gameboard.placeShip(2, 6, 3, true);
    gameboard.placeShip(2, 8, 3, true);
    gameboard.placeShip(2, 10, 2, true);

    expect(gameboard.isFleetSunk()).toBe(false);

    gameboard.receiveAttack(2, 2);
    gameboard.receiveAttack(3, 2);
    gameboard.receiveAttack(4, 2);
    gameboard.receiveAttack(5, 2);
    gameboard.receiveAttack(6, 2);
    gameboard.receiveAttack(2, 4);
    gameboard.receiveAttack(3, 4);
    gameboard.receiveAttack(4, 4);
    gameboard.receiveAttack(5, 4);
    gameboard.receiveAttack(2, 6);
    gameboard.receiveAttack(3, 6);
    gameboard.receiveAttack(4, 6);
    gameboard.receiveAttack(2, 8);
    gameboard.receiveAttack(3, 8);
    gameboard.receiveAttack(4, 8);
    gameboard.receiveAttack(2, 10);
    gameboard.receiveAttack(3, 10);

    expect(gameboard.isFleetSunk()).toBe(true);
  });
});
