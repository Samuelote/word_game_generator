/**
 * @arg {Array<Strings>} words - list of words to be turned into a crossword
 */
export const genMatrix = (base) => Array.from({ length: base }, () => new Array(Math.ceil(base * 1.5)).fill(0))

/**
 *@arg {string} w1
 *@arg {string} w2
 */
export const findCrossPoints = (w1, w2) => {
  let fin = []
  for (let i = 0; i < w1.length; i++) {
    if (w2.indexOf(w1[i]) > -1) {
      for (let j = 0; j < w2.length; j++) {
        if (w1[i] === w2[j]) fin.push([i, j])
      }
    }
  }
  return fin
}

/**
*@arg {int} x - column value
*@arg {int} y - row value
*@arg {String} dir -
*@returns {boolean}
*/
function placeWord(x, y, dir, word, mtrx) {
  const lay = (bool) => {
    let cell;
    word.split('').forEach((char, i) => {
      console.log(x + i, y+ i, mtrx.length, mtrx[0].length, dir)
      if (dir === 'v'){
        cell = mtrx[y+i][x]
        if ( cell !== 0 && cell !== char) return false
        else if (bool) mtrx[y+i][x] = char
      } else {
        cell = mtrx[y][x+i]
        if ( cell !== 0 && cell !== char) return false
        else if (bool) mtrx[y][x+i] = char
      }
    })
  }
  if (lay(false)) lay(true);
}

function coinToss() {
  // return ['v', 'h'][Math.floor(Math.random() * 2)]
  return 'h'
}

export default function crosswordGenerator(words) {
  const sorted = words.sort((a, b) => b.length - a.length)
  const bigWordLen = sorted[0].length + 1
  const mtrx = genMatrix(bigWordLen)
  const genConfig = (dir) => ([
      Math.floor((mtrx[0].length - (dir === 'v') ? bigWordLen : 0) / 2),
      Math.floor((mtrx.length - (dir !== 'v') ? bigWordLen : 0) / 2),
      dir
    ])

  placeWord(...genConfig(coinToss()), sorted[0], mtrx);
  return mtrx;
}
