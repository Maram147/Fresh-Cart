import React from 'react';
import offline from '../../assets/images/offline.jpg';
import { Helmet } from 'react-helmet';
import { LazyLoadImage } from 'react-lazy-load-image-component';
export default function OfflinePage() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content="Oops! you are currently offline" />
        <title>Offline</title>
      </Helmet>

      <div className="text-center my-10">
        <LazyLoadImage
          src={offline}
          alt="Offline"
          className="mx-auto rounded-xl w-80 sm:w-96 md:w-[450px] max-w-full"
        />
        <h3 className="font-bold text-center my-3 text-xl sm:text-2xl">You are offline!</h3>
        <p className="font-semibold text-muted-foreground text-lg mb-3 text-center">
          Please check your internet connection
        </p>
      </div>
    </>
  );
}
