import React from 'react'
import { useState } from 'react';
const usefetch = (cb) => {


        const[data,setData] = useState(undefined)
    const[loading,setLoading]= useState(null);
    const[error,seterror]=useState(null);
    const fn = async(...args)=>{
        setLoading(true);
        seterror(null)
    
    try{
        const response = await cb(...args);
        setData(response);
        seterror(null);

    }
    catch(error){
        seterror(error);
    }

finally {
    setLoading(false);
}}
return {data,loading,error,fn}

}
export default usefetch;
