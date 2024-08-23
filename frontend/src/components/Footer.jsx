import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='px-16 py-5 bg-lightPink'>

      <section className='flex justify-between'>
        <div className='text-black w-[30%]'><p className='text-4xl mb-5 font-bold'>Recipe<span className='text-hotPink'>Finder</span></p>
            <div><p className='text-md font-semibold text-gray-600'>Discover and share culinary masterpieces with Recipe Finder, your ultimate kitchen companion. 
                    Explore a diverse collection of recipes from a passionate community of food lovers, or 
                    unleash your creativity by uploading your own. Whether you're a seasoned chef or a home cook, 
                    connect with like-minded individuals, find inspiration, and make every meal a memorable one.</p>
            </div>
        </div>
        <div className='w-[30%] grid grid-cols-3 text-md font-semibold text-gray-600'>
          <section className="space-y-4">
            <p className='font-bold text-lg text-black'><Link>Quick Links</Link></p>
            <p><Link>Home</Link></p>
            <p><Link>Recipes</Link></p>
            <p><Link>Blog</Link></p>
          </section>
          <section className="space-y-4">
            <p className='font-bold text-lg text-black'><Link>Quick Links</Link></p>
            <p><Link>Share Recipe</Link></p>
            <p><Link>About Us</Link></p>
            <p><Link>Contact</Link></p>
          </section>
          <section className="space-y-4">
            <p className='font-bold text-lg text-black'><Link>Legal</Link></p>
            <p><Link>Terms of use</Link></p>
            <p><Link>Privacy & Cookies</Link></p>
          </section>
        </div>

        <div className='w-[30%] grid grid-rows-3'>
            <div className='text-black'>
              <p className='mb-1 text-center text-lg font-bold'>Newsletter</p>
              <p className='text-center text-md font-semibold text-gray-600'>Subcribe to our newsletter to get new updates.</p>
            </div>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs mx-auto bg-white" />
            <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md w-[50%] mx-auto">Subscribe</button>
        </div>
      </section>   {/*upper section ends here */}

      <section></section>
    </div>
  )
}

export default Footer

