import React from 'react';
import SearchBar from './component/SearchBar';
import NavBar from './component/NavBar';
import CategoryIcons from './pages/main/CategoryIcons';
import Banner from './pages/main/Banner';
import Table from './pages/main/Table';
import PostBoard from './pages/main/Board';


const App = () => {
  return (
    <div>
      <NavBar/>
      <SearchBar />
      <CategoryIcons/>
      <Banner/>
      <Table/>
      <PostBoard/>
      {/* <CategoryIcons />
      <ApiShareSection />
      <OrderTable />
      <QnASection /> */}
    </div>
  );
};

export default App;
