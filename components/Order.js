import moment from "moment";
import Currency from 'react-currency-formatter';

function Order({ amount, id, images, items, timestamp }) {
    return (
        <div className="relative border rounded-md">
            <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
                <div>
                    <p className="uppercase font-bold text-xs">
                        order placed
                    </p>
                    <p className="font-bold text-gray-400">
                        {moment.unix(timestamp).format("DD MMM YYYY")}
                    </p>
                </div>
                <div>
                    <p className="text-xs font-bold uppercase">
                        total
                    </p>
                    <p className="whitespace-nowrap">
                        <Currency
                            quantity={amount}
                            currency="INR"
                        />
                    </p>
                </div>
                <div className="hidden md:inline-block">
                    <p className="text-xs font-bold uppercase">
                        Additional
                    </p>
                    <p>
                        <Currency
                            quantity={0}
                            currency="INR"
                        />
                    </p>
                </div>

                <p className="text-sm whitespace-nowrap text-blue-500 sm:text-xl self-end  flex-1 text-right">
                    {items?.length} items
                </p>
                <p className="absolute top-2 right-2 text-xs whitespace-normal w-40 lg:w-72 truncate text-gray-400">
                    #{id}
                </p>
            </div>
            <div className="p-5 sm:p-10">
                <div className="flex space-x-6 overflow-x-auto">
                    {
                        images.map((image, index) => {
                            return <img key={index} src={image} className="h-20 object-contain lg:h-32" />
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default Order