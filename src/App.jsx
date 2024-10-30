import { ToastContainer } from 'react-bootstrap';
import './App.css';
import IndexRoute from './routes/IndexRoute';

function App() {
  return (
    	<div className='w-100' style={{ height: "100vh" }}>
		  	<IndexRoute />
		  	<ToastContainer
				position="bottom-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
		  	/>
		</div>
  	);
}

export default App;
