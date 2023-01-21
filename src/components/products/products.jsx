import Product from '../../components/product/product';
import './products.scss';

export default function Products({products}) {
    
    return (
        <section className='products'>
            <h1 className='products__title'>Ты сегодня покормил кота?</h1>
            <div className='products__list'>
                {
                    products.map(product => (
                        <Product product={product} key={product.id}/>
                    ))
                }
            </div>
        </section>        
    )
}
