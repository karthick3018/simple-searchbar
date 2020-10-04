import React,{useState,useEffect} from 'react';
console.log('hihu')

const LazyRender = () => {
  const [state,setState] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setState(true)
    }, 5000)
  }, [])

  const renderFn = () => {
    return(
      <p>Lazy load here</p>
    )
  }
   
  return (
    // state && renderFn()
    state && <p>{state.value.valu}</p>
  )
}

export default LazyRender;