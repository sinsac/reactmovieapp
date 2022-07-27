import {useEffect, useState} from "react";
import './App.css';
import MovieCard from "./MovieCard";

import SearchIcon from './search.svg';

//const category = 'business';

const apiURL = "http://www.omdbapi.com/?apikey=ccd6f6a3";//"https://newsapi.org/v2/everything?apiKey=92e5f629708d454f9c3ccea4328e94d6";

const newsData1 = {
    "author": "Constantin Gajura",
    "source": {
        "Id": null,
        "Name": "Entrepreneur"
    },
    "publishedAt": "2022-06-29T19:30:00Z",
    "url": "https://www.entrepreneur.com/article/428615"
}

const App = ()=>{

    const [newsData, setNewsData]= useState([]);
    const [searchTerm, setSearchTerm] =  useState("");

    const searchNews = async (keyword)=>{
        const response = await fetch(`${apiURL}&s=${keyword}`);
        const data =  await response.json();
        setNewsData(data.Search);
        console.log(data.Search);
    }

    useEffect(()=>{
        searchNews('Ironman');
    },[]);


    return (
        <div className="app">
             <h1>MOVIES WORLD</h1>
            <div className="search">
                <input 
                placeholder="Search for Movies"
                value={searchTerm}
                onChange={(e)=>setSearchTerm(e.target.value)}
                />
                <img 
                src={SearchIcon}
                alt = "search news"
                onClick={()=>searchNews(searchTerm)}
                />
            </div>
            {
                newsData?.length>0
                ?(<div className="container">
                    {
                        newsData.map((newsData)=>(
                            <MovieCard newsData= {newsData} />
                        ))
                    }
              
                 </div>)
                 :(
                    <div className="empty"> 
                     <h2>No Movies found</h2>
                    </div>
                 )

            }

           
        </div>
       
    );
}
export default App;