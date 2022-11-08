import { useSelector } from "react-redux"
import { addSelectedFilter } from "../store/_filterSlice";
import ProductItem from "./ProductItem"

function ProductList({ products }) {
    const selectedFilter = (useSelector(addSelectedFilter));
    const myFilter = selectedFilter.payload.filterValue;

    /* useEffect(() => {
        if (myFilter !== "all") {
            const final = products.filter((item, index) => { (item.category.slice(0, 1) === myFilter.slice(0, 1)) })
        }
    }, [myFilter]) */

    return (
        <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52">
            {products.slice(0, 4).map(({ title, price, description, category, image }, index) => (
                <ProductItem key={index}
                    title={title}
                    price={price}
                    description={description}
                    category={category}
                    img={image} />
            ))}
            <div className="w-full md:col-span-full flex justify-center">
                <img className="md:col-span-full" src="https://links.papareact.com/dyz" alt="" />
            </div>
            <div className="md:col-span-2">
                {products.slice(4, 5).map(({ id, title, price, description, category, image }, index) => (
                    <ProductItem key={index}
                        title={title}
                        price={price}
                        description={description}
                        category={category}
                        img={image}
                        id={id} />
                ))}
            </div>
            {products.slice(5, products.length - 1).map(({ title, price, description, category, image }, index) => (
                <ProductItem key={index}
                    title={title}
                    price={price}
                    description={description}
                    category={category}
                    img={image} />
            ))}
        </div>
    )
}

export default ProductList