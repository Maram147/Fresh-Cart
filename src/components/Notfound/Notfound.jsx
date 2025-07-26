import React from 'react';
import notfound from '../../assets/images/not fount fresh cart.svg';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Helmet } from 'react-helmet';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>404 - Page Not Found</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="text-center my-10">
        <LazyLoadImage
          src={notfound}
          alt="Page not found"
          className="mx-auto rounded-xl w-80 sm:w-96 md:w-[450px] max-w-full"
        />
        <h3 className="font-bold text-center my-3 text-xl sm:text-2xl text-black">
          Oops! Page Not Found
        </h3>
        <p className="font-semibold text-muted-foreground text-lg mb-3 text-center text-black">
          Please check the URL or go back to the homepage.
        </p>
      </div>
    </>
  );
}
