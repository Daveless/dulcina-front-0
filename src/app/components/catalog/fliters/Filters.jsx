"use client";

import React, { useEffect, useState } from "react";
import FiltersItem from "./FiltersItem";
import ReactSlider from "react-slider";
import "./filters.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFilter,
  ChangeGenereInput,
  ChangeCategoryInput,
  ChangePriceInput,
  filterAll,
  clearByCategoryFilter,
} from "@/redux/features/filter-slice";
import { Searchbar } from "../../ui";
import { fetchCategories } from "@/redux/features/category-slice";
import { capitalize } from "@/assets";
import { TextSqueleton } from "../../ui/Squeletons";
import { DeleteButton } from "../../ui";

const Filters = () => {
  const dispatch = useDispatch();
  const filtered = useSelector((state) => state.filterReducer.value.filtered);
  const byPrice = useSelector((state) => state.filterReducer.value.byPrice);
  const allCategories = useSelector(
    (state) => state.categoryReducer.allCategories.categories
  );
  const products = useSelector(
    (state) => state.productsReducer?.allProducts?.products
  );
  const categoryInput = useSelector(
    (state) => state.filterReducer.value.byCategory.id
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const onChangeCategory = (e) => {
    dispatch(
      ChangeCategoryInput({
        id: e.target.value,
        name: allCategories.find((c) => c.id == e.target.value).name,
      })
    );
    dispatch(filterAll(products));
  };
  const onChangeGenere = (e) => {
    dispatch(ChangeGenereInput(e.target.value));
    dispatch(filterAll(products));
  };
  const onChangePrice = (e) => {
    dispatch(ChangePriceInput(e));
    dispatch(filterAll(products));
  };
  const deleteFilter = () => {
    dispatch(clearByCategoryFilter());
    dispatch(filterAll(products));
  };

  return (
    <>
      <div className="md:hidden">
        <Searchbar />
      </div>

      <div className="hidden md:flex justify-end">
        <div className="flex-col w-[200px] lg:w-[275px] hidden md:flex">
          {/* <h2 className="font-extrabold text-[#222222] text-[30px]">
            Festividad
          </h2>
          <div
            className="w-[100%]  mb-[10px]"
            style={{ borderBottom: "1.5px solid #CFCFCF" }}
          />
          {ArrayFestivities.map((c) => (
            <FiltersItem
              key={c.id}
              id={c.id}
              onChange={onChangeCategory}
              label={c.label}
              name={c.name}
            />
          ))} */}
          <div className="flex justify-between items-center">
            <h2 className="font-extrabold text-[#222222] text-[30px]">
              Categorias
            </h2>
            {categoryInput ? (
              <DeleteButton onClick={deleteFilter} content="Borrar" />
            ) : null}
          </div>
          <div
            className="w-[100%] mb-[10px] "
            style={{ borderBottom: "1.5px solid #CFCFCF" }}
          />

          {allCategories?.length
            ? allCategories?.map((c) => (
                <FiltersItem
                  key={c.id}
                  id={c.id}
                  onChange={onChangeCategory}
                  name="category"
                  value={c.id}
                  categoryInput={categoryInput}
                  nombre={c.name}
                  label={capitalize(c.name)}
                />
              ))
            : [1, 2].map((e) => <TextSqueleton key={e} />)}
          <div className="flex justify-between items-center">
            <h2 className="font-extrabold text-[#222222] text-[30px]">
              Precio
            </h2>
            <p>
              ${byPrice[0]} - ${byPrice[1]}
            </p>
          </div>
          <div
            className="w-[100%] mb-[40px] "
            style={{ borderBottom: "1.5px solid #CFCFCF" }}
          />

          <ReactSlider
            className="slider"
            onChange={onChangePrice}
            value={byPrice}
            min={3}
            max={50}
          />
        </div>
      </div>
    </>
  );
};

export default Filters;
