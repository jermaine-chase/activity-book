import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DecoderComponent } from './decoder/decoder.component';
import { WordscrambleComponent } from './wordscramble/wordscramble.component';
import { WordsearchComponent } from './wordsearch/wordsearch.component';
import { BlankfillerComponent } from './blankfiller/blankfiller.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MathpracticeComponent } from './mathpractice/mathpractice.component';

@NgModule({
  declarations: [
    AppComponent,
    DecoderComponent,
    WordscrambleComponent,
    WordsearchComponent,
    BlankfillerComponent,
    MathpracticeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
