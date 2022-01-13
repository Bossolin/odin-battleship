import Gameboard from "../factories/Gameboard";
import Ship from "../factories/Ship";

describe("Gameboard tests", () => {
  let gameboard;

  beforeEach(() => {
    gameboard = Gameboard();
  });

  test.todo(
    "Gameboards should be able to place ships at specific coordinates by calling the ship factory function.",
    () => {}
  );

  test.todo(
    "Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot."
  );

  test.todo(
    "Gameboards should keep track of missed attacks so they can display them properly."
  );

  test.todo(
    "Gameboards should be able to report whether or not all of their ships have been sunk."
  );
});
