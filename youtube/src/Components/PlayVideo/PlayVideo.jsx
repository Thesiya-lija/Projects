import React, { useEffect, useState } from 'react';
import './PlayVideo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faShare, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import user from '../../assets/Images/gamer.jpeg';
import { API_KEY, value_converter } from '../../data';
import moment from 'moment';
import { useParams } from 'react-router-dom';

function PlayVideo() {
  const { videoId } = useParams();
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState(null);

  const fetchVideoData = async () => {
    try {
      const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
      const response = await fetch(videoDetails_url);
      const data = await response.json();
      setApiData(data.items[0]);
    } catch (error) {
      console.error('Error fetching video data:', error);
    }
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    const fetchOtherData = async () => {
      if (apiData) {
        try {
          const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
          const channelResponse = await fetch(channelData_url);
          const channelData = await channelResponse.json();
          setChannelData(channelData.items[0]);

          const commentData_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`;
          const commentResponse = await fetch(commentData_url);
          const commentData = await commentResponse.json();
          setCommentData(commentData.items);
        } catch (error) {
          console.error('Error fetching other data:', error);
        }
      }
    };

    fetchOtherData();
  }, [apiData, videoId]);

  return (
    <>
      <div className='play-video'>
        {/* <video src={video1} controls autoPlay muted></video> */}
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        <h3>{apiData ? apiData.snippet.title : 'Title Here'}</h3>
        <div className='play-video-info'>
          <p>
            {apiData ? value_converter(apiData.statistics.viewCount) : '16K'} &bull;
            {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ''}
          </p>
          <div>
            <span><FontAwesomeIcon icon={faThumbsUp} className='img' /> {apiData ? value_converter(apiData.statistics.likeCount) : 155}</span>
            <span><FontAwesomeIcon icon={faThumbsDown} className='img' /></span>
            <span><FontAwesomeIcon icon={faShare} className='img' /> Share</span>
            <span><FontAwesomeIcon icon={faFloppyDisk} className='img' /> Save</span>
          </div>
        </div>
        <hr />
        <div className='publisher'>
          <img src={channelData ? channelData.snippet.thumbnails.default.url : ''} alt="" />
          <div>
            <p>{apiData ? apiData.snippet.channelTitle : ''}</p>
            <span>{channelData ? value_converter(channelData.statistics.subscriberCount) : '1M'} Subscribers</span>
          </div>
          <button>Subscribe</button>
        </div>
        <div className='vid-description'>
          <p>{apiData ? apiData.snippet.description.slice(0, 250) : 'Description Here'}</p>
          <p>Subscribe</p>
          <hr />
          <h4>{apiData ? value_converter(apiData.statistics.commentCount) : 102} comments</h4>
          {commentData ? commentData.map((item) => {
            const comment = item.snippet.topLevelComment.snippet;
            return (
              <div key={item.id} className='comments'>
                <img src={comment.authorProfileImageUrl} alt='' />
                <div>
                  <h3>{comment.authorDisplayName} <span>{moment(comment.publishedAt).fromNow()}</span></h3>
                  <p>{comment.textOriginal}</p>
                  <div className='comment-action'>
                    <span><FontAwesomeIcon icon={faThumbsUp} className='img' />{value_converter(comment.likeCount)}</span>
                    <span> <FontAwesomeIcon icon={faThumbsDown} className='img' /></span>
                  </div>
                </div>
              </div>
            );
          }) : 'Loading comments...'}
        </div>
      </div>
    </>
  );
}

export default PlayVideo;
