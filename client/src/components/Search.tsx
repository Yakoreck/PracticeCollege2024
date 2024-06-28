import React, { useState, useEffect, useCallback } from "react";
import { AutoComplete, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ProductResponse, getAllProducts } from "../api/product";
import { Product } from "./ProductCard/ProductCard";

const Search: React.FC = () => {
  const { data: products } = useQuery({
    queryKey: ["all products"],
    queryFn: getAllProducts,
  });

  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState<
    ProductResponse[] | undefined
  >([]);

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (query && products) {
        const filtered = products.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts([]);
      }
    }, 300),
    [products]
  );

  useEffect(() => {
    debouncedSearch(searchText);
  }, [searchText, debouncedSearch]);

  return (
    <AutoComplete
      placeholder={"Пошук"}
      style={{ width: 400 }}
      options={filteredProducts?.map((product) => ({
        value: product.id,
        label: product.name,
      }))}
      onSelect={(value) => navigate(`/product/${value}`)}
      onSearch={(label) => setSearchText(label)}
    >
      <Input placeholder="Пошук" suffix={<SearchOutlined />} />
    </AutoComplete>
  );
};

export default Search;