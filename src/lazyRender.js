import React,{useState,useEffect} from 'react';
console.log('hihu')

const LazyRender = () => {
  const [state,setState] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      throw new Error('I crashed!');
    }, 5000)
  }, [])

  const renderFn = () => {
    return(
      <p>Lazy load here</p>
    )
  }
   
  return (
    renderFn()
  )
}

export default LazyRender;