import React, { useEffect } from "react";
import Main from "../../Layouts/Main";
import CatagoriesCard from "../../Components/CatagoriesCard";
import SidePanel from "../../Components/SidePanel";
import SubHeader from "../../Components/SubHeader";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  getProductsByCatagories,
  productSelector,
} from "../../Services/Slices/productSlice";
import { catagoiesSelector } from "../../Services/Slices/catagoriesSlice";
import _ from "lodash";
const Catagories = ({ toggle, handleToggle }) => {
  const [searchParams] = useSearchParams();
  const current = searchParams.get("cg");
  const dispatch = useDispatch();
  const { result } = useSelector(productSelector);
  const { catagoires } = useSelector(catagoiesSelector);
  useEffect(() => {
    let catItem = _.find(catagoires, { name: current });
    let res = _.isUndefined(catItem) ? -1 : catItem["id"];
    // dispatch(getProductsByCatagories(res));
  }, [dispatch]);

  return (
    <div>
      <Main toggle={toggle} handleToggle={handleToggle}>
        <section className="  text-gray-400  body-font overflow-hidden ">
          <div className="flex flex-row ">
            {/* <SidePanel /> */}
            <div className="container px-5 py-24 mx-auto">
              {/* {result !== null
								? result.map((item) => <h1>{item.name}</h1>)
								: "No Product"} */}
              <CatagoriesCard />
              <CatagoriesCard />
              <CatagoriesCard />
              <CatagoriesCard />
            </div>
          </div>
        </section>
      </Main>
    </div>
  );
};

export default Catagories;
