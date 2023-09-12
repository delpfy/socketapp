import {
  Box,
  Button,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Attribute, Category } from "../../redux/types";
import {
  clearCurrentImages,
  setProcess,
  setSecondProcess,
  setThirdProcess,
} from "../../redux/admin/adminSlice";
import { useEffect, useRef, useState } from "react";
import {
  createAttributes,
  createCategory,
  deleteCategory,
  getAllCategories,
  getAttributesByCategory,
  getCategoryById,
  updateCategory,
  uploadCategoryImage,
  uploadSubcategoryImage,
} from "../../redux/admin/asyncActions";

export default function ShowAttributes() {
  const { _attributes, _categories, second_process, third_process } =
    useAppSelector((state) => state.admin);

  const dispatch = useAppDispatch();

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedAttributes, setSelectedAttributes] = useState<Attribute>(
    {} as Attribute
  );

  const [newAttributeData, setNewAttributeData] = useState({
    category: "",
    attributes: [{name: '' , value: ''}],
  });

  useEffect(() => {
    
    if (selectedCategory) {
      dispatch(getAttributesByCategory({ category: selectedSubcategory === '' ? selectedCategory : selectedSubcategory }))
        .unwrap()
        .then((data: Attribute) => {
          setSelectedAttributes(data);
          console.log(data)
        });
    }
  }, [selectedCategory, selectedSubcategory]);

  const handleCategoryChange = (event: any) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setSelectedSubcategory('');
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

  const handleAddAttribute = () => {
    
    setNewAttributeData((prevData: any) => ({
      ...prevData,
      attributes: [
        ...prevData.attributes,
        { name: '', value: '' },
      ],
    }));
  };

  const handleCreateAttributes = () => {
   
    dispatch(createAttributes({ attributesData: {category: selectedSubcategory === '' ? selectedCategory : selectedSubcategory, attributes: newAttributeData.attributes} }))
      .unwrap()
      .then((result: any) => {
        if(result.meta.requestStatus === 'fulfilled'){
          dispatch(getAttributesByCategory({ category: selectedCategory }))
          .unwrap()
          .then((data: Attribute) => {
            setSelectedAttributes(data);
          });

          dispatch(getAttributesByCategory({ category: selectedCategory }))
        }
        
      });
  };

  return (
    <>
      <Select
        value={selectedCategory}
        onChange={handleCategoryChange}
        label="Категория"
      >
        {_categories.map((category) => (
          <MenuItem key={category._id} value={category.name}>
            {category.name}
          </MenuItem>
        ))}
      </Select>

      {selectedCategory && _categories.find((cat) => cat.name === selectedCategory)?.subcategories
        .length !== 0 ? (
        <Select
          value={selectedSubcategory}
          onChange={handleSubcategoryChange}
          label="Подкатегория"
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

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Атрибут</TableCell>
              <TableCell>Значение</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_attributes?.attributes?.map((attribute: any) => (
              <TableRow key={attribute._id}>
                <TableCell>{attribute.name}</TableCell>
                <TableCell>{attribute.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box>
        <Typography margin={3}>Добавить новый атрибут</Typography>
        <Box display={'flex'} flexDirection={'column'}>
        {newAttributeData.attributes.map((attr: {name: string, value: any}, index) => (
          <Box display={'flex'} flexDirection={'row'}>
            <TextField
              name="name"
              label="Имя атрибута"
              value={attr.name}
              onChange={(e: any) => handleAttributeChange(e, index)}
            />
            <TextField
              name="value"
              label="Значение атрибута"
              value={attr.value}
              onChange={(e: any) => handleAttributeChange(e, index)}
            />
          </Box>
        ))}
        </Box>
        <Button onClick={handleAddAttribute}>Добавить атрибут</Button>
        <Button onClick={handleCreateAttributes}>Создать атрибуты</Button>
      </Box>
    </>
  );
}
