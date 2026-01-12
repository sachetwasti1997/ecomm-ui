import React from "react";

const LoggedOutRoutes = () => {
  return (
    <>
      <Route path="/" element={<SignUp />} />
      <Route path="/login" element={<LogIn />} />
    </>
  );
};

export default LoggedOutRoutes;
