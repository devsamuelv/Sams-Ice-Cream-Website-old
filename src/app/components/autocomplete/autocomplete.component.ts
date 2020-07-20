import { Component, EventEmitter, forwardRef, Inject, OnInit, Output } from '@angular/core';
import { BaseWidget, NgAisInstantSearch } from 'angular-instantsearch';
import { connectAutocomplete } from 'instantsearch.js/es/connectors';
import * as algoliasearch from 'algoliasearch/lite';
import { IceCream } from 'src/app/models/Models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { environment } from 'src/environments/environment';

const searchClient = algoliasearch(
  environment.APP_ID,
  environment.APP_READ_KEY,
);

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent extends BaseWidget implements OnInit {

  private index: algoliasearch.Index;

  state: {
    query: string;
    refine: Function;
    indices: object[];
  };

  @Output() onQuerySuggestionClick = new EventEmitter<{ query: string }>();

  constructor(@Inject(forwardRef(() => NgAisInstantSearch)) public instantSearchParent, public fs: FirestoreService) {
    super('AutocompleteComponent');
    // this.index = searchClient.initIndex('ice cream flavors');
  }


  ngOnInit() {
    this.createWidget(connectAutocomplete, {});
    super.ngOnInit();

    console.log(this.state.indices)
  }

  public handleChange($event: KeyboardEvent) {
    this.state.refine(($event.target as HTMLInputElement).value);
  }

  config = {
    indexName: 'ice cream flavors',
    searchClient
  };

  public searchParameters = {
    query: ''
  };

}
