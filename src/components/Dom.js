/* eslint-disable no-plusplus */
const Dom = () => {
  const renderDom = () => {
    const header = document.createElement("div");
    header.classList.add("header");
    header.innerText = "BATTLESHIP";
    document.body.appendChild(header);

    const announcer = document.createElement("div");
    announcer.classList.add("announcer");
    announcer.innerText = "Place your ships";
    document.body.appendChild(announcer);

    const rotateBtn = document.createElement("button");
    rotateBtn.innerText = "Rotate Ship";
    announcer.appendChild(rotateBtn);

    const grids = document.createElement("div");
    grids.classList.add("grids");
    document.body.appendChild(grids);
  };

  const generateGrid = (obj) => {
    const grids = document.querySelector(".grids");

    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");

    const alphabet = document.createElement("div");
    alphabet.classList.add("alphabet");
    wrapper.appendChild(alphabet);

    for (let i = 0; i < 10; i++) {
      const string = "ABCDEFGHIJ";
      const letter = document.createElement("div");
      letter.innerText = string[i];
      alphabet.appendChild(letter);
    }

    const numbers = document.createElement("div");
    numbers.classList.add("numbers");
    wrapper.appendChild(numbers);

    for (let i = 0; i < 10; i++) {
      const number = document.createElement("div");
      number.innerText = i + 1;
      numbers.appendChild(number);
    }

    const grid = document.createElement("div");
    grid.classList.add(obj.playerName);
    wrapper.appendChild(grid);

    let x = 1;
    let y = 1;

    let length = 5;
    let condish = true;
    let xDirection = true;

    const rotate = document.querySelector(".announcer button");

    if (rotate)
      rotate.addEventListener("click", () => {
        xDirection = !xDirection;
      });

    const placeShip = (e) => {
      if (length === 1) return;

      const placeX = e.target.attributes.x.value;
      const placeY = e.target.attributes.y.value;

      obj.gameboard.placeShip(placeX, placeY, length, xDirection);

      if (length === 3 && condish) {
        length = 4;
        condish = false;
      }

      length -= 1;

      if (length === 1) {
        const announcer = document.querySelector(".announcer");
        console.log(announcer);
        announcer.innerText = "Play the game";
      }
    };

    const isFleetPlaced = () => {
      const ships = Object.keys(obj.gameboard.fleet);

      const { fleet } = obj.gameboard;

      const status = [];

      ships.forEach((ship) =>
        fleet[ship] ? status.push(true) : status.push(false)
      );

      return status.every((ship) => ship);
    };

    for (let i = 0; i < 100; i++) {
      const cell = document.createElement("div");
      cell.setAttribute("x", x);
      cell.setAttribute("y", y);

      if (x === 10) {
        x = 1;
        y += 1;
      } else x += 1;

      grid.appendChild(cell);

      if (!isFleetPlaced()) cell.addEventListener("click", placeShip);
    }

    grids.appendChild(wrapper);
  };

  const endGame = (computerObj, name) => {
    const announcer = document.querySelector(".announcer");
    const restartBtn = document.createElement("button");
    restartBtn.innerText = "Restart";

    computerObj.forEach((cell) => {
      const newCell = cell.cloneNode(true);

      cell.parentNode.replaceChild(newCell, cell);
    });

    announcer.innerText = `${name} won the game!`;
    announcer.appendChild(restartBtn);

    restartBtn.addEventListener("click", () => {
      window.location.reload();
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

        if (computerObj.gameboard.isFleetSunk())
          endGame(computerCells, playerObj.playerName);
        if (playerObj.gameboard.isFleetSunk())
          endGame(computerCells, computerObj.playerName);
      };

      cell.addEventListener("click", checkAttack, { once: true });
    });
  };

  return { renderDom, renderShips, generateGrid };
};

export default Dom;
