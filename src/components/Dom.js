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

  const endGame = (computerObj) => {
    console.log("game ended");

    computerObj.forEach((cell) => {
      const newCell = cell.cloneNode(true);

      cell.parentNode.replaceChild(newCell, cell);
    });
  };

  const renderShips = (playerObj, computerObj) => {
    const playerCells = document.querySelectorAll(
      `.${playerObj.playerName} > div`
    );
    const computerCells = document.querySelectorAll(
      `.${computerObj.playerName} > div`
    );

    playerCells.forEach((cell) => {
      const coordX = cell.attributes.x.value - 1;
      const coordY = cell.attributes.y.value - 1;

      cell.classList.add(`${playerObj.gameboard.grid[coordY][coordX]}`);
    });

    computerCells.forEach((cell) => {
      const coordX = cell.attributes.x.value;
      const coordY = cell.attributes.y.value;

      const checkAttack = () => {
        const attack = computerObj.gameboard.receiveAttack(+coordX, +coordY);
        cell.setAttribute("class", attack);

        const retaliation = computerObj.randomAttack(playerObj);

        const playerArr = [...playerCells];
        const playerCell = playerArr.find(
          (player) =>
            +player.attributes.x.value === +retaliation[0] &&
            +player.attributes.y.value === +retaliation[1]
        );

        playerCell.setAttribute("class", retaliation[2]);

        if (computerObj.gameboard.isFleetSunk()) endGame(computerCells);
        if (playerObj.gameboard.isFleetSunk()) endGame(computerCells);
      };

      cell.addEventListener("click", checkAttack, { once: true });
    });
  };

  return { renderDom, renderShips };
};

export default Dom;
