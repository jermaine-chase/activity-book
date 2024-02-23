import { Component, OnInit } from '@angular/core';
import {NgClass, NgFor, NgIf} from "@angular/common";
import {PrintService} from "../shared/print.service";

@Component({
  selector: 'decoder',
  standalone: true,
  imports: [NgClass, NgFor, NgClass, NgIf],
  templateUrl: './decoder.component.html',
  styleUrls: ['./decoder.component.css']
})
export class DecoderComponent implements OnInit {

  showInput = true
  showAnswers = true
  titleOut = ''
  bodyOut: any[] = []
  footerOut = ''
  alphabet_EN = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  alphabet_SP = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'
  specialCharacters_SP = {Á: 'A', É: 'E', Í: 'I', Ó: 'O', Ú: 'U', Ü: 'U'}
  outputHeight = 1100;
  padding = 466;

  constructor(private printService: PrintService) { }

  ngOnInit() {
  }

  footer(lang: string) {
    let out = '';
    let input;
    let length = 0;
    if (lang === 'SP') {
      input = this.alphabet_SP;
    } else {
      input = this.alphabet_EN;
    }
    for (let idx = 0; idx < input.length; idx++) {
      let separator = ' ';
      length += (idx + 1 + '').length + 3;
      if (length >= 40) {
        separator = '\n';
        length = 0;
      }
      out += (idx + 1) + '=' + input.charAt(idx) + separator;
    }
    return out;
  }

  createDecoder(title: string, words: string, langSel: string) {
    this.titleOut = title.toUpperCase();
    const aInt = 'A'.charCodeAt(0);
    const zInt = 'Z'.charCodeAt(0);
    const phrase = words;
    const lang = langSel;
    phrase.indexOf(' ');
    const codedPhrase = [];
    let codedWord = [];
    // create the hidden message
    for (let c = 0; c < phrase.length; c++) {
      const x = phrase.charAt(c);
      let charType = 'c'; // c = Character
      let isSpecialChar = false;
      let j = x.toUpperCase().charCodeAt(0);
      const originalChar = j;
      if (lang === 'SP' && this.specialCharacters_SP.hasOwnProperty(j)) {
        // @ts-ignore
        j = this.specialCharacters_SP[j];
        isSpecialChar = true;
      }
      let k = '';
      let val = (j - aInt + 1) + '';
      // if this is A - Z, display underscores, else display the special characters
      if (j < aInt || j > zInt) {
        k = x;
        if (j == 32) {
          codedPhrase.push(codedWord);
          codedWord = [];
          continue;
        } else {
          val = '';
          charType = 'p'; // p = Punctuation
        }
      }
      const decodedObj = {
        hold: k,
        num: val,
        type: charType
      };
      codedWord.push(decodedObj);
    }
    codedPhrase.push(codedWord);
    this.bodyOut = codedPhrase;
    this.footerOut = this.footer(lang);

    return;
  }

  toggleInput() {
    this.showInput = !this.showInput
  }

  toggleAnswers() {
    this.showAnswers = !this.showAnswers
  }

  print() {
    // generate lines for the printout
    let newBody = []
    const lineWidth = 40
    let chars = ''
    let nums = ''
    for (let line of this.bodyOut) {
      if (chars.length + line.length > lineWidth ) {
        newBody.push(chars)
        newBody.push(nums)
        chars = ''
        nums = ''
      }

      for (let c of line) {
        if (c.type === 'c') {
          chars += ' __'
          if (c.num < 10) {
            nums += '   ' + c.num
          } else {
            nums += ' ' + c.num
          }
        } else {
          if (c.hold !== '\n') {
            chars += c.hold
          } else {
            chars += '  '
          }
          nums += '  '
        }
      }
      chars += '  '
      nums += '  '
    }
    this.printService.printByLine(this.titleOut, newBody, [this.footerOut], 'decoder.pdf')
  }
}
