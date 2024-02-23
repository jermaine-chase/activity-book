import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {JsonPipe, NgFor, NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, NgIf, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Activity Book';
  views = [
    {label: 'Blank Filler', id: '#blankFiller', name: 'blank-fill', show: false},
    {label: 'Decoder', id: '#decoder', name: 'decode', show: false},
    {label: 'Math Practice', id: '#mathPractice', name: 'math-practice', show: false},
    {label: 'Word Practice', id: '#wordPractice', name: 'word-practice', show: false},
    {label: 'Word Scramble', id: '#wordScramble', name: 'word-scramble', show: false},
    {label: 'Word Search', id: '#wordSearch', name: 'word-search', show: false}
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
}
