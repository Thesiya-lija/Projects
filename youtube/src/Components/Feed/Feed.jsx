import React, { useState, useEffect } from 'react';
import './Feed.css';
import { Link } from 'react-router-dom';
import moment from 'moment'; 
import home1 from '../../assets/Images/home1.png';
import { API_KEY, value_converter } from '../../data';

function Feed({ category }) {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${category}&key=${API_KEY}`;
    await fetch(videoList_url)
      .then((response) => response.json())
      .then((data) => setData(data.items));
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className='feed'>
      {data.map((item, index) => (
        <Link to={`video/${item.snippet.categoryId}/${item.id}`} className='card' key={index}>
          <img src={item.snippet.thumbnails.medium.url} alt='' />
          <h2>{item.snippet.title}</h2>
          <h3>{item.snippet.channelTitle}</h3>
          <p>{value_converter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
        </Link>
      ))}
    </div>
  );
}

export default Feed;


// src/components/Feed.js

// import React, { useState, useEffect } from 'react';
// import './Feed.css';
// import { Link } from 'react-router-dom';
// import moment from 'moment';
// import axios from 'axios';
// import { API_KEY, value_converter } from '../../data';

// function Feed({ category }) {
//   const [data, setData] = useState([]);

//   const fetchData = async () => {
//     const videoListUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${category}&key=${API_KEY}`;
    
//     try {
//       const response = await fetch(videoListUrl);
//       const result = await response.json();
//       setData(result.items);
//     } catch (error) {
//       console.error('Error fetching video data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [category]);

//   const handleDownload = async (videoId, title) => {
//     try {
//       const response = await axios.get(`http://localhost:8000/download?videoId=${videoId}`, {
//         responseType: 'blob', // Ensures we get binary data as a Blob
//       });

//       // Create a URL for the Blob and trigger download
//       const url = window.URL.createObjectURL(new Blob([response.data], { type: 'video/mp4' }));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', `${title}.mp4`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove(); // Clean up the link element
//       window.URL.revokeObjectURL(url); // Release the Blob URL
//     } catch (error) {
//       console.error('Error downloading video:', error);
//       alert('Failed to download video. Please try again later.');
//     }
//   };

//   return (
//     <div className='feed'>
//       {data.map((item, index) => (
//         <div className='card' key={index}>
//           <Link to={`video/${item.snippet.categoryId}/${item.id}`}>
//             <img src={item.snippet.thumbnails.medium.url} alt='' />
//             <h2>{item.snippet.title}</h2>
//             <h3>{item.snippet.channelTitle}</h3>
//             <p>
//               {value_converter(item.statistics.viewCount)} views &bull;{' '}
//               {moment(item.snippet.publishedAt).fromNow()}
//             </p>
//           </Link>
//           <button onClick={() => handleDownload(item.id, item.snippet.title)}>Download</button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Feed;
