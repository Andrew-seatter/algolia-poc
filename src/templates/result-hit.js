const resultHit = (hit, { html, sendEvent }) => html`
  <a class="result-hit">
    <div class="result-hit__image-container">
      <img class="result-hit__image" src="${hit.image}" />
    </div>
    <div class="result-hit__details">
      <h3
        class="result-hit__name"
        dangerouslySetInnerHTML=${{ __html: hit._highlightResult.name.value }}
      ></h3>
      <p class="result-hit__price">$${hit.price}</p>
    </div>
    <div class="result-hit__controls">
      <button
        class="result-hit__view"
        onClick=${(e) => {
          e.preventDefault();
          sendEvent('click', hit, 'Hit Viewed');
        }}
      >View</button>
      <button
        class="result-hit__cart"
        onClick=${(e) => {
          e.preventDefault();
          sendEvent('conversion', hit, 'Product Added to Cart');
        }}
      >Add To Cart</button>
    </div>
  </a>
`;

export default resultHit;
