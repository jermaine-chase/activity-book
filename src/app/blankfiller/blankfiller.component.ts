import { Component, OnInit } from '@angular/core';
import {NgClass, NgFor, NgIf} from "@angular/common";
import {PrintService} from "../shared/print.service";

@Component({
  selector: 'blankfiller',
  templateUrl: './blankfiller.component.html',
  standalone: true,
  imports: [NgClass, NgFor, NgClass, NgIf],
  styleUrls: ['./blankfiller.component.css']
})
export class BlankfillerComponent implements OnInit {

  constructor(private printService: PrintService) { }

  showInput = true
  showAnswers = true
  titleOut = ''
  bodyOut = ''
  footerOut = ''

  ngOnInit() {
  }

  createPuzzle(title: string, wListIn: string) {
    let wList = this.getWordList(wListIn, false);
    if (wList.length > 0) {
      this.titleOut = title.toUpperCase()
      this.bodyOut = this.blankFiller(wList)

      let footer = '';

      for (let word of this.getHighlightedWords(wListIn, true)) {
        footer += word + ' '
      }
      this.footerOut = footer
    }
  }

  blankFiller(wordArr: string[]) {
    let response = ''
    for (let word of wordArr) {
      if (word.charAt(0) !== '*') {
        response += word
      }
      else {
        response += this.makeDashes(word.substring(1), false)
      }
      response += ' '
    }
    return response
  }

  makeDashes(word: string, includeSpace: boolean) {
    let k = '_'
    let returnVal = ''
    for (let idx = 0; idx < word.length; idx++) {
      returnVal += k
      let alpha = true
      if (word.charAt(idx).match(/[^A-Za-z0-9]/g)) {
        alpha = false
      }
      if (idx != word.length - 1) {
        if (includeSpace) {
          returnVal += '&nbsp;'
        }
        else {
          if (alpha) {
            returnVal += k
          }
          else {
            returnVal += word.charAt(idx)
          }
        }
      }
      else if (!alpha){
        returnVal += word.charAt(idx)
      }
    }
    return returnVal
  }

  getWordList(wordList: string, sort: boolean) {
    let wordArray = []
    for (let word of wordList.split(/\s+/)) {
      if (word.trim() !== '') {
        wordArray.push(word.trim())
      }
    }
    if (sort) {
      return wordArray.sort()
    }
    else {
      return wordArray
    }
  }

  getHighlightedWords(wordList: string, sort: boolean) {
    let wordArray = [];
    for (let word of wordList.toLowerCase().split(/\s+/)) {
      if (word.trim() !== '' && word.trim().charAt(0) === '*') {
        word = word.replace(/[\W_]+/g,"")
        wordArray.push(word.trim())
      }
    }
    if (sort) {
      return wordArray.sort()
    }
    else {
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
    const bodyIn = this.bodyOut.replaceAll('. ', '. |')
    this.printService.printByLine(this.titleOut, bodyIn.split('|'), [this.footerOut], 'blank-filler.pdf')
  }

  test() {
    this.printService.testPrintByLine()
    this.printService.testPrintTable()
  }
}
