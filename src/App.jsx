import { ToastContainer } from 'react-toastify';
import './App.css';
import IndexRoute from './routes/IndexRoute';

function App() {
  return (
    	<div className='w-100' style={{ height: "100vh" }}>
		  	<IndexRoute />
		  	<ToastContainer
			  	position="bottom-right"
				autoClose={4000}
				hideProgressBar="false"
				newestontop="false"
				closeOnclick="true"
				pauseonfocusloss="true"
				draggable="true"
				pauseonhover="true"
				theme="light"
		  />
		  
		</div>
  	);
}

export default App;
