import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { clearAttributes } from "../../redux/admin/adminSlice";
import { useEffect, useState } from "react";
import {
  createAttributes,
  getAttributesByCategory,
  updateAttributes,
} from "../../redux/admin/asyncActions";

export default function ShowAttributes() {
  const { _attributes, _categories } = useAppSelector((state) => state.admin);

  const dispatch = useAppDispatch();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [attributesChanged, setAttributesChanged] = useState(false);

  const [newAttributeData, setNewAttributeData] = useState(
    _attributes
      ? _attributes
      : {
          _id: "",
          category: "",
          attributes: [{ name: "", value: "" }],
        }
  );

  useEffect(() => {
    if (selectedCategory) {
      dispatch(
        getAttributesByCategory({
          category:
            selectedSubcategory === "" ? selectedCategory : selectedSubcategory,
        })
      )
        .unwrap()
        .then((data: any) => {
          setNewAttributeData({
            _id: data.items[0]?._id,
            category: data.items[0]?.category,
            attributes: data.items[0]?.attributes,
          });
          console.log(data.items[0]);
        });
    }
  }, [selectedCategory, selectedSubcategory]);

  const handleCategoryChange = (event: any) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setSelectedSubcategory("");
  };

  const handleSubcategoryChange = (event: any) => {
    const subcategory = event.target.value;
    setSelectedSubcategory(subcategory);
  };

  const handleAttributeChange = (event: any, index: number) => {
    const { name, value } = event.target;
    setNewAttributeData((prevData) => {
      const updatedAttributes = [...prevData.attributes];
      updatedAttributes[index] = { ...updatedAttributes[index], [name]: value };
      return { ...prevData, attributes: updatedAttributes };
    });
  };

  useEffect(() => {
    const attributesAreDifferent =
      JSON.stringify(newAttributeData) !== JSON.stringify(_attributes);

    if (attributesAreDifferent) {
      setAttributesChanged(true);
    } else {
      setAttributesChanged(false);
    }
  }, [newAttributeData]);

  useEffect(() => {
    return () => {
      setNewAttributeData({ _id: "", category: "", attributes: [] });
      dispatch(clearAttributes());
    };
  }, []);

  const handleAddAttribute = () => {
    console.log(_attributes);
    setNewAttributeData((prevData: any) => ({
      ...prevData,
      attributes:
        prevData?.attributes === undefined
          ? [{ name: "", value: "-" }]
          : [...prevData?.attributes, { name: "", value: "-" }],
    }));
  };

  const handleCreateAttributes = () => {
    if (_attributes.attributes.length === 0) {
      dispatch(
        createAttributes({
          attributesData: {
            category:
              selectedSubcategory === ""
                ? selectedCategory
                : selectedSubcategory,
            attributes: newAttributeData.attributes,
          },
        })
      )
        .unwrap()
        .then((result: any) => {
          if (result.meta.requestStatus === "fulfilled") {
            dispatch(getAttributesByCategory({ category: selectedCategory }))
              .unwrap()
              .then((data: any) => {
                setNewAttributeData({
                  _id: data.items[0]?._id,
                  category: data.items[0]?.category,
                  attributes: data.items[0]?.attributes,
                });
              });
          }
        });
    } else {
      dispatch(
        updateAttributes({
          attributesId: _attributes._id,
          attributesData: {
            category:
              selectedSubcategory === ""
                ? selectedCategory
                : selectedSubcategory,
            attributes: newAttributeData.attributes,
          },
        })
      )
        .unwrap()
        .then((result: any) => {
          if (result.meta.requestStatus === "fulfilled") {
            dispatch(getAttributesByCategory({ category: selectedCategory }))
              .unwrap()
              .then((data: any) => {
                setNewAttributeData({
                  _id: data.items[0]?._id,
                  category: data.items[0]?.category,
                  attributes: data.items[0]?.attributes,
                });
              });
          }
        });
    }
  };

  return (
    <>
      <Select
        value={selectedCategory}
        onChange={handleCategoryChange}
        label="Категорія"
      >
        {_categories.map((category) => (
          <MenuItem key={category._id} value={category.name}>
            {category.name}
          </MenuItem>
        ))}
      </Select>

      {selectedCategory &&
      _categories.find((cat) => cat.name === selectedCategory)?.subcategories
        .length !== 0 ? (
        <Select
          value={selectedSubcategory}
          onChange={handleSubcategoryChange}
          label="Підкатегория"
        >
          {_categories
            .find((cat) => cat.name === selectedCategory)
            ?.subcategories.map((subcategory: any) => (
              <MenuItem key={subcategory._id} value={subcategory.name}>
                {subcategory.name}
              </MenuItem>
            ))}
        </Select>
      ) : (
        <></>
      )}

      <Box>
        {_attributes.attributes !== undefined &&
        (_categories.find((cat) => cat.name === selectedCategory)?.subcategories
          .length === 0 ||
          (selectedCategory !== "" && selectedSubcategory !== "")) ? (
          <>
            <Typography margin={3}>
              Атрибути категорії{" "}
              {selectedSubcategory === ""
                ? selectedCategory
                : selectedSubcategory}{" "}
            </Typography>
            <Box display={"flex"} flexDirection={"column"}>
              {newAttributeData?.attributes?.map(
                (attr: { name: string; value: any }, index) => (
                  <Box display={"flex"} flexDirection={"row"}>
                    <TextField
                      name="name"
                      label="Назва"
                      value={attr.name}
                      onChange={(e: any) => handleAttributeChange(e, index)}
                    />
                    <Button
                      onClick={() => {
                        setNewAttributeData((prevData: any) => ({
                          ...prevData,
                          attributes: prevData?.attributes.filter(
                            (attrib: any) => attrib.name !== attr.name
                          ),
                        }));
                      }}
                    >
                      Прибрати
                    </Button>
                  </Box>
                )
              )}
            </Box>

            <Button onClick={handleAddAttribute}>Додати</Button>
          </>
        ) : (
          <></>
        )}

        {newAttributeData.attributes !== undefined &&
        newAttributeData.attributes.length !== 0 &&
        attributesChanged ? (
          <Button onClick={handleCreateAttributes}>Готово</Button>
        ) : (
          <></>
        )}
      </Box>
    </>
  );
}
