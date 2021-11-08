import axios from "axios";
import React, { useEffect, useState } from "react";
import { Header, ItemList } from "../components";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Loader } from "semantic-ui-react";


const Home = () => {
  let [items, setItems] = useState([]);
  let [pageNumber, setPageNumber] = useState(1);
  let [hasMore, setHasMore] = useState(true);
  useEffect(()=>{
    axios.get(`https://limitless-sierra-67996.herokuapp.com/v1/posts?limit=12&page=${pageNumber}`).then(res=>{
      setItems(res.data.results);
      console.log('res.data', res.data);
      setPageNumber(pageNumber+1);
      if(res.data.totalResults === res.data.results.length){
        setHasMore(false);
      }
    })
    
  },[])

  console.log('hasMore', hasMore);

  let getItemList = () => {
    axios.get(`https://limitless-sierra-67996.herokuapp.com/v1/posts?limit=12&page=${pageNumber}`).then(res=>{
      setItems([...items, ...res.data.results]);
      setPageNumber(pageNumber+1);
      if(res.data.totalResults <= items.length + res.data.results.length){
        setHasMore(false);
      }
    })
  }
  console.log('items출력 : ', items);
  return (
    <div>
      <Header/>
      <main>
        
        <InfiniteScroll
          dataLength={items.length}
          next={getItemList}
          hasMore={hasMore}
          loader={<div>aa</div>}
        >
        
        <ItemList items={items}/>
        </InfiniteScroll>
        
      </main>
      
    </div>
  );
};

export default Home;
