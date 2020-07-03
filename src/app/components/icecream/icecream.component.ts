import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-icecream',
  templateUrl: './icecream.component.html',
  styleUrls: ['./icecream.component.scss']
})
export class IcecreamComponent implements OnInit {

  constructor(public fs: FirestoreService) { }

  ngOnInit() {
  }



}
