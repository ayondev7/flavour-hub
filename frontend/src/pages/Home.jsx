import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import images from '../assets/images.js';
import { BsFire } from "react-icons/bs";

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Fetch recipes from the server
    axios.get('http://localhost:5000/api/recipe/getAllRecipes')
      .then(response => {
        setRecipes(response.data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
        setLoading(false); // Set loading to false in case of error
      });
  }, []);

  useEffect(() => {
    // Fetch users from the server
    axios.get('http://localhost:5000/api/user/getAllUsers')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
}, []);


  return (
    <div className='h-auto'>
        <div className='flex h-screen'>
        <div className='w-[50%] pt-[10%] pl-16 h-[90vh]'>
          <p className='text-black font-semibold text-5xl'>Eat Healthier With</p>
          <p className='mt-2 text-black font-semibold text-5xl'><span className='text-hotPink'>Nutritious</span> Recipes</p>
          <div className='mt-6 text-lg text-gray-400 '>
            <p>Explore thousands of mouthwatering recipes handpicked by our team of food enthusiasts.</p>
            <p>From savory main courses to delectable desserts,</p>
            <p>We've got something for every taste bud and occasion.</p>
          </div>
          <div className='mt-6 mb-4'><button className="border-none btn btn-xs sm:btn-sm md:btn-md lg:btn-md lg:w-[200px] lg:text-xl bg-hotPink text-white transition-all transition-ease-in-out duration-500">Sign up</button></div>
          <Link className='hover:underline'>Already have an account? <span className='text-hotPink font-semibold'>Login</span></Link>
        </div>

            <div className='relative w-[50%] flex justify-center items-center h-[90vh] overflow-hidden'>
              <img className='h-[80%] relative z-10' src={images.homeImage1} alt="homeImage1" />
              <div className="absolute inset-0 flex justify-center items-center">
                <div className="w-[900px] h-[900px] bg-fdbfb6 rounded-full bg-green-200 absolute left-[40%]"></div>
            </div>

              <div className="card w-[350px] bg-white text-primary-content absolute z-10 top-[65%] right-[52%] shadow-lg">
              <div className="card-body p-6">

              <div className="avatar flex h-[80px] w-[100%]">
                <div className="w-16 h-16 rounded-full ring ring-hotPink ring-offset-2 overflow-hidden">
                  <img className="object-cover w-full h-full" src={images.personImage} alt="avatar" />
                </div>
                <div className='flex-col ml-6 flex-grow'>
                  <h2 className="card-title mb-1">Sara Johnson</h2>
                  <div className="rating">
                      <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500 w-4 h-4" />
                      <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500 w-4 h-4" />
                      <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500 w-4 h-4" />
                      <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500 w-4 h-4" checked />
                      <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500 w-4 h-4" />
                  </div>
                </div>
              </div>

              <p className='font-semibold'>This recipe is a flavour explosion in my mouth! Very delicious.</p>
            </div>

          </div>
        </div>
      </div>  {/*first section ends here */}

      <div className='flex h-screen'>
          <div className='w-[50%] flex items-center pl-16'><img className='rounded-lg w-[90%]' src={images.homeImage2} alt="" /></div>
        
          <div className='w-[50%] my-auto text-black'>
            <p className='text-6xl font-semibold mb-6 text-center'>Share Your <span className='text-hotPink'>Recipes</span></p>
            <p className='text-center pl-8 pr-8 text-lg font-semibold'><span className='text-hotPink text-2xl'>"</span>Welcome to our culinary community, where every meal is a 
              story waiting to be shared. Have a signature dish you're proud of? Or 
              perhaps a creative twist on a classic recipe? Share your culinary 
              adventures with our global community of food enthusiasts! Whether 
              you're a seasoned chef or a kitchen novice, your recipes are valuable 
              contributions that inspire and delight others.
              <span className='text-hotPink text-2xl'>"</span></p>

              <div className='flex justify-center mt-10'>
              <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-hotPink text-white border-none">Create New Recipe</button>
              </div>
              
          </div>
        </div>

        <div className='pl-16 flex-col pr-16 h-auto pb-16'>

            <p className='text-4xl font-semibold text-black'>Explore Recipes</p>
            <p className='flex w-[100%] justify-end mt-2 text-xl mb-10 text-hotPink font-bold'><Link to={'/allRecipes'}>View more</Link></p>
          <div className='flex flex-wrap justify-evenly gap-y-10'>
          {loading ? (
              // Render skeleton loader
              Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="flex flex-col gap-4 w-96 h-[350px] bg-white shadow-xl p-3 rounded-xl">
                    <div className="skeleton h-[60%] w-full bg-customGrayMedium animate-customPulse"></div>
                    <div className="skeleton h-4 w-28 mt-3 bg-customGrayMedium animate-customPulse"></div>
                    <div className="skeleton h-4 w-full mt-3 bg-customGrayMedium animate-customPulse"></div>
                    <div className="skeleton h-4 w-full mt-3 bg-customGrayMedium animate-customPulse"></div>
                  </div>
                  ))
            ) : (
            // Render recipe cards
            recipes.slice(0, 6).map((recipe) => {
    
            // Find the user associated with the recipe's chefId
            const chefUser = users.find(user => user._id === recipe.chefId);
    
            return (
              <div className="card card-compact w-96 h-[350px] bg-white shadow-xl hover:cursor-pointer" key={recipe.id}>
                <figure className='h-[60%]'>
                  {recipe.image && <img src={`data:image/jpeg;base64,${recipe.image}`} alt="" />}
                </figure>
                <div className="rating mt-3 ml-3">
                  <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500 w-4 h-4" />
                  <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500 w-4 h-4" checked />
                  <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500 w-4 h-4" />
                  <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500 w-4 h-4" />
                  <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500 w-4 h-4" />
                </div>
                <div className="p-3">
                  <h2 className="text-xl text-black mb-4 font-semibold">{recipe.title}</h2>
                  <div className='flex justify-between'>
                    <div className='flex items-center'>
                      <div className="avatar">
                        <div className="w-10 rounded-full">
                          <img className='object-contain' src={`data:image/jpeg;base64,${chefUser.image}`} alt="Avatar" />
                        </div>
                      </div>
                      <span className='ml-2 text-black text-md font-bold'>{chefUser.name}</span>
                    </div>
                    <div className='flex items-center text-sm font-bold border-2 p-2 rounded-lg'>
                      <BsFire className='text-red-500'/>
                      <span className='ml-1'>{recipe.nutritionalValues.calories}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
        })
      )}
          </div> {/* card container ends here */}

        
        </div>
    </div>
  );
};

export default Home;
