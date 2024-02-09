import { Component, OnInit } from '@angular/core';
import $ from 'jquery';

@Component({
  selector: 'wordscramble',
  templateUrl: './wordscramble.component.html',
  styleUrls: ['./wordscramble.component.css']
})
export class WordscrambleComponent implements OnInit {

  titleOut = '';
  bodyOut: any = {};
  footerOut = '';
  width = 0;
  height = 0;
  constructor() { }

  ngOnInit() {
  }

  doWork() {
    this.width = 0;
    this.height = 0;
    let wList = this.getWordList(true);
    const imageUrlExists = $('#imageUrl').val() !== '';
    if (wList.length > 0) {
      // @ts-ignore
      let out = '<div id ="header"><h1 class="outTitle">' + $('#title').val().toUpperCase() + '</h1></div>';
      const lang = $('#languageSelector').val();
      const opts = {lang};

      out += '<div id = "body" class="container">';
      for (let idx = 0; idx < wList.length; idx++) {
        out += '<div class="row">';
        out += '<div class="col-6 outBody text-left">' + this.scrambleWord(wList[idx]) +
          '</div><div class="col-6 outBody text-left">' + this.makeDashes(wList[idx]) + '</div>';
        out += '</div>';
      }
      if (imageUrlExists) {
        out += '</div><div id = "key" class="container"><div class="row"><div class="col-6">Word List</div>' +
          '<div class="col-6"></div></div><div class="row">';
      } else {
        out += '</div><div id = "key" class="container"><div class="row"><div class="col-12"></div></div><div class="row">';
      }
      // default for divisible by 3
      // link to  mathematical formulae
      // https://docs.google.com/document/d/1izmXXCpvi8ZoYrUptmEVlONKMRhn6kQOYvN20ZC4vcM/edit?usp=sharing

      wList = this.getWordList(false);

      if (imageUrlExists) {
        out += '<div class="col-2 valignBottom rotate">';
      } else {
        out += '<div class="col-12 valignBottom rotate text-left">';
      }

      for (let idx = 0; idx < wList.length; idx++) {
        out += wList[idx].toUpperCase() + ' ';
      }
      out += '</div>';
      if (imageUrlExists) {
        out += '<div class="col-6"><img src="' + $('#imageUrl').val() + '"/><div></div></div></div></div>';
      } else {
        out += '</div></div></div></div>';
      }
      $('#output').html(out);

      const headerHeight = $('#header').outerHeight();
      const bodyHeight = $('#body').outerHeight();
      const keyHeight = $('#key').outerHeight();
      const outputHeight = 1200;
      // @ts-ignore
      const padSize = (outputHeight - (headerHeight + bodyHeight + keyHeight)) / 2;

      $('#key').css('padding-top', padSize);
      $('#body').css('padding-top', padSize);

      return;
    }
  }

  scrambleWord(word: string): string {
    let returnVal = '';
    const placed: number[] = [];
    // loop through word and scramble
    for (let idx = 0; idx < word.length; idx++) {
      let k = 0;
      // get random number from 0 to word length
      do {
        k = Math.floor(Math.random() * word.length);
        // keep going until we find a letter that hasn't already been placed
      } while (placed.length > 0 && placed.includes(k));
      // append letter to scrambled word
      returnVal += word[k].toUpperCase();
      // add space after last letter
      if (idx !== word.length - 1) {
        returnVal += '&nbsp;';
      }
      // add letter index for next check
      placed.push(k);
    }
    // check to make sure word isn't the same as the input word
    // if it does, recurse
    if (word.toUpperCase() === returnVal.toUpperCase()) {
      return this.scrambleWord(word);
    }
    return returnVal;
  };

  makeDashes(word: string) {
    const k = '__';
    let returnVal = '';
    for (let idx = 0; idx < word.length; idx++) {
      returnVal += k;
      if (idx != word.length - 1) {
        returnVal += '&nbsp;';
      }
    }
    return returnVal;
  };

  getWordList(sort: boolean) {
    // @ts-ignore
    const wordList = $('#wordListIn').val().toLowerCase();
    const wordArray = [];
    for (const word of wordList.split(',')) {
      if (word.trim() !== '') {
        wordArray.push(word.trim());
      }
    }
    if (sort) {
      return wordArray.sort();
    } else {
      return wordArray;
    }
  };
}
