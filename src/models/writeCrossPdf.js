import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;



export default function writePdf(wordBank, title, hintList) {
let fontSize = 0;
let margin = 0;
console.log(hintList)
function assignVars(){
  const l = wordBank.mtrx[0].length
  fontSize = (l < 35 && l > 28) ? l/4.5 : (l <= 28 && l > 19) ? l/2.7 : l/1.7;
  margin = (l <= 35 && l > 28) ? (220-((220*l)/34)) : (l <= 28 && l > 19) ? (250-((250*l)/34)) : 250-((250*l)/34);
}
assignVars();

function isWordStart(x, y) {
  const { plantedWords } = wordBank
  let i
  for (i=0;i<plantedWords.length;i++) {
    let p = plantedWords[i]
    if (p.x === x && p.y === y) return i
  }
  return "p"
}

function colorDetect(func){
  if (func === "p"){
    return false
  }
}

function buildTableBody(rows) {
    const body = [];

    rows.map((col, i) => {
        body.push([])
        col.map((el, j)=>{
              body[i].push({
              text: (el === 0) ? '' : isWordStart(j,i),
              fontSize: fontSize,
              fillColor: 'white',
              color:(colorDetect(isWordStart(j,i)) === false) ? 'white' : 'grey',
              border: (el === 0) ? [false, false, false, false] : [true, true, true, true],
            })
        });
    });

    return body;
}

function table(rows) {

    return {
        table: {
            headerRows: 1,
            body: buildTableBody(rows)
        },
        style: 'table'
    };
}

const grid = {
    content: [
        { text: title, style: 'header' },
        table(wordBank.mtrx),
        {text: '\n\nHints:', style: 'headers'},
        {
          ol: hintList
        },
    ],
    styles: {
        header: {
            fontSize: 20,
            bold: 'true',
            alignment: 'center',
            marginBottom: 20,
        },
        table: {
          margin: [margin, 0, 0, 0],
          alignment: 'center'
        }
    }

}

pdfMake.createPdf(grid).download(title);

}
