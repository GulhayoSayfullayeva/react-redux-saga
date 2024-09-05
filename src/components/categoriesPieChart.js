import { useSelector } from "react-redux";
import { Pie } from "@ant-design/charts";
import { useState, useEffect } from "react";



export const CategoriesPieChart = () => {
    const [categories, setCategories] = useState([]);

    const allCategories = useSelector((state) => state.incidents.categories);
    const incidents = useSelector((state) => state.incidents.list);


    useEffect(() => {  
      setCategories(getData());
    }, [`${allCategories}`]);
  
    const getData = () => {
      const type = '其他';
      const data = allCategories.map((category) => {
        const value = incidents.filter((incident) => incident.category === category).length;
        return { type, category, value };
      });
      
      return data;
    };

    const config = {
        data: categories,
        angleField: 'value',
        colorField: 'type',
        label: {
          text: 'category',
          style: {
            fontWeight: 'bold',
          },
        },
        legend: {
          color: {
            title: false,
            position: 'right',
            rowPadding: 5,
          },
        },
      };
      return <Pie {...config} />;
  };