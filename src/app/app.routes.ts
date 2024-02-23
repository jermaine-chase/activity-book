import { Routes } from '@angular/router';
import {BlankfillerComponent} from "./blankfiller/blankfiller.component";
import {DecoderComponent} from "./decoder/decoder.component";
import {MathpracticeComponent} from "./mathpractice/mathpractice.component";
import {WordscrambleComponent} from "./wordscramble/wordscramble.component";
import {WordsearchComponent} from "./wordsearch/wordsearch.component";
import {WordpracticeComponent} from "./wordpractice/wordpractice.component";

export const routes: Routes = [
  {path: 'blank-fill', component: BlankfillerComponent},
  {path: 'decode', component: DecoderComponent},
  {path: 'math-practice', component: MathpracticeComponent},
  {path: 'word-scramble', component: WordscrambleComponent},
  {path: 'word-search', component: WordsearchComponent},
  {path: 'word-practice', component: WordpracticeComponent}
];
