import {useState} from 'react';
import './product.scss';

export default function Product({product}) {
    
    const {        
        subtitle,
        title,
        type,
        portion_number,
        present,
        img,
        bundle_weight,
        satisfaction,
        availability,
        description
    } = product;

    const ProductStatus = {
        DEFAULT: 'default',
        DEFAULT_HOVER: 'defaultHover',
        SELECTED: 'selected',
        SELECTED_HOVER: 'selectedHover',
        DISABLED: 'disabled',        
    }

    const [productStatus, setproductStatus] = useState(availability ? ProductStatus.DEFAULT : ProductStatus.DISABLED);
    
    const handleProductItemClick = (evt) => {
        evt.preventDefault();
        setproductStatus((prevStatus) => (
            prevStatus === ProductStatus.DEFAULT ? ProductStatus.SELECTED : ProductStatus.DEFAULT
        ));    
    }

    const handleProductItemMouseLeave = () => {   
        productStatus === ProductStatus.SELECTED || productStatus === ProductStatus.SELECTED_HOVER ? setproductStatus(ProductStatus.SELECTED_HOVER) : setproductStatus(ProductStatus.DEFAULT);
    }

    const setDescription = (status) => {        
        switch (status) {
            case ProductStatus.DEFAULT :
                return <>Чего сидишь? Порадуй котэ,  
                    <button
                        className='product__button'
                        onClick={handleProductItemClick}                        
                    > купи.
                    </button> 
                </>;
            case ProductStatus.SELECTED :
                return `${description}`;            
            case ProductStatus.SELECTED_HOVER :
                return `${description}`;            
            case ProductStatus.DISABLED :
                return `Печалька, ${type} закончился`;
            default:
                return null
        }
    }

    const setSubTitle = (status) => status === ProductStatus.SELECTED_HOVER ? 'Котэ не одобряет?' : `${subtitle}`;    

    const setProductsItemClassName = (status) => {
        switch (status) {
            case ProductStatus.DEFAULT:
                return ''
            case ProductStatus.SELECTED:
                return `product__wrapper_selected`;            
            case ProductStatus.SELECTED_HOVER:
                return `product__wrapper_selected product__wrapper_selected-hover`;            
            case ProductStatus.DISABLED:
                return `product__wrapper_disabled`;
            default:
                return null
        }
    }
    
    return (
        <div className='products__item'>   
            <div
                className={`product__wrapper ${setProductsItemClassName(productStatus)}`}
                disabled={!availability}
                onClick={handleProductItemClick}                
                onMouseLeave={handleProductItemMouseLeave}                
            >
                <div className='product__subtitle'>
                    {setSubTitle(productStatus)}
                </div>
                <h2 className='product__title'>{title}<span className='product__type'>{type}</span></h2>            
                <ul className='product__details'>
                    <li>{portion_number} порций</li>
                    <li>{present}</li>
                    <li>{satisfaction ? <span>заказчик доволен</span> : null}</li>                
                </ul>
                <div className='product__img'>
                    <img src={img} alt={`${title} ${type}`}/>
                </div>
                <div 
                    className='product__weight'>
                    <div className='number'>{bundle_weight}</div>
                    <div className='unit'>кг</div>
                </div>
            </div>         
            <div className={availability ? 'product__description' : 'product__description product__description_disabled'}> 
                {setDescription(productStatus)}                            
            </div>
        </div>        
    )
}