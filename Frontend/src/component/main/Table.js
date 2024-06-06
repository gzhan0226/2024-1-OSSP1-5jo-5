import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyledTable, Th, Td } from './Style';

const Table = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // axios를 사용하여 API 호출
    axios.get('http://localhost:8080/api/list/top?type=likes')
      .then(response => {
        setData(response.data); 
        
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <StyledTable>
      <thead>
        <tr>
          <Th>제공처</Th>
          <Th>API 이름</Th>
          <Th>카테고리</Th>
          <Th>가격정책</Th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id}>
            <Td><img src={item.favicon} alt="favicon" /></Td>
            <Td>{item.name}</Td>
            <Td>{item.category}</Td>
            <Td>{item.price}</Td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default Table;
