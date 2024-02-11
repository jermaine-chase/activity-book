import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Activity Book';
  views = [
         {label: 'Math Practice', id: '#mathPractice', show: false},
          {label: 'Blank Filler', id: '#blankFiller', show: false},
          {label: 'Decoder', id: '#decoder', show: false},
          {label: 'Word Scramble', id: '#wordScramble', show: false},
          {label: 'Word Search', id: '#wordSearch', show: false}

      ]

  toggleViews(divName: string) {
    for (const v of this.views) {
      if (v.id.includes(divName)) {
        v.show = !v.show
      } else {
        v.show = false
      }
    }
  }

  getDivStatus(divName: string) {
    for (const v of this.views) {
      if (v.id.includes(divName)) {
        return v.show
      }
    }
    return false;
  }

}
