import React from 'react'
import { AiFillLayout } from 'react-icons/ai'
import { MdOutlinePhoneAndroid } from 'react-icons/md'
import { HiMiniComputerDesktop } from 'react-icons/hi2'
import { MdSecurity } from 'react-icons/md'

const Services = [
  {
    name: 'UX research',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum laudantium beatae quidem.',
    img: 'https://i.ibb.co/GMpmHhQ/ui-ux-representations-with-laptop.jpg',
    icon: <AiFillLayout className='text-4xl' />,
    bgColor: 'bg-teal-500/70'
  },
  {
    name: 'App Development',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum laudantium beatae quidem.',
    img: 'https://i.ibb.co/926XjM3/1f9c840fb15b4fb92a3a122bdef2968b.png',
    icon: <MdOutlinePhoneAndroid className='text-4xl' />,
    bgColor: 'bg-teal-500/70'
  },

  {
    name: 'Web Development',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum laudantium beatae quidem.',
    img: 'https://i.ibb.co/Kb1VSHc/images.jpg',
    icon: <HiMiniComputerDesktop className='text-4xl' />,
    bgColor: 'bg-teal-500/70'
  },
  {
    name: 'Security',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum laudantium beatae quidem.',
    img: 'https://i.ibb.co/GsdrnCQ/images-1.jpg',
    icon: <MdSecurity className='text-4xl' />,
    bgColor: 'bg-teal-500/70'
  }
]

const ServicesBoxx = () => {
  return (
    <section id='services' className='my-10 container'>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
        {Services.map(({ name, description, img, icon, bgColor }) => (
          <div
            key={name}
            className={` ${bgColor} rounded-xl text-white bg-cover bg-no-repeat bg-center bg-blend-overlay`}
            style={{ backgroundImage: `url(${img})` }}
          >
            <div className='p-3 md:p-16 backdrop-blur-sm space-y-3 rounded-xl'>
              {icon}
              <h1 className='text-2xl font-bold'>{name}</h1>
              <p>{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ServicesBoxx
