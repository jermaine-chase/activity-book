import { Component, OnInit } from '@angular/core';
import {NgClass, NgFor, NgIf, NgOptimizedImage} from "@angular/common";
import {PrintService} from "../shared/print.service";

@Component({
  selector: 'wordscramble',
  templateUrl: './wordscramble.component.html',
  standalone: true,
  imports: [NgFor, NgClass, NgIf, NgOptimizedImage],
  styleUrls: ['./wordscramble.component.css']
})
export class WordscrambleComponent implements OnInit {

  showInput = true
  showAnswers = true
  titleOut = ''
  bodyOut: any[] = []
  footerOut = ''
  width = 0
  height = 0
  constructor(private printService: PrintService) { }

  ngOnInit() {
  }

  generateActivity(title: string, wordList: string, imageUrl: string, lang: string) {
    this.width = 0
    this.height = 0
    let wList = this.getWordList(wordList, false)
    if (wList.length > 0) {
      this.titleOut = title.toUpperCase()
      const opts = {lang}

      // default for divisible by 3
      // link to  mathematical formulae
      // https://docs.google.com/document/d/1izmXXCpvi8ZoYrUptmEVlONKMRhn6kQOYvN20ZC4vcM/edit?usp=sharing

      for (let idx = 0; idx < wList.length; idx++) {
        this.bodyOut.push({
          word: this.scrambleWord(wList[idx]),
          dash: this.makeDashes(wList[idx])
        })
      }
      // separated because I suspect that the sort is messing stuff up
      for (let w of wList.sort()) {
        this.footerOut += w.toUpperCase() + ' '
      }
    }
  }

  scrambleWord(word: string): string {
    let returnVal = ''
    const placed: number[] = [];
    // loop through word and scramble
    for (let idx = 0; idx < word.length; idx++) {
      let k = 0
      // get random number from 0 to word length
      do {
        k = Math.floor(Math.random() * word.length)
        // keep going until we find a letter that hasn't already been placed
      } while (placed.length > 0 && placed.includes(k))
      // append letter to scrambled word
      returnVal += word[k].toUpperCase()
      // add space after last letter
      if (idx !== word.length - 1) {
        returnVal += ' '
      }
      // add letter index for next check
      placed.push(k)
    }
    // check to make sure word isn't the same as the input word
    // if it does, recurse
    if (word.toUpperCase() === returnVal.toUpperCase()) {
      return this.scrambleWord(word)
    }
    return returnVal
  };

  makeDashes(word: string) {
    const k = '__'
    let returnVal = ''
    for (let idx = 0; idx < word.length; idx++) {
      returnVal += k
      if (idx != word.length - 1) {
        returnVal += ' '
      }
    }
    return returnVal
  };

  getWordList(wordList: string, sort: boolean) {
    const wordArray = []
    for (const word of wordList.split(',')) {
      if (word.trim() !== '') {
        wordArray.push(word.trim())
      }
    }
    if (sort) {
      return wordArray.sort()
    } else {
      return wordArray
    }
  }

  toggleInput() {
    this.showInput = !this.showInput
  }

  toggleAnswers() {
    this.showAnswers = !this.showAnswers
  }

  print() {
    this.printService.printTable(this.titleOut, ['word', 'dash'], this.bodyOut,  [this.footerOut], 'word-scramble.pdf')
  }
}
