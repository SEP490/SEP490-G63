import React from 'react'
import PlaceCard from './PlaceCard'
import Img1 from '~/assets/places/a.png'
import Img2 from '~/assets/places/b.png'
import Img3 from '~/assets/places/c.png'
import Img4 from '~/assets/places/place4.jpg'
import Img5 from '~/assets/places/place5.jpg'
import Img6 from '~/assets/places/place6.jpg'

const PlacesData = [
  {
    img: Img1,
    title: 'Nền tảng thông minh',
    location: 'USA',
    description: 'Tạo hợp đồng, tài liệu cùng việc quản lý và ký kết thực hiện trên nền tảng quy nhất',
    price: 6700,
    type: 'Cultural Relax'
  },
  {
    img: Img2,
    title: 'Ký kết mọi lúc mọi nơi',
    location: 'India',
    description: 'Hỗ trợ ký kết đa dạng thiết bị: Chữ ký số, chữ ký số thông minh, Ảnh, Email, SMS',
    price: 6700,
    type: 'Cultural Relax'
  },
  {
    img: Img3,
    title: 'Đơn giản & Dễ sử dụng',
    location: 'US',
    description: 'Giao diện đơn giản, thân thiện và thông minh. Chỉ mất 15 phút làm quen',
    price: 6200,
    type: 'Cultural Relax'
  }
  // {
  //   img: Img4,
  //   title: "Sydney",
  //   location: "USA",
  //   description: "lorem ipsum dolor sit amet consectetur adipisicing elit.",
  //   price: 6700,
  //   type: "Cultural Relax",
  // },
  // {
  //   img: Img5,
  //   title: "Los Angeles",
  //   location: "United states",
  //   description:
  //     "The Taj Mahal is an ivory-white marble mausoleum on the south bank of the river Yamuna in the Indian city of Agra.",
  //   price: 6700,
  //   type: "Cultural Relax",
  // },
  // {
  //   img: Img6,
  //   title: "Los Vegas",
  //   location: "California",
  //   description:
  //     "The Taj Mahal is an ivory-white marble mausoleum on the south bank of the river Yamuna in the Indian city of Agra.",
  //   price: 6200,
  //   type: "Cultural Relax",
  // },
]

const Places = () => {
  return (
    <>
      <div className='dark:bg-gray-900 dark:text-white bg-gray-50 py-10'>
        <section data-aos='fade-up' className='container '>
          <h1 className=' my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold'>Một giải pháp tối ưu</h1>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {PlacesData.map((item, index) => (
              <PlaceCard key={index} {...item} />
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

export default Places
