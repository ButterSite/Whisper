import ReactDOM from 'react-dom/client';
import AppWrapper from './App';
import { Provider } from 'react-redux';
import store from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Provider store={store}>
    <AppWrapper />
</Provider>

);
