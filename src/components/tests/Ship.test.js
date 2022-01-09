import Ship from "../factories/Ship";

describe("Ship tests", () => {
  let ship;

  beforeEach(() => {
    ship = Ship(4);
  });

  test("should have hit array", () => {
    expect(ship.status).toEqual([0, 0, 0, 0]);
  });

  test("should be hit()", () => {
    expect(ship.hit(2)).toEqual([0, 0, 1, 0]);
    expect(ship.hit(1)).toEqual([0, 1, 1, 0]);
    expect(ship.hit(0)).toEqual([1, 1, 1, 0]);
  });

  test("should not sink by default", () => {
    expect(ship.isSunk()).toBe(false);
  });

  test("should sink", () => {
    ship.status.forEach((cell, i) => {
      ship.status[i] = 1;
    });
    expect(ship.isSunk()).toBe(true);
  });
});
