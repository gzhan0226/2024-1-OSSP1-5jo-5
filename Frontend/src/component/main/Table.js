import React from 'react';
import styled from 'styled-components';
import { StyledTable, Th, Td, Status } from './Style';

const Table = () => {
  const data = [
    { id: 1, name: 'Mior Zaki', order: '#242332228', product: 'PS5', quantity: '1', status: 'SHIPPED' },
    { id: 2, name: 'Jess Archer', order: '#242352027', product: 'PS5', quantity: '1', status: 'SHIPPED' },
    { id: 3, name: 'Ian Landsman', order: '#242332222', product: 'XboxOneX', quantity: '1', status: 'COMPLETE' },
    { id: 4, name: 'Mohamed Said', order: '#242332221', product: 'iPhone12', quantity: '1', status: 'PENDING' },
    { id: 5, name: 'David Hemphill', order: '#242332220', product: 'iPhone13', quantity: '1', status: 'RETURN' },
  ];

  return (
    <StyledTable>
      <thead>
        <tr>
          <Th>API 이름</Th>
          <Th>주문번호</Th>
          <Th>제품명</Th>
          <Th>수량</Th>
          <Th>상태 옵션</Th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id}>
            <Td>{item.name}</Td>
            <Td>{item.order}</Td>
            <Td>{item.product}</Td>
            <Td>{item.quantity}</Td>
            <Td><Status status={item.status}>{item.status}</Status></Td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default Table;
