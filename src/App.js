import { useRef } from 'react';
import { useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { setIncidents, setUsers, setCategories } from './redux/reducer/incidents';
import { useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Layout, Menu, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import { Content, Header } from 'antd/es/layout/layout';
import {  UsersPieChart } from './components/usersPieChart';
import { CategoriesPieChart } from './components/categoriesPieChart';


function App() {
  
    const incidents = useSelector((state) => state.incidents.list);
    const dispatch = useDispatch();

    useEffect(() => {
      
      fetch("https://66d3057f184dce1713cf0fd8.mockapi.io/bytemonk/incidents")
        .then((response) => response.json())
        .then((data) => {
          const incidentsFromApi = data.map((incident) => {
            return {
              id: incident.id,
              user: incident.user,
              category: incident.category,
              details: incident.category,
              timestamp: incident.timestamp,
              ipAddress: incident.ipAddress,
            };
          });
          dispatch(setIncidents(incidentsFromApi));
          const extractedUsers = data.map((incident) => incident.user);
          const extractedCategories = data.map((incident) => incident.category);
          const Users = [...new Set(extractedUsers)];
          const Categories = [...new Set(extractedCategories)];
          dispatch(setUsers(Users));
          dispatch(setCategories(Categories));
      
          
          
        });
        
    }, []);


  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      width: '15%',
      ...getColumnSearchProps('user'),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: '15%',
      ...getColumnSearchProps('category'),
    },
    {
      title: 'Details',
      dataIndex: 'details',
      key: 'details',
      width: '20%',
    },
    {
      title: 'Time',
      dataIndex: 'timestamp',
      key: 'time',
      width: '25%',
    },
    {
      title: 'IpAddress',
      dataIndex: 'ipAddress',
      key: 'ipAddress',
    },
  ];

  const items = [{
    key: 1,
    label: `Go to next View`,
    },
  ];

  const [pieChartView, setPieChartView] = useState(true);
  function changeView(){
    setPieChartView(!pieChartView);
  };

  
  return( 
  <Layout>
      <Header
        style={{
          display: 'flex',
          float: 'right',
        }}
      >
        <Menu
          theme="dark"
          mode="horizontal"
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
          onClick={changeView}
        />
      </Header>
      <Content
        style={{
          padding: '0 48px',
        }}
      >
      <Divider>Incidents List</Divider> 
      { pieChartView ? (<Table style={{
            margin: '16px 32px',
            padding: '16px',
          }} columns={columns} dataSource={incidents} />)
        : (<>
        
             <UsersPieChart />
             <CategoriesPieChart />
        </>
        
        
        ) }
      
      </Content>
  
  </Layout>
  );
 
}

export default App;
