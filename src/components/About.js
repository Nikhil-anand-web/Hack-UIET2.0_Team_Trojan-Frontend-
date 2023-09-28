import React from 'react'
import anuj from "../images/anuj1.png"
import nikhil from "../images/nikhil1.png"
import piyush from "../images/pp1.png"
import nikhilA from "../images/nikhilA1.png"
import chitra from "../images/chitra3.png"
import dikshant from "../images/dikhshant1.png"

export const About = () => {
  return (
    <div className='bg-white h-[89vh]'>
      <h1 className='text-black flex justify-center text-[2.25rem] font-extralight underline aboutHead'>Team Members</h1>
      <div className='h-[80vh] mt-3  '>
        <div className='glass w-[100vw] flex justify-center flex-wrap gap-[40px]'>

        <div className='h-[250px] w-[28%] flex flex-col justify-center items-center rounded-lg shadow-lg shadow-sky-900 hover:shadow-2xl hover:shadow-sky-950'>
          <img src={nikhilA }className='h-[180px] w-[150px] rounded-lg ' />
          <div className='flex flex-col justify-center items-center '>
          <p className='font-bold'>Nikhil Anand</p>
          <p>Computer Science & Engineering</p>
          </div>
        </div>

        <div className='h-[250px] w-[28%] flex flex-col justify-center items-center rounded-lg shadow-lg shadow-sky-900 hover:shadow-2xl hover:shadow-sky-950'>
          <img src={anuj }className='h-[180px] w-[120px] rounded-lg' />
          <div className='flex flex-col justify-center items-center '>
          <p className='font-bold'>Anuj Pal</p>
          <p>Computer Science & Engineering</p>
          </div>
        </div>

        <div className='h-[250px] w-[28%] flex flex-col justify-center items-center rounded-lg shadow-lg shadow-sky-900 hover:shadow-2xl hover:shadow-sky-950'>
          <img src={piyush }className='h-[180px] w-[150px] rounded-lg ' />
          <div className='flex flex-col justify-center items-center '>
          <p className='font-bold'>Piyush Pandey</p>
          <p>Computer Science & Engineering</p>
          </div>
        </div>

        <div className='h-[250px] w-[28%] flex flex-col justify-center items-center rounded-lg shadow-lg shadow-sky-900 hover:shadow-2xl hover:shadow-sky-950'>
          <img src={chitra }className='h-[180px] w-[150px] rounded-lg ' />
          <div className='flex flex-col justify-center items-center '>
          <p className='font-bold'>Chitra Pahuja</p>
          <p>Computer Science & Engineering</p>
          </div>
        </div>

        <div className='h-[250px] w-[28%] flex flex-col justify-center items-center rounded-lg shadow-lg shadow-sky-900 hover:shadow-2xl hover:shadow-sky-950'>
          <img src={nikhil }className='h-[180px] w-[150px] rounded-lg ' />
          <div className='flex flex-col justify-center items-center '>
          <p className='font-bold'>Nikhil Pandey</p>
          <p>Artificial Intelligence & Machine Learning</p>
          </div>
        </div>

        <div className='h-[250px] w-[28%] flex flex-col justify-center items-center rounded-lg shadow-lg shadow-sky-900 hover:shadow-2xl hover:shadow-sky-950'>
          <img src={dikshant }className='h-[180px] w-[150px] rounded-lg ' />
          <div className='flex flex-col justify-center items-center '>
          <p className='font-bold'>Dikshant Jha</p>
          <p>Artificial Intelligence & Machine Learning</p>
          </div>
        </div>

        </div>
      </div>
    </div>
  )
}
