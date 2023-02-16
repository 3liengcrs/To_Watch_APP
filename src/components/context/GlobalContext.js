import {React , createContext , useReducer, useEffect, useContext}  from 'react'
import { reducer } from './reducer'


// const initialState = {
//   watchlist: [],
//   watched: [],
// };

const initialState = {
    watchlist : localStorage.getItem("watchlist") ? 
                JSON.parse(localStorage.getItem("watchlist")) : [] ,
    watched : localStorage.getItem("watched") ?
              JSON.parse(localStorage.getItem("watched")) : []
};

export const GlobalContext = createContext(initialState)


const GlobalProvider = (props) => {
    const [state , dispatch ] = useReducer(reducer , initialState)


    useEffect(()=>{
      localStorage.setItem('watchlist' , JSON.stringify(state.watchlist))
      localStorage.setItem('watched' , JSON.stringify(state.watched))
    } , [state])



  return (
    <GlobalContext.Provider value={{watchlist : state.watchlist , watched : state.watched , MoviesDispatch : dispatch }}>
      {props.children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider;
export const useMovieContext = () => {
  return useContext(GlobalContext)
};