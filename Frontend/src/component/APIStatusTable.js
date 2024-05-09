import React from 'react';

function APIStatusTable() {
  return (
    <div className="api-status-table">
      <table>
        <thead>
          <tr>
            <th>API 이름</th>
            <th>고객명</th>
            <th>등록일</th>
            <th>장비</th>
            <th>수량</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {/* 데이터는 서버로부터 받아와서 동적으로 채워줍니다. */}
          <tr>
            <td>Mor Zalai</td>
            <td>2022/12/22</td>
            <td>PS5</td>
            <td>1</td>
            <td>SHIPPED</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default APIStatusTable;
