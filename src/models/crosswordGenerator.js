
function getTop(arr) {
  for (let i=0;i<arr.length;i++) {
    for (let j=0;j<arr[i].length;j++) {
      if (arr[i][j] !== 0) return i;
    }
  }
}

export default function generateCrossword(words) {
  if (words.length < 1) return [];
  let sorted = words.sort((a,b) => b.length - a.length)

  const mLen = sorted[0].length
  const mtrx = Array.from({length: mLen * 2 }, () => Array(mLen * 2).fill(0))

  let cDir = 'h'

  //Will be array of objects to contain name, x, y , and dir
  let plantedWords = []
  const plantWord = (word, y, x, dir, justChecking) => {
    if (
       justChecking && (
       // check for vertically travelling words
       (dir === 'v' && (mtrx[y-1] === undefined || mtrx[y+word.length] === undefined || mtrx[y+word.length-1] === undefined || Boolean(mtrx[y-1][x]) || Boolean(mtrx[y+word.length][x]) )) ||
       //check for horizintally travelling words
       (dir === 'h' && (mtrx[y] === undefined|| (mtrx[y][x + word.length - 1] === undefined) || Boolean(mtrx[y][x-1]) || Boolean(mtrx[y][x+word.length])))
      )
     ) {
       return false
     }
    else if (justChecking) {
      for (let i=0;i<word.length; i++) {
        if(dir === 'v') {
          if (mtrx[y+i][x] !== 0 && mtrx[y+i][x] !== word[i]) return false
          else if (mtrx[y+i][x] !== word[i]) {
            if (mtrx[y+i][x+1] !== 0 || mtrx[y+i][x-1] !== 0) return false
          }
        }
        else {
          if (mtrx[y][x+i] !== 0 && mtrx[y][x+i] !== word[i]) return false
          else if (mtrx[y][x+i] !== word[i]) {
            if (mtrx[y+1] === undefined || mtrx[y+1][x+i] !== 0 || mtrx[y-1][x+i] !== 0) return false
          }
        }
      }
      return true;
    }
    else if (!justChecking){
      for(let i=0;i<word.length;i++) {
        if (dir === 'v'){
          mtrx[y+i][x] = word[i]
        }
        else if( dir === 'h'){
          mtrx[y][x+i] = word[i]
        }
      }
      plantedWords.push({ dir, x, y, name: word })
      return true
    }
  }

  //returns array of arrays where [ w1 point of intersection, w2 point of intersection ]
  //if the first word is vertical the second word will need to start at(y,x): (y of last + lastPt, x of last - nextPt)
  // else will need to start at(y, x): (y of last - nextPt, x of last + nextPt)
  const findCrossPts = (last, next) => {
    const xPts = []
    const checked = ""
    for (let i=0;i<last.length;i++) {
      if (next.indexOf(last[i]) > -1 && checked.indexOf(last[i]) === -1) {
        for (let j=0; j<next.length; j++) {
          if (last[i] === next[j]) xPts.push([i, j])
        }
      }
    }
    if (!xPts.length) return [];
    return xPts
  }

  //Put largest word horizontally in middle of the board
  plantWord(sorted[0], mtrx.length / 2, (mtrx[0].length - mLen) / 2, cDir)

  //Loop through the res of the words in the sorted array
  for (let s=1; s < sorted.length;s++) {
    cDir = cDir === 'v' ? 'h' : 'v';
    let last = plantedWords[(cDir === 'v') ? 0 : plantedWords.length - 1]
    let xPts = findCrossPts(last.name, sorted[s])
    let randStart = Math.floor(Math.random() * xPts.length)
    //Loop through crosspoint options
    console.log(last, xPts.length + randStart);
    if (!(xPts.length + randStart)) plantedWords = [];
    for (let p=randStart; p<xPts.length + randStart;p++) {

      let xPt = xPts[p % xPts.length]
      if (cDir === 'v') {
        if (plantWord(sorted[s], last.y - xPt[1], last.x + xPt[0], cDir, true)) {
          plantWord(sorted[s], last.y - xPt[1], last.x + xPt[0], cDir)
          p = xPts.length
          break
        }
      } else {
        if (plantWord(sorted[s], last.y + xPt[0], last.x - xPt[1], cDir, true)){
           plantWord(sorted[s], last.y + xPt[0], last.x - xPt[1], cDir)
           p = xPts.length
           break
        }
      }
    }
  }

  //Get words that couldnt be placed
  const leftovers = sorted.filter(w => plantedWords.map(e => e.name).indexOf(w) < 0)
  //loop through words that werent placed and check if there is a spot for them anywhere
  //on the grid
  leftovers.forEach(word => {
    for (let pwi = 1; pwi < plantedWords.length; pwi++){
      /*pwi === Planted Words Iteration */
      let o = plantedWords[pwi]
      const xPts = findCrossPts(word, o.name)
      //loop through the crosspoint options
      for (let p = 0; p< xPts.length; p++) {
        let xPt = xPts[p]
        //try vertically
        if (o.dir === 'h' && plantWord(word, o.y - xPt[0], o.x + xPt[1], 'v', true)) {
          plantWord(word, o.y - xPt[0], o.x + xPt[1], 'v')
          //if this succeeds quit loop immediately
          return
        }

        //try horizintally
        if (o.dir === 'v'&& plantWord(word, o.y + xPt[1], o.x - xPt[0], 'h', true)) {
          plantWord(word, o.y + xPt[1], o.x - xPt[0], 'h')
          //if this succeeds quit loop immediately
          return
        }
      }
    }
  })
  return {
    plantedWords,
    mtrx,
    top: getTop(mtrx)
  }

}
