import  React  from  'react';
import  './Sidebar.css';
import  {  FontAwesomeIcon  }  from  '@fortawesome/react-fontawesome';
import  {  faHome,  faGamepad,  faVolleyballBall,  faMusic, faTv, faNewspaper,faUser  }  from  '@fortawesome/free-solid-svg-icons';

function Sidebar({ sidebar, category, setCategory }) {
    return (
        <>
            <div className={`sidebar ${sidebar ? "" : "small-sidebar"}`}>
                <div className='shortcut-links'>
                    <div className={`side-link ${category === 0 ? "active" : ""}`} onClick={() => { setCategory(0)}}>
                        <FontAwesomeIcon icon={faHome} className='img' />
                        <p>Home</p>
                    </div>
                    <div className={`side-link ${category === 20 ? "active" : ""}`} onClick={() => { setCategory(20)}}>
                        <FontAwesomeIcon icon={faGamepad} className='img' />
                        <p>Game</p>
                    </div>
                    <div className={`side-link ${category === 17 ? "active" : ""}`} onClick={() => { setCategory(17)}}>
                        <FontAwesomeIcon icon={faVolleyballBall} className='img' />
                        <p>Sports</p>
                    </div>
                    <div className={`side-link ${category === 10 ? "active" : ""}`} onClick={() => { setCategory(10)}}>
                        <FontAwesomeIcon icon={faMusic} className='img' />
                        <p>Music</p>
                    </div>
                    <div className={`side-link ${category === 24 ? "active" : ""}`} onClick={() => { setCategory(24)}}>
                        <FontAwesomeIcon icon={faTv} className='img' />
                        <p>Entertainment</p>
                    </div>
                    <div className={`side-link ${category === 25 ? "active" : ""}`} onClick={() => { setCategory(25)}}>
                        <FontAwesomeIcon icon={faNewspaper} className='img' />
                        <p>News</p>
                    </div>
                </div>
                <hr />
                <div className='subscribed-list'>
                    <h3>Subscribed</h3>
                    <div className='side-link'>
                    <FontAwesomeIcon icon={faUser} className='img'/>
                    <a 
        href="http://localhost:3000/email" 
        target="_blank" 
        rel="noopener noreferrer">                 
           <p>Liza Thesiya </p></a>
                    </div>
                    <div className='side-link'>
                    <FontAwesomeIcon icon={faUser} className='img' />
        
                    <a 
        href="http://localhost:3000/email" 
        target="_blank" 
        rel="noopener noreferrer">  
                    <p>Priyal Kukreja</p></a>
                    </div><div className='side-link'>
                    <FontAwesomeIcon icon={faUser} className='img' />
                    
                    <a 
        href="http://localhost:3000/email" 
        target="_blank" 
        rel="noopener noreferrer">  <p>Nandu's World</p></a>
                    </div><div className='side-link'>
                        
                    <FontAwesomeIcon icon={faUser}className='img'  />
                    <a 
        href="http://localhost:3000/email" 
        target="_blank" 
        rel="noopener noreferrer">  <p>AS Gaming</p></a>
                    </div>
                </div>
               
            </div>
        </>
    );
}

export default Sidebar;
