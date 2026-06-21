"use client"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { pricedata } from "@/app/api/data"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const CardSlider = () => {
  const settings = {
    autoplay: true,
    dots: false,
    arrows: false,
    infinite: true,
    autoplaySpeed: 2000,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    cssEase: "ease-in-out",
    responsive: [
      { breakpoint: 479, settings: { slidesToShow: 1 } },
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
    ],
  }

  return (
    <div className="pt-14 flex flex-col gap-10">
      <div className="flex flex-col gap-3 items-center justify-center text-center">
        <p className="text-white font-medium">
          Fixed-term <span className="text-primary">investment plans</span>
        </p>
        <h2 className="sm:text-5xl text-3xl text-white font-medium">
          Choose your capital allocation tier
        </h2>
      </div>
      <Slider {...settings}>
        {pricedata.map((item, index) => (
          <div key={index} className="pr-6">
            <Card className="bg-white/5 border-none shadow-none rounded-xl p-0">
              <CardContent className="px-5 py-6">
                <div className="flex flex-col items-center gap-5">
                  <div className={`${item.background} ${item.padding} rounded-full`}>
                    <Image src={item.icon} alt={`${item.title} icon`} width={item.width} height={item.height} />
                  </div>
                  <p className="text-white text-xs font-normal text-center">
                    <span className="text-16 font-bold mr-2 block">{item.title}</span>
                    <span className="text-white/50">{item.short}</span>
                  </p>
                </div>
                <div className="flex justify-center mt-2">
                  <div className="text-center">
                    <p className="text-lg font-bold text-white mb-0 leading-none">{item.price}</p>
                    <p className="text-xs text-primary mt-1">{item.mark}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default CardSlider
