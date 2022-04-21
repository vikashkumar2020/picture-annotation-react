import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/style/index.css'
import DrawCanva from './components/DrawCanva';
import FromDialog from './components/FormDialog'
import AnnotationList from './components/AnnotationLists';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <div className='flex arround'>
      <div>
        <h3>Draw on canva</h3>
        <DrawCanva width={600}/>
      </div>
      <div>

      <h3>Form dialogue</h3>
          <FromDialog/>
          <AnnotationList/>
      </div>
    </div>
      
  </>
);
