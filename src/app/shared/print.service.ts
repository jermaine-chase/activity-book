import { Injectable } from '@angular/core';
import Jspdf, {jsPDFOptions} from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  constructor() { }

  options: jsPDFOptions = {
    orientation: 'p',
    unit: 'mm',
    format: 'letter',
    putOnlyUsedFonts: true
  }

  pageHeight: number = 279
  pageWidth: number = 216
  maxWide = 180
  border = 20

  printByLine(header: string, body: string[], footer:string[], fileName: string) {
    let  doc = new Jspdf(this.options)
    doc = this.createHeader(doc, header)
    const headerDim = doc.getTextDimensions(header)

    doc.setFontSize(16);
    doc.text(body, this.border, this.border + headerDim.h + 2, {align: 'left', maxWidth: this.maxWide})
    doc.text(footer,this.border,this.pageHeight - this.border, {maxWidth: this.maxWide}, null)
    doc.save(fileName)
  }

  printTable(header: string, tableDimensions: any, tableHeader: any[] | undefined,
             body: any[], footer:string[], fileName: string) {
    let doc = new Jspdf(this.options)
    doc = this.createHeader(doc, header)
    const config = {
      printHeaders : tableDimensions.printHeaders
    }
    const headerDim = doc.getTextDimensions(header)

    doc.setFontSize(16);

    doc.table(this.border, this.border + headerDim.h + 2, body, this.createHeaders(tableHeader), config);

    doc.text(footer,this.border,this.pageHeight - this.border, {maxWidth: this.maxWide}, null)

    doc.save(fileName)
  }

  createHeader(doc: Jspdf, h: string) {
    doc.setFontSize(28)
    doc.text(h,  (this.maxWide + this.border) / 2, this.border, {align: 'center'}, null)
    return doc
  }

  createHeaders(keys: string[] | undefined): any[] {
    let result: any[] = []
    if (!keys) {
      return result
    }
    for (let k of keys) {
      result.push({
        id: k,
        name: k,
        prompt: k,
        width: keys.indexOf(k) % 2 == 0?this.pageWidth / 3: (2 * this.pageWidth / 3),
        align: keys.indexOf(k) % 2 == 0? 'left':'right',
        padding: 0
      });
    }
    return result;
  }

  testPrintByLine() {
    let body = []
    for (let i = 0; i < 10; i++) {
      body[i] = 'Line ' + i + ' randomly random stuff for sure'
    }
    this.printByLine('SHORT HEADER', body, ['Footer line 1','Footer Line 2'], 'test1.pdf')
  }
  testPrintTable() {
    let body = []
    for (let i = 0; i < 10; i++) {
      body[i] = 'Line ' + i + ' randomly random stuff for sure'
    }
    this.printTable('SHORT HEADER', [], body, ['Footer line 1','Footer Line 2'], 'test2.pdf')
  }
}
