import { Soln } from './soln'

export class Problem {
    text: string | undefined
    operand1:number
    operand2:number
    operator:string
    soln = new Soln()

  public static ops = [
      {'val': 'all', 'disp': 'all'},
//      {'val': 'add', 'disp': '+'},
      {'val': 'mul', 'disp': 'x'},
      {'val': 'div', 'disp': '÷'}
    ]

    constructor(op1:number, op2:number, oper:string) {
        this.operand1 = op1
        this.operand2 = op2
        this.operator = oper
    }

    getAnswer() {
        switch (this.operator) {
          case "all":
              let index = Math.ceil(Math.random() * (Problem.ops.length - 1))
              this.operator = Problem.ops[index].val
              this.getAnswer()
              break;
          case "mul":
            this.soln.answer = this.operand1 * this.operand2
            this.operator = 'x'
            break
          case "add":
            this.soln.answer = this.operand1 + this.operand2
            this.operator = '+'
            break
          case "div":
            //keep the divisor smaller than the dividend
            if (this.operand2 > this.operand1) {
              let temp = this.operand1
              this.operand1 = this.operand2
              this.operand2 = temp
            }
            this.soln.answer = Math.floor(this.operand1 / this.operand2)
            if (this.operand1 % this.operand2 != 0) {
              this.soln.remain = this.operand1 % this.operand2
              this.soln.showRemainder = true
            }
            this.operator = '÷'
            break
          default:
            console.log('Unknown Operator')
            break
        }
    }

    equals(p: Problem) {
      switch (this.operator) {
        case "÷":
          return this.operator == p.operator &&
          (this.operand1 == p.operand1 && this.operand2 == p.operand2)
        case "x":
          return this.operator == p.operator &&
          ((this.operand1 == p.operand1 && this.operand2 == p.operand2) ||
          (this.operand1 == p.operand2 && this.operand2 == p.operand1))
      }
      return false
    }
}
