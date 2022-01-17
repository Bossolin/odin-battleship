/* eslint-disable no-plusplus */
const Dom = () => {
  const renderDom = () => {
    const header = document.createElement("div");
    header.classList.add("header");
    header.innerText = "BATTLESHIP";
    document.body.appendChild(header);

    const grids = document.createElement("div");
    grids.classList.add("grids");
    document.body.appendChild(grids);

    const playerGrid = document.createElement("div");
    playerGrid.classList.add("player-grid");
    grids.appendChild(playerGrid);

    const computerGrid = document.createElement("div");
    computerGrid.classList.add("computer-grid");
    grids.appendChild(computerGrid);

    const generateGrid = () => {
      const grid = document.createElement("div");

      for (let i = 0; i < 100; i++) {
        const cell = document.createElement("div");

        grid.appendChild(cell);
      }

      return grid;
    };

    const grid1 = generateGrid();
    const grid2 = generateGrid();

    playerGrid.appendChild(grid1);
    computerGrid.appendChild(grid2);
  };

  const renderShips = () => {};

  return { renderDom, renderShips };
};

export default Dom;
