import React from 'react'
import { ClipLoader } from 'react-spinners'

export default function Spinner() {
  return (
    <div className="flex items-center justify-center p-10">
      <ClipLoader size={36} color={'#009F93'} />
    </div>
  )
}
