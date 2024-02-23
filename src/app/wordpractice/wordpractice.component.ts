import { Component } from '@angular/core';
import {PrintService} from "../shared/print.service";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-wordpractice',
  standalone: true,
  imports: [
    NgClass,
    NgIf
  ],
  templateUrl: './wordpractice.component.html',
  styleUrl: './wordpractice.component.css'
})
export class WordpracticeComponent {

  constructor(private printService: PrintService) { }

  showInput = true
  showAnswers = true
  titleOut = ''
  bodyOut = ''
  footerOut = ''
  outputHeight = 1100
  padding = 250

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
        for (let i = 0; i < 3; i++) {
          response += this.makeDashes(word.substring(1), false) + '\n'
        }
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
}
