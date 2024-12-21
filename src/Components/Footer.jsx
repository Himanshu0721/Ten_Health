import React from 'react'
import { FaLinkedin, FaYoutube, FaTwitter, FaInstagram } from "react-icons/fa";


const Footer = () => {
  return (
    <footer>

        {/* Footer Middle  */}
        <div className='bg-white items-center text-center w-50 h-80'>
            <h1 className='text-6xl font-bold m-10'>let's turn potential into growth...</h1>
            <p className='font-semibold'>Experience the awe-inspiring magic of our blueprint as your thoughts unfold into a structured roadmap, guiding you effortlessly towards <br /> extraordinary achievement.</p>
            <button type="submit" className='px-12 py-2 mt-8 border-solid bg-gray-100 text-black border border-black rounded-md hover:bg-black hover:text-white'>Login</button>
        </div>


        {/* Bottom Footer */}
        <div className='bg-black px-4 md:px-17 lg:px-28  p-10 '>

            <div className='grid grid-cols-1 md:grid-cols-3'>
                {/* 1. Left Part  */}
                <div>
                    <h1 className='text-white font-bold text-xl mt-7'>Ten-IdeaEngine</h1>
                    <p className='text-gray-500 text-sm ml-0'>Turning Your Vision into an Actionable Blueprint to Brilliance.</p>
                </div>

                {/* 2. Middle Part  */}
                <div>
                    <h1 className='text-white text-xl font-bold mt-6 ml-0'>Platform</h1>
                    <ul className='text-gray-500'>
                        <li><a href="#" className='hover:text-white ml-0'>Feature</a></li>
                        <li><a href="#" className='hover:text-white ml-0'>Pricing</a></li>
                        <li><a href="#" className='hover:text-white ml-0'>Login</a></li>
                        <li><a href="#" className='hover:text-white ml-0'>SignUp</a></li>
                        <li><a href="#" className='hover:text-white ml-0'>FAQ</a></li>
                    </ul>
                </div>

                {/* 3. Right Part  */}
                <div className=' py-6 px-4'>
                    <h1 className='text-white font-bold text-xl'>Follow Us</h1>
                    <div className='flex gap-3 mt-4'>
                        <FaLinkedin className="text-2xl hover:text-white text-gray-500" />
                        <FaYoutube className="text-2xl hover:text-white text-gray-500" />
                        <FaTwitter className="text-2xl hover:text-white text-gray-500" />
                        <FaInstagram className="text-2xl hover:text-white text-gray-500" />
                    </div>
                    
                </div>

            </div>
            
            
              
            <div className='flex justify-center items-center text-center mt-7 p-4'>
                <p className='text-gray-400 hover:text-white mt-10'> TEN Health Engine © 2024 All Rights Reserved</p>
            </div>

        </div>

    </footer>
  )
}

export default Footer