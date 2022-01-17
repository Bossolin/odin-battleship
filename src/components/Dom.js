/* eslint-disable no-plusplus */
const Dom = () => {
  const renderDom = (player, computer) => {
    const header = document.createElement("div");
    header.classList.add("header");
    header.innerText = "BATTLESHIP";
    document.body.appendChild(header);

    const grids = document.createElement("div");
    grids.classList.add("grids");
    document.body.appendChild(grids);

    const generateGrid = (obj) => {
      const grid = document.createElement("div");
      grid.classList.add(obj.playerName);

      let x = 1;
      let y = 1;

      for (let i = 0; i < 100; i++) {
        const cell = document.createElement("div");
        cell.setAttribute("x", x);
        cell.setAttribute("y", y);

        if (x === 10) {
          x = 1;
          y += 1;
        } else x += 1;

        grid.appendChild(cell);
      }

      return grid;
    };

    const playerGrid = generateGrid(player);
    const computerGrid = generateGrid(computer);

    grids.appendChild(playerGrid);
    grids.appendChild(computerGrid);
  };

  const renderShips = (obj) => {
    const cells = document.querySelectorAll(`.${obj.playerName} > div`);

    cells.forEach((cell) => {
      const coordX = cell.attributes.x.value;
      const coordY = cell.attributes.y.value;

      console.log(obj.gameboard.grid[coordY - 1][coordX - 1]);

      cell.classList.add(`${obj.gameboard.grid[coordY - 1][coordX - 1]}`);
    });
  };

  return { renderDom, renderShips };
};

export default Dom;
