"use client";
import React, { useCallback, useEffect, useState } from "react";
import FileInput from "./FileInput";
import SelectInput from "./SelectInput";
import { FormInput } from ".";
import { postProduct } from "@/redux/features/product-slice";
import { useDispatch, useSelector } from "react-redux";

import { fetchCategories } from "@/redux/features/category-slice";
import { useRouter } from "next/navigation";

const FormContainer = () => {
  const token = useSelector((state) => state.userReducer.token);
  const role = useSelector((state) => state.userReducer.role);
  const allCategories = useSelector(
    (state) => state.categoryReducer.allCategories.categories
  );
  const dispatch = useDispatch();
  const router = useRouter();

  const [image, setImage] = useState("");
  const [input, setInput] = useState({
    name: "",
    price: "",
    description: "",
    highlight_date: "",
    categoryId: 1,
    token,
  });
  const onChange = (e, inputName) => {
    setInput({
      ...input,
      [inputName]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    let body = {
      ...input,
      image,
    };
    console.log(body);
    dispatch(postProduct(body));
  };

  const redirect = useCallback(async () => {
    try {
      console.log(role ? "el rol es" + role : "no existe rol");
      // you could call also call `router.replace`
      if (role !== "admin") {
        console.log("admin no existe - verificación - se redirige");
        return;
      }

      console.log("admin correcto, no pasa nada");
      // handle any response errors here
    } catch (error) {
      console.log(error);
    }
  }, [role]);

  useEffect(() => {
    // you could also define the function here without `useCallback`,
    // this is only done when the function only needs to be called
    // inside the effect.
    redirect();
    dispatch(fetchCategories());
  }, []);

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="grid grid-cols-2 pl-[110px] pr-[110px] gap-10"
      >
        <div>
          <FormInput
            onChange={onChange}
            input={input}
            inputName={"name"}
            type={"text"}
            placeholder={"Arreglo 1"}
            label={"Nombre"}
          />
          <FormInput
            onChange={onChange}
            input={input}
            inputName={"price"}
            type={"number"}
            placeholder={"$80"}
            label={"Precio"}
          />
          <FileInput setImage={setImage} />
        </div>
        <div>
          <FormInput
            onChange={onChange}
            input={input}
            inputName={"highlight_date"}
            className={"h-[150px] "}
            type={"text"}
            placeholder={"12:12:2020"}
            label={"Fecha"}
          />
          <SelectInput
            onChange={onChange}
            selected={input.categoryId}
            options={allCategories}
            inputName="categoryId"
            firstOption={"Seleccionar"}
            label={"Categoría"}
          />
          <FormInput
            onChange={onChange}
            input={input}
            inputName={"description"}
            className={"h-[150px] "}
            size={"paragraph"}
            type={"text"}
            placeholder={"Lorem ipsum dolor sit amet"}
            label={"Descripción"}
          />
        </div>
        <button
          type="submit"
          className="bg-[#E60023] font-bold text-[#ffffff] w-[100%] h-[55px] rounded-xl"
        >
          Crear producto
        </button>
      </form>
    </>
  );
};

export default FormContainer;
