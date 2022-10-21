import axios from "axios";

export function getAllCows(){
    return async function (dispatch){
        let allCows = await axios.get('http://localhost:3001/')
        console.log('soy post.data',allCows.data)
        return dispatch({
          type: 'ALL_COWS',
          payload: allCows.data,
        })
    }
}
export function getSearchCows(search){
    return async function (dispatch){
        let searchCows = await axios.get(`http://localhost:3001/search?searchQuery=${search}`)
        return dispatch({
          type: 'SEARCH_COWS',
          payload: searchCows.data,
        })
    }
}
export function updateCows(body){
    return async function (dispatch){
         let allCowsUpdated=await axios.put(`http://localhost:3001/${body._id}`,body)
        
        return dispatch({
          type: 'UPDATE_COW',
          payload: allCowsUpdated.data,
          
        })
    }
}
export function createCow(body){
    return async function (dispatch){
         const newCow=await axios.post('http://localhost:3001/',body)
         
        
        return dispatch({
          type: 'CREATE_COW',
          payload: newCow.data,
        })
    }
}
export function deleteCow(id){
    return async function (dispatch){
         let allCows=await axios.delete(`http://localhost:3001/${id}`)
        console.log(allCows,"delete")
        return dispatch({
          type: 'DELETE_COW',
          payload: allCows.data,
          idDelete:id

        })
    }
}
export function resetSearch(){
    return  function (dispatch){
        return dispatch({
          type: 'RESET_SEARCH_COW',
        })
    }
}