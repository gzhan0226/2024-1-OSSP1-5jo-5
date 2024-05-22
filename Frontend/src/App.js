import React from 'react';
import SearchBar from './component/SearchBar';
import NavBar from './component/NavBar';
import CategoryIcons from './pages/main/CategoryIcons';
import Banner from './pages/main/Banner';
// import CategoryIcons from './components/CategoryIcons';
// import ApiShareSection from './components/ApiShareSection';
// import OrderTable from './components/OrderTable';
// import QnASection from './components/QnASection';

const App = () => {
  return (
    <div>
      <NavBar/>
      <SearchBar />
      <CategoryIcons/>
      <Banner/>
      {/* <CategoryIcons />
      <ApiShareSection />
      <OrderTable />
      <QnASection /> */}
    </div>
  );
};

export default App;
