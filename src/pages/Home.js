import axios from "axios";
import React, { useEffect, useState } from "react";
import { Header, ItemList, Footer } from "../components";

const Home = () => {
  let [items, setItems] = useState([]);
  useEffect(()=>{
    axios.get('https://limitless-sierra-67996.herokuapp.com/v1/posts?limit=20&page=1').then(res=>{
      console.log(res);
      setItems(res.data.results);
    })
  },[])
  return (
    <div>
      <Header/>
      <main>
        <ItemList items={items}/>
      </main>
      <Footer/>
    </div>
  );
};

export default Home;
