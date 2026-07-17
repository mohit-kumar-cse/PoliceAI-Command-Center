// C:\PoliceAI-Command-Center\client\src\hooks\useFetch.js
import { useEffect, useState } from "react";
import API from "../services/api";


const useFetch = (url)=>{


    const [data,setData] = useState(null);

    const [loading,setLoading] = useState(true);

    const [error,setError] = useState(null);



    useEffect(()=>{


        const fetchData = async()=>{


            try{

                const response = await API.get(url);

                setData(response.data);


            }
            catch(err){

                setError(err.message);

            }
            finally{

                setLoading(false);

            }


        };


        fetchData();


    },[url]);



    return {
        data,
        loading,
        error
    };


}


export default useFetch;