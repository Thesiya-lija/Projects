import React, { useEffect, useState } from 'react';
import './Recommended.css';
import { API_KEY, value_converter } from '../../data';
import { Link } from 'react-router-dom';
function Recommended({ categoryId }) {
  const [apiData, setApiData] = useState([]);

  const fetchData = async () => {
    const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=IN&videoCategoryId=${categoryId}&key=${API_KEY}`;
    await fetch(relatedVideo_url)
      .then(res => res.json())
      .then(data => setApiData(data.items));
  };

  useEffect(() => {
    fetchData();
  }, [categoryId]);

  return (
    <>
      <div className='recommended'>
        {apiData.map((item, index) => (
          <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className='side-video-list'>
            <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} />
            <div className='vid-info'>
              <h4>{item.snippet.title}</h4>
              <p>{item.snippet.channelTitle}</p>
              <p>{value_converter(item.statistics.viewCount)} Views</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Recommended;
