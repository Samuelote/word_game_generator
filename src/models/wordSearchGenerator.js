export default function generateWordSearch(words) {
  let grid = [];
  drawBoard();

  function drawBoard(){
    let arr = [];
    const longestWord = (words.length > 0) ?
                            words.sort(function (a, b) { return b.length - a.length; })[0].length :
                                10;
    for (let i = 0; i < Math.floor(longestWord*1.7); i++){
      let array2 = [];
      array2.length = (longestWord >= 10 ) ? Math.floor(longestWord*1.7) : 20;
      array2.fill('.')
      arr.push(array2)
    }
    grid.push(arr);
    
    for (let j = 0; j < words.length; j++){
      switcher(words[j], Math.floor(Math.random() * ((3) - 0) + 0))
    }

    drawLetters();
  }
  function switcher(word, random) {
      switch(random){
        case 0:
          horizontal(word)
          break
        case 1:
          vertical(word)
          break
        case 2:
          diagnal(word)
          break
        default:
          return null
      }
  }
  function horizontal(word){
    const randoY = Math.floor(Math.random() * ((grid[0].length) - 0) + 0)
    const randoX =   Math.floor(Math.random() * ((grid[0][0].length-word.length)-0) + 0)
    let check = true;
    for (var j = 0; j < word.split('').length; j++){ // checks for overlap
      if (grid[0][randoY]){
        if (grid[0][randoY][randoX+j] !== '.' && grid[0][randoY][randoX+j] !== word.split('')[j]){
          check = false
          break
        }
      }
      else {
        break
      }
    }
    if (check === false){
      switcher(word, Math.floor(Math.random() * ((3) - 0) + 0))
    }
    else {
      for (let y = 0; y < grid.length; y++){ // columns
        for (let x = 0; x < grid[0].length; x++){ // rows
          for (let i = 0; i < word.split('').length; i++){ // loops through word
            grid[0][randoY][randoX+i] = word[i]
          }
        }
      }
    }
  }
  function vertical(word){
    const randoY = Math.floor(Math.random() * ((grid[0].length-word.length) - 0) + 0)
    const randoX =   Math.floor(Math.random() * ((grid[0][0].length)-0) + 0)
    let check = true;
    for (var j = 0; j < word.split('').length; j++){ // checks for overlap
      if (grid[0][randoY+j]){
        if (grid[0][randoY+j][randoX] !== '.'){
          check = false;
          break
        }
      }
      else {
        break
      }

    }
    if (check === false){
      switcher(word, Math.floor(Math.random() * ((3) - 0) + 0));
    }
    else {
      for (let y = 0; y < grid.length; y++){ // columns
        for (let x = 0; x < grid[0].length; x++){ // rows
          for (let i = 0; i < word.split('').length; i++){ // loops through word
            grid[0][randoY+i][randoX] = word[i]
          }
        }
      }
    }
  }
  function diagnal(word){
    const randoY = Math.floor(Math.random() * ((grid[0].length-word.length) - 0) + 0)
    const randoX =   Math.floor(Math.random() * ((grid[0][0].length-word.length)-0) + 0)
    let check = true;
    for (var j = 0; j < word.split('').length; j++){ // checks for overlap
      if (grid[0][randoY+j]){
        if (grid[0][randoY+j][randoX+j] !== '.'){
          check = false
        }
      }
      else {
        check = false
      }
    }
    if (check === false){
      switcher(word, Math.floor(Math.random() * ((3) - 0) + 0));
    }
    else {
      for (let y = 0; y < grid[0].length; y++){ // columns
        for (let x = 0; x < grid[0].length; x++){ // rows
          for (let i = 0; i < word.split('').length; i++){ // loops through word
            grid[0][randoY+i][randoX+i] = word[i]
          }
        }
      }
    }
  }



  function drawLetters(){
    for (let i = 0; i < grid[0].length; i++){
      for (let j = 0; j < grid[0][i].length; j++){
        if (grid[0][i][j] === '.'){
          grid[0][i][j] = String.fromCharCode(Math.floor(Math.random() * ((91) - 65) + 65));
          // this.state.grid[i][j] = '.';
        } else {
          grid[0][i][j] = grid[0][i][j].toLowerCase();
        }
      }
    }
  }
  return grid[0];

}
