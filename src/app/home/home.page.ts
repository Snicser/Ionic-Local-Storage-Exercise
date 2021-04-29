import {Component} from '@angular/core';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  articleName = '';
  articlePrice;

  articles = [
    {'name': 'After Shave', price: 11},
    {'name': 'Scheer mesjes', price: 6},
    {'name': 'Pleisters', price: 3},
  ];

  constructor(private storage: Storage) {
  }

  async ngOnInit() {
    await this.storage.create();

    if (await this.storage.get('articles')) {
      await this.getArticlesList();
    }
  }

  async setItem() {
    this.articlePrice = parseFloat(this.articlePrice);
    if ((typeof (this.articleName) === "string" && this.articleName.length > 0) && (typeof (this.articlePrice) === "number" && this.articleName.length != 0))  {
      this.addToList();
    }

    alert('Je hebt niks ingevuld!');
  }

  // Adds the typed input to the JSON Array
  addToList() {
    this.articles.push({'name': this.articleName, price: this.articlePrice});

    this.saveArticlesList().then(() => {
      document.querySelector('#product-alert-inserted').innerHTML = `Er is een nieuw item toegevoegt!`;
    }).catch(exception => {
      document.querySelector('#product-alert-inserted').innerHTML = `Er ging iets mis: ${exception.message}`;
    });

    // Clear the input fields after 1 second
    setTimeout(() => {
      this.clearInput();
    }, 1000);
  }

  /**
   * Save the JSON Array to the local ionic storage
   */
  async saveArticlesList() {
    await this.storage.set('articles', this.articles);
  }

  clearInput() {
    document.querySelector('#product-alert-inserted').innerHTML = 'De velden zijn geleegdt';
    this.articleName = '';
  }

  async getArticlesList() {
    // Get the value that is binded to name
    this.articles = await this.storage.get('articles');
  }
}
