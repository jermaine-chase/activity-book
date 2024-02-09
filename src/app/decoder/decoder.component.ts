import { Component, OnInit } from '@angular/core';
import $ from 'jquery';

@Component({
  selector: 'decoder',
  templateUrl: './decoder.component.html',
  styleUrls: ['./decoder.component.css']
})
export class DecoderComponent implements OnInit {

  titleOut = ''
  bodyOut: any[] | undefined
  footerOut = ''
  alphabet_EN = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  alphabet_SP = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'
  specialCharacters_SP = {Á: 'A', É: 'E', Í: 'I', Ó: 'O', Ú: 'U', Ü: 'U'}
  outputHeight = 1100;
  padding = 466;

  constructor() { }

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
        separator = '<br/>';
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
    // let out=''
    // out += this.createLine(coded, 0, coded.length)
    this.bodyOut = codedPhrase;
    this.footerOut = this.footer(lang);
    // $('#output').html(out)

    const headerHeight = $('#header').outerHeight();
    const bodyHeight = $('#body').outerHeight();
    const keyHeight = $('#key').outerHeight();
    // @ts-ignore
    const padSize = (this.outputHeight - (headerHeight + bodyHeight + keyHeight)) / 2;

    $('#key').css('padding-top', padSize);
    $('#body').css('padding-top', padSize);
    return;
  }
}
