import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/style/index.css'
import DrawCanva from './components/DrawCanva';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <div className='flex arround'>
      <div>
        <h3>Draw on canva</h3>
        <DrawCanva width={800}/>
      </div>
      <div>

      <h3>Draw with div</h3>
        {/*<DrawCanva/>*/}
      </div>
    </div>
      
  </>
);
