import React from 'react'

const TextMessages = ({list}) => {
  return (
    <div style={{
        position: 'absolute',
        right: '30px',
        bottom: '80px',
    }}>
        {
            list?.map((message, index)=>{
                return <div key={index}>
                        {message}
                    </div>
                
            })
        }
    </div>
  )
}

export default TextMessages