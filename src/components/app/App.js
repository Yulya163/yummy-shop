import Products from '../products/products';
import {products} from '../../mock';
import 'normalize.css';

function App() {
  return (
    <div className="App">
			<Products products={products}/>
    </div>
  );
}

export default App;
