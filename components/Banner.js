import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Banner1 from "../assets/images/banner1.jpg";
import Banner2 from "../assets/images/banner2.jpg";
import Banner3 from "../assets/images/banner3.jpg";

function Banner() {
    return (
        <div className="relative ">
            <div className="absolute w-full h-full  bg-gradient-to-t from-gray-100 to-transparent bottom-0"></div>
            <Carousel
                autoPlay
                infiniteLoop
                showStatus={false}
                showIndicators={false}
                showThumbs={false}
                interval={5000}
            >
                <div>
                    <Image src={Banner1} objectFit="cover" />
                </div>
                <div>
                    <Image src={Banner2} objectFit="cover" />
                </div>
                <div>
                    <Image src={Banner3} objectFit="cover" />
                </div>
            </Carousel>
        </div>
    )
}

export default Banner