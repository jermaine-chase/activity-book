import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Activity Book';
  views = [
         {label: 'Math Practice', id: '#mathPractice'},
          {label: 'Blank Filler', id: '#blankFiller'},
          {label: 'Decoder', id: '#decoder'},
          {label: 'Word Scramble', id: '#wordScramble'},
          {label: 'Word Search', id: '#wordSearch'}

      ];

  toggleViews(event: any) {
    let toShow = event.target.hash.substring(1)
    console.log(toShow)
    let divs = ['blankFiller', 'decoder', 'wordScramble', 'wordSearch', 'mathPractice']
    divs.splice(divs.indexOf(toShow), 1)
    $('#'+toShow).removeClass('myHide')
    $('#'+toShow).addClass('myShow')

    divs.forEach(element=> {
      $('#'+element).addClass('myHide')
      $('#'+element).removeClass('myShow')
    });
  }

}
