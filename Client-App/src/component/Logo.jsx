import React from 'react'
import Logo_img from "../dist/image/Logo.png"
const Logo = () => {
  return (
       <div className="flex justify-center">
          <img
            className="w-[5rem]"
            src={Logo_img}
            alt="Melamchi Online Store Logo"
          />
        </div>
  )
}

export default Logo