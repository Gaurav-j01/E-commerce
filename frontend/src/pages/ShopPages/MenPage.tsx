import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ShopPage from "../ShopPage";
import MensPoster from "../../assets/mensposter.webp";
import LoadingSpinner from "../../components/LoadingSpinner";

const MenPage: React.FC = () => {
  const {
    isLoading,
    error,
    data: MenPageData,
  } = useQuery(["MenPage_Data"], () =>
    axios
      .get(`https://shoppy-ly6w.onrender.com/shop/Men/`, {})
      .then((response) => response.data)
  );

  if (isLoading) return <LoadingSpinner />;

  if (error) return "An error has occurred: " + error;

  return (
    <ShopPage
      productData={MenPageData}
      mainImage={MensPoster}
      pageName={"Mens"}
      imgHash="fHF~dPpyx]9ZPCcZ9|xGWCkWRkWB0h%2Ipwbr;xC-UT0WqxCs:kDn4Ipe:xYfkae"
    />
  );
};

export default MenPage;
