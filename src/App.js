import React, { Suspense, useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import './App.css';
import { InfinteScroll } from './components/infiniteScroll';
import DataTable from './components/table';
// Case: Application of reusable Infinite-scroll component
function App() {
  const [limit, setLimit] = useState(10);
  const columns = [{key:1, name: 'S.no'},{key:2, name: 'Name'},{key:3, name: 'Email'}];
  const [dataList, setDataList] = useState([]);
  // Mock api timout of 1 sec which is greater average time taken by API
  const fetchData =  async (limit, offset)=>{    
    setTimeout(()=>{
      let list = [];
      for(let i=offset;i< offset+limit;i++){
        list.push({key:i,name:`user ${i+1}`, email:`user${i+1}@gmail.com`});
      }
      setDataList([...dataList, ...list]);
    },1000);
    
  };

  useEffect(()=>{
    fetchData(20,0);
  },[]);

  return (
    <div className="App">
      <div>
        <InfinteScroll 
          getData = {fetchData}
          dataLength = {dataList?.length}
          limit = {limit}
          elementHeight = {600}
          scollThreshold = {0.6}
          scrollableTarget="scrollableDiv"
          loader={<Suspense fallback={<CircularProgress />} />}


        >
          {/* {dataList} */}
          <DataTable
            columns={columns}
            rows = {dataList}
          ></DataTable>
        </InfinteScroll>

      </div>
    </div>
  );
}

export default App;
