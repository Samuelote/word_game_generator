import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;



export default function writePdf(wordBank, title) {

let fontSize = 0;
let margin = 0;

function assignVars(){
  const l = wordBank[0].length
  fontSize = (l < 35 && l > 28) ? l/4.5 : (l <= 28 && l > 19) ? l/2.7 : l/1.7;
  margin = (l <= 35 && l > 28) ? (220-((220*l)/34)) : (l <= 28 && l > 19) ? (250-((250*l)/34)) : 250-((250*l)/34);
}
assignVars();

function buildTableBody(rows) {
    const body = [];

    rows.map((col, i) => {
        body.push([])
        col.map((el, j)=>{
            body[i].push({
              text: el.toUpperCase(),
              fontSize: fontSize,
              fillColor: 'white',
              border: [false, false, false, false],
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
        table(wordBank)
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
