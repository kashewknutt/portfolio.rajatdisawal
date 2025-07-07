import React from 'react'

const HeaderSection = () => {
  return (
    <div className="border-t-4 border-b-4 border-borderSecondary w-full flex justify-between items-center py-4">
        <h1 className="text-5xl font-bold text-left">
          RAJAT DISAWAL
        </h1>
        <div className="border border-solid border-borderSecondary rounded-md max-w-36 text-center text-xs px-2 py-2 mr-4">
          If you wanna download my resume <a href="" className="underline"><i>click here</i></a>
        </div>
    </div>
  )
}

export default HeaderSection