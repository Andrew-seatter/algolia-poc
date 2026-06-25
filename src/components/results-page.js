import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';
import { EXPERIMENTAL_autocomplete } from 'instantsearch.js/es/widgets/autocomplete/autocomplete';
import configure from 'instantsearch.js/es/widgets/configure/configure';
import hits from 'instantsearch.js/es/widgets/hits/hits';
import pagination from 'instantsearch.js/es/widgets/pagination/pagination';
import refinementList from 'instantsearch.js/es/widgets/refinement-list/refinement-list';
import ratingMenu from 'instantsearch.js/es/widgets/rating-menu/rating-menu';
import toggleRefinement from 'instantsearch.js/es/widgets/toggle-refinement/toggle-refinement';

import resultHit from '../templates/result-hit';

/**
 * @class ResultsPage
 * @description Instant Search class to display content on main page
 */
class ResultPage {
  constructor() {
    this._registerClient();
    this._registerWidgets();
    this._startSearch();
  }

  /**
   * @private
   * Handles creating the search client and creating an instance of instant search
   * @return {void}
   */
  _registerClient() {
    this._searchClient = algoliasearch(
      process.env.ALGOLIA_APP_ID,
      process.env.ALGOLIA_API_KEY
    );

    this._searchInstance = instantsearch({
      indexName: process.env.ALGOLIA_INDEX,
      searchClient: this._searchClient,
      insights: true,
    });
  }

  /**
   * @private
   * Adds widgets to the Algolia instant search instance
   * @return {void}
   */
  _registerWidgets() {
    this._searchInstance.addWidgets([
      configure({
        clickAnalytics: true,
      }),
      EXPERIMENTAL_autocomplete({
        container: '#searchbox',
        placeholder: 'Search for products',
        indices: [
          {
            indexName: process.env.ALGOLIA_INDEX,
            getQuery: (item) => item.name,
            templates: {
              header: (_, { html }) => html`<div class="autocomplete__header">Products</div>`,
              item: ({ item, onSelect }, { html }) =>
                html`<a class="autocomplete__item" onClick=${onSelect} href="#">
                  <img class="autocomplete__item-image" src="${item.image}" alt="${item.name}" />
                  <div class="autocomplete__item-details">
                    <span class="autocomplete__item-name">${item.name}</span>
                    <span class="autocomplete__item-price">$${item.price}</span>
                  </div>
                </a>`,
            },
          },
        ],
      }),
      hits({
        container: '#hits',
        templates: {
          item: resultHit,
        },
      }),
      pagination({
        container: '#pagination',
      }),
      refinementList({
        container: '#brand-facet',
        attribute: 'brand',
        searchable: true
      }),
      refinementList({
        container: '#categories-facet',
        attribute: 'categories',
        searchable: true
      }),
      refinementList({
        container: '#price-range-facet',
        attribute: 'price_range',
      }),
      ratingMenu({
        container: '#rating-facet',
        attribute: 'rating',
      }),
      toggleRefinement({
        container: '#free-shipping-facet',
        attribute: 'free_shipping',
        templates: {
          labelText: 'Free Shipping',
        },
      }),
    ]);
  }

  /**
   * @private
   * Starts instant search after widgets are registered
   * @return {void}
   */
  _startSearch() {
    this._searchInstance.start();
  }
}

export default ResultPage;
