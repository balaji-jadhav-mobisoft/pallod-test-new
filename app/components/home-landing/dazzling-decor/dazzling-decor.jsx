import React from 'react';
import Carousal from '~/components/common/carousal/carousal';
import './dazzling-decor.css';
import WardrobeCarousal from '~/components/common/wardrobe-carousal/wardrobe-carousal';
import TrendingLooks from '../trending-looks/trending-looks';
import CustomerStories from '../customer-stories/customer-stories';

const DazzlingDecor = ({
  menu,
  primaryDomain,
  publicStoreDomain,
  collection,
  customerStoriesCollection,
}) => {
  // Ensure required props are provided
  if (
    !menu ||
    !menu.items ||
    !primaryDomain ||
    !publicStoreDomain ||
    !collection ||
    !customerStoriesCollection
  )
    return null;

  // Find the "Explore Our Collections" item in the menu
  const dazzlingDecorCollection = menu.items.find(
    (item) => item.title === 'Furnishing',
  );

  const dazzlingDecorItems = dazzlingDecorCollection.items.map((item) => {
    if (!item.url) return null;

    return {
      title: item.title.split(' ')[0],
      src: item.resource.image.url,
      alt: item.title,
      linkText: 'SHOP NOW',
    };
  });

  // Determine the URL path for the collection item
  const dazzlingDecorUrl =
    dazzlingDecorCollection.url.includes('myshopify.com') ||
    dazzlingDecorCollection.url.includes(publicStoreDomain) ||
    dazzlingDecorCollection.url.includes(primaryDomain)
      ? new URL(dazzlingDecorCollection.url).pathname
      : dazzlingDecorCollection.url;

  // Extract products from the collection
  const products = collection.collection.products.nodes || [];
  const customerStoriesCollectionProduct =
    customerStoriesCollection.collection.products.nodes || [];

  // Map products to bottomCollection with necessary properties
  const bottomCollection = products.map((product) => {
    if (!product) return null;

    return {
      src: product.images.nodes[0]?.url,
      hoverSrc: product.images.nodes[0]?.url,
      description: product.description,
    };
  });

  // Map products to bottomCollection with necessary properties
  const customerStoriesCollection1 = customerStoriesCollectionProduct.map(
    (product) => {
      if (!product) return null;

      return {
        src: product.images.nodes[0]?.url,
        hoverSrc: product.images.nodes[0]?.url,
        description: product.descriptionHtml,
      };
    },
  );
  return (
    <div className="dazzling-decor-container">
      <Carousal
        occasionItems={dazzlingDecorItems}
        itemsPerPage={3}
        url={dazzlingDecorUrl}
        title={dazzlingDecorCollection.title}
        leftIcon={true}
        rightIcon={true}
        dazzling={true}
      />
      <WardrobeCarousal
        wardrobeItems={bottomCollection}
        collection={collection}
        wishList={false}
        dazzling={true}
      />
      <TrendingLooks />
      {/* <CustomerStories
        wardrobeItems={customerStoriesCollection1}
        collection={customerStoriesCollection}
      /> */}
    </div>
  );
};

export default DazzlingDecor;
