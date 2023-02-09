import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cite-us-page',
  templateUrl: './cite-us-page.component.html',
  styleUrls: ['./cite-us-page.component.scss'],
})
export class CiteUsPageComponent {
  constructor(private readonly titleService: Title) {
    this.titleService.setTitle('Cite us | RNApdbee');
  }
}
