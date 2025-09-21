import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='lg:px-16 px-4 lg:py-5 py-6 bg-lightPink'>

      <section className='lg:flex lg:flex-row lg:justify-between flex-col'>
        <div className='text-black w-full lg:w-[30%]'><p className='text-2xl lg:text-4xl mb-2 lg:mb-5 font-bold'>Flavor<span className='text-hotPink'>Hub</span></p>
            <div><p className='text-sm lg:text-md font-semibold text-gray-800'>Discover and share culinary masterpieces with FlavorHub, your ultimate kitchen companion. 
                    Explore a diverse collection of recipes from a passionate community of food lovers, or 
                    unleash your creativity by uploading your own. Whether you're a seasoned chef or a home cook, 
                    connect with like-minded individuals, find inspiration, and make every meal a memorable one.</p>
            </div>
        </div>
        <div className='lg:w-[30%] w-full mt-8 lg:mt-0 grid grid-cols-3 text-md font-semibold text-gray-800'>
          <section className="lg:space-y-4 space-y-2">
            <p className='font-medium text-sm lg:text-lg text-black'><Link>Quick Links</Link></p>
            <p className='text-sm lg:text-base'><Link>Home</Link></p>
            <p className='text-sm lg:text-base'><Link>Recipes</Link></p>
            <p className='text-sm lg:text-base'><Link>Blog</Link></p>
          </section>
          <section className="lg:space-y-4 space-y-2">
            <p className='font-medium text-sm lg:text-lg text-black'><Link>Quick Links</Link></p>
            <p className='text-sm lg:text-base'><Link>Share Recipe</Link></p>
            <p className='text-sm lg:text-base'><Link>About Us</Link></p>
            <p className='text-sm lg:text-base'><Link>Contact</Link></p>
          </section>
          <section className="lg:space-y-4 space-y-2">
            <p className='font-medium text-sm lg:text-lg text-black'><Link>Legal</Link></p>
            <p className='text-sm lg:text-base'><Link>Terms of use</Link></p>
            <p className='text-sm lg:text-base'><Link>Privacy & Cookies</Link></p>
          </section>
        </div>

        <div className='lg:w-[30%] w-full mt-8 lg:mt-0 lg:grid grid-rows-3 hidden'>
            <div className='text-black'>
              <p className='mb-1 text-left lg:text-center text-lg font-bold'>Newsletter</p>
              <p className='text-left lg:text-center text-md font-semibold text-gray-800'>Subcribe to our newsletter to get new updates.</p>
            </div>
            <input type="text" placeholder="Enter your email" className="input input-bordered w-full max-w-xs mx-auto bg-white" />
            <button className=" bg-hotPink lg:h-[50px] lg:mx-6 text-white font-medium rounded-md">Subscribe</button>
        </div>
      </section>   {/*upper section ends here */}

      <section></section>
    </div>
  )
}

export default Footer

