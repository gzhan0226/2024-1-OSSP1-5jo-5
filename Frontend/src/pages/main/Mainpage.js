import React from 'react';
import {
  Container, SearchBar, SearchInput, SearchButton, Categories, CategoryIcon, Header, HeaderText, APITable, Table,
  TableHeader, TableRow, TableCell, QnABoard, QnAItem, MoreButton
} from './style';
import { FaSearch, FaGamepad, FaHeart, FaShoppingCart, FaPlane, FaUtensils, FaMicrochip, FaRegNewspaper } from 'react-icons/fa';

const Main = () => {
  return (
    <Container>
      <SearchBar>
        <SearchInput placeholder="Search by Category, Company or ..." />
        <SearchButton><FaSearch /></SearchButton>
      </SearchBar>
      <Categories>
        <CategoryIcon><FaGamepad /></CategoryIcon>
        <CategoryIcon><FaHeart /></CategoryIcon>
        <CategoryIcon><FaShoppingCart /></CategoryIcon>
        <CategoryIcon><FaPlane /></CategoryIcon>
        <CategoryIcon><FaUtensils /></CategoryIcon>
        <CategoryIcon><FaMicrochip /></CategoryIcon>
        <CategoryIcon><FaRegNewspaper /></CategoryIcon>
      </Categories>
      <Header>
        <HeaderText>
          <h1>당신의 API를 공유해주세요!</h1>
          <p>당신이 사용한 API를 공유하고 이름 하에 해당 웹사이트를 보다 효율적으로 완벽해보아요</p>
          <p>dochi@email.com | dochi.site.com</p>
        </HeaderText>
        <button>API 등록하기 →</button>
      </Header>
      <APITable>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>API 이름</TableCell>
              <TableCell>가입자</TableCell>
              <TableCell>제품명</TableCell>
              <TableCell>좋아요</TableCell>
              <TableCell>API 상태</TableCell>
            </TableRow>
          </TableHeader>
          <tbody>
            <TableRow>
              <TableCell>Mar Zaki</TableCell>
              <TableCell>#24323228</TableCell>
              <TableCell>PS5</TableCell>
              <TableCell>1</TableCell>
              <TableCell>SHIPPED</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Jess Archer</TableCell>
              <TableCell>#24322507</TableCell>
              <TableCell>PS5</TableCell>
              <TableCell>1</TableCell>
              <TableCell>SHIPPED</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Ian Lundman</TableCell>
              <TableCell>#24323222</TableCell>
              <TableCell>XboxOneX</TableCell>
              <TableCell>1</TableCell>
              <TableCell>COMPLETE</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Mohamed Said</TableCell>
              <TableCell>#24323220</TableCell>
              <TableCell>iPhone12</TableCell>
              <TableCell>1</TableCell>
              <TableCell>PENDING</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>David Hemphill</TableCell>
              <TableCell>#24323220</TableCell>
              <TableCell>iPhone13</TableCell>
              <TableCell>1</TableCell>
              <TableCell>RETURN</TableCell>
            </TableRow>
          </tbody>
        </Table>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>API 이름</TableCell>
              <TableCell>가입자</TableCell>
              <TableCell>제품명</TableCell>
              <TableCell>좋아요</TableCell>
              <TableCell>API 상태</TableCell>
            </TableRow>
          </TableHeader>
          <tbody>
            <TableRow>
              <TableCell>Mar Zaki</TableCell>
              <TableCell>#24323228</TableCell>
              <TableCell>PS5</TableCell>
              <TableCell>1</TableCell>
              <TableCell>SHIPPED</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Jess Archer</TableCell>
              <TableCell>#24322507</TableCell>
              <TableCell>PS5</TableCell>
              <TableCell>1</TableCell>
              <TableCell>SHIPPED</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Ian Lundman</TableCell>
              <TableCell>#24323222</TableCell>
              <TableCell>XboxOneX</TableCell>
              <TableCell>1</TableCell>
              <TableCell>COMPLETE</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Mohamed Said</TableCell>
              <TableCell>#24323220</TableCell>
              <TableCell>iPhone12</TableCell>
              <TableCell>1</TableCell>
              <TableCell>PENDING</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>David Hemphill</TableCell>
              <TableCell>#24323220</TableCell>
              <TableCell>iPhone13</TableCell>
              <TableCell>1</TableCell>
              <TableCell>RETURN</TableCell>
            </TableRow>
          </tbody>
        </Table>
      </APITable>
      <QnABoard>
        <div>
          <h2>Q & A 게시판</h2>
          <QnAItem>1. API 오류해결책이 모로있어요</QnAItem>
          <QnAItem>2. API 오류해결책이 모로있어요</QnAItem>
          <QnAItem>3. API 오류해결책이 모로있어요</QnAItem>
          <QnAItem>4. API 오류해결책이 모로있어요</QnAItem>
          <QnAItem>5. API 오류해결책이 모로있어요</QnAItem>
          <QnAItem>6. API 오류해결책이 모로있어요</QnAItem>
          <MoreButton>전체보기 →</MoreButton>
        </div>
        <div>
          <h2>질문 게시판</h2>
          <QnAItem>1. API 오류해결책이 모로있어요</QnAItem>
          <QnAItem>2. API 오류해결책이 모로있어요</QnAItem>
          <QnAItem>3. API 오류해결책이 모로있어요</QnAItem>
          <QnAItem>4. API 오류해결책이 모로있어요</QnAItem>
          <QnAItem>5. API 오류해결책이 모로있어요</QnAItem>
          <QnAItem>6. API 오류해결책이 모로있어요</QnAItem>
          <MoreButton>전체보기 →</MoreButton>
        </div>
      </QnABoard>
    </Container>
  );
};

export default Main;
