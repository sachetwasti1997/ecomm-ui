import React from "react";

const LoggedInRoutes = () => {
  return (
    <>
      <Route path="/" element={<HomePage />} />
      <Route path="/details/:id" element={<DetailsPage />} />
      <Route path="/buy/:id" element={<BuyPage />} />
    </>
  );
};

export default LoggedInRoutes;
