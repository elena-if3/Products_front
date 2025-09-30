import { Component } from '@angular/core';
import { PageTitle } from '../../shared/components/page-title/page-title';

@Component({
  selector: 'app-home',
  imports: [PageTitle],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
