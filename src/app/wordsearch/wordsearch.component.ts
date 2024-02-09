import { Component, OnInit } from '@angular/core';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import $ from 'jquery';

@Component({
  selector: 'wordsearch',
  templateUrl: './wordsearch.component.html',
  styleUrls: ['./wordsearch.component.css']
})
export class WordsearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  LETTERS = 'abcdefghijklmnopqrstuvwxyz'; // letters used for filler
  MAX_ATTEMPTS = 20; // maximum amount of times to place a word
  width: number = 0;
  height = 0;
  search: any;
  child: any;
  titleOut: string | undefined
  bodyOut: any
  footerOut: string | undefined

  doWork() {
    this.width = 0;
    this.height = 0;
    let wList = this.getWordList();
    // @ts-ignore
    let outputWidth = $('#output').width() - 50;
    if (wList.length > 0) {
      let out = "";
      this.measurements();
      let lang = $('#languageSelector').val();
      let opts: any = {"lang": lang};
      if (lang === "SP") {
        opts.letters = "abcdefghijklmnñopqrstuvwxyz";
      }
      do {
        this.search = this.wordsearch(wList, this.width, this.height, opts);
      } while (this.search.unplaced.length > 0);
      // @ts-ignore
      out += '<div class="padPage'+$('#pagePadSelector').val()+'" id="outputDiv"><div id ="header"><h1 class="outTitle">'+$('#title').val().toUpperCase()+'</h1></div>';
      out += '<div id ="body"><table id="wordSearchOutput">';
      for (let i = 0; i < this.width; i++) {
        out += '<tr>';
        for (let c = 0; c < this.height; c++) {
          out += '<td>' + this.search.grid[i][c].toUpperCase() + '</td>'
        }
        out += '</tr>';
      }
      out += '</table></div><div id="key"><table id="wordListTable">';
      const localSearch = this.search
      let placedWords = wList.filter(function(element) {
        return localSearch.unplaced.indexOf(element) === -1;
      });
      //default for divisible by 3
      //link to  mathematical formulae
      //https://docs.google.com/document/d/1izmXXCpvi8ZoYrUptmEVlONKMRhn6kQOYvN20ZC4vcM/edit?usp=sharing

      let nOver3 = Math.floor(placedWords.length / 3);
      let sentinel = nOver3;
      let remainder = placedWords.length % 3;
      let offSet = 0;
      let displayed: any[] = [];
      if (remainder == 1) {
        sentinel = nOver3 + 1;
      }
      else if (remainder == 2) {
        sentinel = nOver3 + 1;
      }

      for (let idx = 0; idx < sentinel; idx++) {
        out += '<tr>';
        if (placedWords[idx] && !displayed.includes(idx)) {
          out += '<td class="myWidth">'+placedWords[idx].toUpperCase()+'</td>';
          displayed.push(idx);
        }

        if (remainder == 1) {
          offSet = 1;
        }
        else if (remainder == 2) {
          offSet = 1;
        }
        if (placedWords[nOver3 + offSet + idx] && !displayed.includes(nOver3 + offSet + idx)) {
          out += '<td class="myWidth">'+placedWords[nOver3 + offSet + idx].toUpperCase()+'</td>';
          displayed.push(nOver3 + offSet + idx);
        }
        if (remainder == 1) {
          offSet = 1;
        }
        else if (remainder == 2) {
          offSet = 2;
        }
        if (placedWords[2 * nOver3 + offSet + idx] && !displayed.includes(2 * nOver3 + offSet + idx)) {
          out += '<td class="myWidth">'+placedWords[2 * nOver3 + offSet + idx].toUpperCase()+'</td>';
          displayed.push(2 * nOver3 + offSet + idx);
        }
        out += '</tr>';
      }
      out+= '</table></div></div>';
      //child = window.open("wordOut.html", "mywin", '');
      //OpenWindow.dataFromParent = out; // dataFromParent is a letiable in child.html
      //OpenWindow.init();
      //child.document.getElementById("output").innerHTML = out;
      $('#output').html(out);

      let bodyWidth = $('#body').outerWidth();
      let wordSearcWidth = $('#wordSearchOutput').outerWidth();
      // @ts-ignore
      let widthPad = (bodyWidth - wordSearcWidth) / 2;

      let headerHeight = $('#header').outerHeight();
      let bodyHeight = $('#body').outerHeight();
      let keyHeight = $('#key').outerHeight();
      let outputHeight = 902;
      // @ts-ignore
      let padSize = (outputHeight - (headerHeight + bodyHeight + keyHeight)) / 2;

      $('#key').css('padding-top', padSize);
      $('#body').css('padding-top', padSize);
      $('#wordSearchOutput').css('padding-left', widthPad);

      $('#unplaced').html('These words were not placed: '+this.search.unplaced);
      return;
    }
  }

  getWordList() {
    let wordList = $('#wordListIn').val()?.toString().toLowerCase();
    let wordArray = [];
    // @ts-ignore
    for (let word of wordList.split(',')) {
      if (word.trim() !== '') {
        wordArray.push(word.trim());
      }
    }

    return wordArray.sort();
  }

  measurements() {
    let enteredWidth = parseInt(<string>$('#puzzleWidth').val(), 10)
    let enteredHeight = parseInt(<string>$('#puzzleHeight').val(), 10)
    let changed = false;

    let wordArray = this.getWordList();

    for (let i = 0; i < wordArray.length; i++) {
      if (wordArray[i].length > this.width) {
        this.width = wordArray[i].length;
      }
      if (wordArray[i].length > this.height) {
        this.height = wordArray[i].length;
      }
    }

    // @ts-ignore
    if (this.width < enteredWidth) {
      this.width = enteredWidth;
    }
    if (this.width > 25) {
      this.width = 15;
    }
    if (this.height < enteredHeight) {
      this.height = enteredHeight;
    }
    if (this.height > 25) {
      this.height = 15;
    }
  }

  print() {
    const filename  = 'WordSearch.pdf';

    html2canvas($('#output')[0], {scale: 0.85}).then(canvas => {
      let pdf = new jspdf('p', 'px', 'letter');
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 450, 590);
      pdf.save(filename);
    });
  }

  /*$('#output').click(function() {
    //highlight stuff in output div for printing
    //won't work in IE
    let range = document.createRange();
    range.selectNode(document.getElementById('output'));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);

    //invoke print command

  });*/
  /**
   * wordsearch
   *
   * generate a wordsearch puzzle
   */
  wordsearch(words: string[], width: number, height: number, opts: any): boolean | any {
    let i;
    if (!words || !words.length)
      return false;
    width = +width || 20;
    height = +height || 20;
    opts = opts || {};
    opts.backwards = opts.hasOwnProperty('backwards') ? opts.backwards : 0.5;
    opts.letters = opts.letters || this.LETTERS;

    // filter out any non-words
    if (opts && opts.hasOwnProperty('lang') && opts.lang === "SP") {
      words = words.filter(function (a) {
        return /^[a-zñáéíóúü]+$/i.test(a);
      });
    }
    //english by default
    else {
      words = words.filter(function (a) {
        return /^[a-z]+$/.test(a);
      });
    }

    // sort the words by length (biggest first)
    words.sort(function (a, b) {
      return a.length < b.length ? -1 : 1;
    });

    // populate the grid with empty arrays
    const grid = new Array(height);
    for (i = 0; i < grid.length; i++)
      grid[i] = new Array(width);

    let unplaced = [];

    // loop the words
    let colorno = 0;
    for (i = 0; i < words.length; i++) {
      const originalword = words[i];
      let word = words[i];

      // reverse the word if needed
      if (Math.random() < opts.backwards)
        word = word.split('').reverse().join('');

      // pick a random spot
      // try to place the word in the grid
      let attempts = 0;
      while (attempts < this.MAX_ATTEMPTS) {
        // determine the direction (up-right, right, down-right, down)
        let direction = Math.floor(Math.random() * 4);
        let info = this.directioninfo(word, direction, width, height);

        // word is too long, bail out
        if (info.maxx < 0 || info.maxy < 0 || info.maxy < info.miny || info.maxx < info.minx) {
          unplaced.push(originalword);
          break;
        }

        // random starting point
        const ox = Math.round(Math.random() * (info.maxx - info.minx) + info.minx)
        const oy = Math.round(Math.random() * (info.maxy - info.miny) + info.miny)
        let x = ox
        let y = oy;

        // check to make sure there are no collisions
        let placeable = true;
        let count = 0;
        for (let l = 0; l < word.length; l++) {
          let charingrid = grid[y][x];

          if (charingrid) { // check if there is a character in the grid
            if (charingrid !== word.charAt(l)) {
              // not the same latter, try again
              placeable = false; // :(
              break;
            } else {
              // same letter! count it
              count++;
            }
          }
          // keep trying!
          y += info.dy;
          x += info.dx;
        }
        if (!placeable || count >= word.length) {
          attempts++;
          continue;
        }

        // the word was placeable if we make it here!
        // reset x and y and place it
        x = ox;
        y = oy;
        for (let l = 0; l < word.length; l++) {
          grid[y][x] = word.charAt(l);
          if (opts.color)
            grid[y][x] = '\x1b[' + (colorno + 41) + 'm' + grid[y][x] + '\x1b[0m';

          y += info.dy;
          x += info.dx;
        }
        break;
      } // end placement while loop

      if (attempts >= 20)
        unplaced.push(originalword);
      colorno = (colorno + 1) % 6;
    } // end word loop

    // the solved grid... XXX I hate this
    let solved = JSON.parse(JSON.stringify(grid));

    // put in filler characters
    for (i = 0; i < grid.length; i++)
      for (let j = 0; j < grid[i].length; j++)
        if (!grid[i][j]) {
          solved[i][j] = ' ';
          grid[i][j] = opts.letters.charAt(
            Math.floor(Math.random() * opts.letters.length));
        }

    // give the user some stuff
    return {
      grid: grid,
      solved: solved,
      unplaced: unplaced
    };
  }

  /**
   * given an integer that represents a direction,
   * return an object with boundary information
   * and velocity
   */
  directioninfo(word: string, direction: number, width: number, height: number): any {
    // determine the bounds
    let minx = 0,
      miny = 0;
    let maxx = width - 1;
    let maxy = height - 1;
    let dx = 0,
      dy = 0;
    switch (direction) {
      case 0: // up-right
        maxy = height - 1;
        miny = word.length - 1;
        dy = -1;
        maxx = width - word.length;
        minx = 0;
        dx = 1;
        break;
      case 1: // right
        maxx = width - word.length;
        minx = 0;
        dx = 1;
        break;
      case 2: // down-right
        miny = 0;
        maxy = height - word.length;
        dy = 1;
        maxx = width - word.length;
        minx = 0;
        dx = 1;
        break;
      case 3: // down
        miny = 0;
        maxy = height - word.length;
        dy = 1;
        break;
      default: /* NOTREACHED */
        break;
    }
    return {
      maxx: maxx,
      maxy: maxy,
      minx: minx,
      miny: miny,
      dx: dx,
      dy: dy
    }
  }

}
