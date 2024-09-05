import { useSelector } from "react-redux";
import { Pie } from "@ant-design/charts";
import { useState, useEffect } from "react";



export const UsersPieChart = () => {
    
    const [users, setUsers] = useState([]);
    const allUsers = useSelector((state) => state.incidents.users);
    const incidents = useSelector((state) => state.incidents.list);

    useEffect(() => {
        setUsers(getData());
      }, [`${users}`]);
    
      const getData = () => {
        const type = '分类一';
        const data = allUsers.map((user) => {
          const value = incidents.filter((incident) => incident.user === user).length;
          return { type, user, value };
          
        });
        
        return data;
      };
    const config = {
        data: users,
        angleField: 'value',
        colorField: 'type',
        label: {
          text: 'value',
          style: {
            fontWeight: 'bold',
          },
        },
        legend: {
          color: {
            title: false,
            position: 'right',
            rowPadding: 15,
          },
        },
      };
      return <Pie {...config} />;
  };