import axios from "axios";
import React, { useEffect, useState } from "react";
import { Header, ItemList, Footer } from "../components";
import InfiniteScroll from 'react-infinite-scroll-component';


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
          loader={<h4>Loading...</h4>}
        >
        
        <ItemList items={items}/>
        </InfiniteScroll>
      </main>
      {/* <Footer/> */}
    </div>
  );
};

export default Home;
