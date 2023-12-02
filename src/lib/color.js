function getRandomColorWithOpacity(opacity) {
    const randomRed = Math.floor(Math.random() * 256);
    const randomGreen = Math.floor(Math.random() * 256);
    const randomBlue = Math.floor(Math.random() * 256);
    const randomColor = `rgba(${randomRed},${randomGreen},${randomBlue},${opacity})`;
    return randomColor;
  }
export {getRandomColorWithOpacity}  