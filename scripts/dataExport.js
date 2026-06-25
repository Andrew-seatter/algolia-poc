import products from '../data/products.json' with { type: 'json' };
import 'dotenv/config.js'
import { algoliasearch } from 'algoliasearch';

async function main () {
    const rawProducts = products;
    const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_KEY);

    //console.log(process.env.ALGOLIA_APP_ID,  process.env.ALGOLIA_ADMIN_KEY);

    const transformProductPrice = products.map((item) => {
        const isCamera = item.categories?.some(
            (c) => c === 'Cameras & Camcorders'
        );

  return isCamera
    ? { ...item, price: Math.floor(item.price - item.price * 0.2) }
    : { ...item };
});



    //console.log(transformProductPrice.length)

   const response = await client.saveObjects({
        indexName: process.env.ALGOLIA_INDEX_NAME,
        objects: transformProductPrice,
    });

    console.log(response);

    // for (let x = 0; x < transformProductPrice?.length; x++){
    //     console.log( "og price ->",rawProducts[x].price, "new price ->", transformProductPrice[x].price)
    // }

}

main();