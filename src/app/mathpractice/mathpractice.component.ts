import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Problem } from './problem';

@Component({
  selector: 'mathpractice',
  templateUrl: './mathpractice.component.html',
  styleUrls: ['./mathpractice.component.css']
})
export class MathpracticeComponent implements OnInit {

  operator = Problem.ops
  hidden = false;

  digits = [
    {'val': 10, 'disp': '1'},
    {'val': 100, 'disp': '2'},
    {'val': 1000, 'disp': '3'}
  ]

  pages = [
    {'val': 1, 'disp': '1'},
    {'val': 2, 'disp': '2'},
    {'val': 3, 'disp': '3'},
    {'val': 4, 'disp': '4'},
    {'val': 5, 'disp': '5'},
    {'val': 6, 'disp': '6'},
    {'val': 7, 'disp': '7'}
  ]

  pp: any[]
  titleOut: string
  instructionsOut: string
  example: string
  bodyOut: any[]
  hasWordProblems:boolean

  constructor() { }

  ngOnInit() {
  }

  generateActivity(title: string, instructions: string, ops: string, max: number, pages: number, wordProblems: string) {
    if (max == 10 && pages > 3) {
      pages = 3
    }
    let problems;
    this.hasWordProblems = false
    this.pp = []
    let wordProbs = wordProblems.split(/[\r\n]+/)
    this.titleOut = title.toUpperCase()
    this.instructionsOut = instructions
   
    //generate example
    let example: any
    if (ops !== Problem.ops[0].val) {
      example = this.generateProblemSet(ops, max, true, true)
    }
    //generate problems
    for (let i = 0; i < pages; i++) {
      let wordProblemLengths = 0
      if (wordProbs.length <= 1) {
        wordProblemLengths = 0
      }
      else {
        wordProblemLengths = wordProbs.length >= 2?3:wordProbs.length
        this.hasWordProblems = true
      }
      let problemCount = 15
      if (wordProblemLengths > 1) {
        problemCount = 15 - wordProblemLengths
      }
      problems = []
      for (let idx = 0; idx < problemCount; idx++) {
        let p = this.generateProblemSet(ops, max, false, true)
        if (!this.includesMinor(problems, p) && !this.includesMajor(p)) {
          problems.push(p)
        }
        else {
          //do the loop again.
          idx--
        }
        
      }
      for (let idx = i * 2; (idx < (i+1)* 2 && idx < wordProblemLengths); idx++ ) {
        let p = new Problem(null, null, null);
        p.text = wordProbs[idx].split('?')[0]+'?'
        p.soln.textAnswer = wordProbs[idx].split('?')[1]
        problems.push(p)
      }
      this.pp.push(problems)
    }
    if (!this.hidden) {
          this.toggleInput()
          this.hidden = true;
    }
  }

  toggleInput() {
    if (!$('#inputDiv').hasClass('collapse')) {
      $('#inputDiv').addClass('collapse')
      $('#outputDiv').removeClass('col-8')
      $('#outputDiv').addClass('col')
      $('#showInput').removeClass('invisible')
      $('#hideInput').removeClass('visible')
      $('#showInput').addClass('visible')
      $('#hideInput').addClass('invisible')
      this.hidden = true;
    }
    else {
      $('#inputDiv').removeClass('collapse')
      $('#outputDiv').removeClass('col')
      $('#outputDiv').addClass('col-8')
      $('#showInput').removeClass('visible')
      $('#hideInput').removeClass('invisible')
      $('#showInput').addClass('invisible')
      $('#hideInput').addClass('visible')
      this.hidden = false;
    }
  }

  generateProblemSet(ops: string, max: number, example: boolean, addSoln: boolean) {
    let problem = new Problem(Math.floor(Math.random() * max), Math.floor(Math.random() * max), ops)
    problem.getAnswer()

    return problem
  }

  toggleAnswers() {
    $('.space').toggle()
    $('.soln').toggle()
  }

  includesMinor(problems: Problem[], p2: Problem) {
    let hasProblem = false
    for (let p1 of problems) {
      if (p1.equals(p2)) {
        hasProblem = true
        break
      }
    }
    return hasProblem
  }

  includesMajor(p2: Problem) {
    let hasProblem = false
    for (let problems of this.pp) {
      for (let p1 of problems) {
        if (p1.equals(p2)) {
          hasProblem = true
          break
        }
      }
    }
    return hasProblem
  }
}
