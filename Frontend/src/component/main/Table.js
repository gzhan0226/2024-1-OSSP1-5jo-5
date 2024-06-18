import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { StyledTable, Th, Td, TdFavi } from "./Style";

const Table = ({ url, row }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const defaultFavicon = "/img/hedgehog.png"; 

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        if (Array.isArray(response.data.result)) {
          setData(response.data.result);
          console.log("Fetched data:", response.data.result);
        } else {
          console.error("Unexpected response data format:", response.data);
          setError("Unexpected response data format.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("데이터를 가져오는 중 오류 발생:", error);
        setError(
          "서버에서 데이터를 불러오는 데 실패했습니다. 나중에 다시 시도해 주세요."
        );
        setLoading(false);
      });
  }, [url]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <pre>{error.toString()}</pre>
      </div>
    );
  }

  const handleRowClick = (id) => {
    navigate(`/api-details/${id}`);
  };

  return (
    <StyledTable>
      <thead>
        <tr>
          <Th>제공처</Th>
          <Th>API 이름</Th>
          <Th>카테고리</Th>
          <Th>{row}</Th>
          <Th>가격 정책</Th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item) => (
            <tr key={item.api_id} onClick={() => handleRowClick(item.api_id)}>
              <TdFavi
                src={item.favicon || defaultFavicon}
                alt={`${item.name} favicon`}
              />
              <Td>{item.name}</Td>
              <Td>{item.category}</Td>
              <Td>{item.likes}</Td>
              <Td>{item.pricepolicy}</Td>
            </tr>
          ))
        ) : (
          <tr>
            <Td colSpan="4">데이터가 없습니다</Td>
          </tr>
        )}
      </tbody>
    </StyledTable>
  );
};

export default Table;
