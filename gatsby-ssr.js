import React from 'react';

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      rel="preload"
      href="/fonts/alba/ALBA____.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="interFont"
    />,
  ]);
};
