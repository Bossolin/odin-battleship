const Ship = (length) => {
  const status = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    status.push(0);
  }

  const hit = (position) => {
    status[position] = 1;

    return status;
  };

  const isSunk = () => {
    if (status.every((cell) => cell === 1)) return true;
    return false;
  };

  return { status, hit, isSunk };
};

export default Ship;
