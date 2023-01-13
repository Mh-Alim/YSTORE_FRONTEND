import axios from "axios"
import { ALL_PRODUCT_FAIL,ALL_PRODUCT_SUCCESS,ALL_PRODUCT_REQUEST, CLEAR_ERRORS, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, NEW_REVIEW_FAIL, ADMIN_PRODUCT_REQUEST, ADMIN_PRODUCT_SUCCESS, ADMIN_PRODUCT_FAIL, NEW_PRODUCT_REQUEST, NEW_PRODUCT_FAIL, NEW_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, DELETE_REVIEW_FAIL, ALL_REVIEW_REQUEST, ALL_REVIEW_SUCCESS, ALL_REVIEW_FAIL } from "../constants/productConstants";

export const getProducts = (keyword = "",currentPage = 1,price = [0,25000],category,ratings = 0)=>{
    return async (dispatch)=>{
        try{
            dispatch({
                type : ALL_PRODUCT_REQUEST,
            })
            let link ;
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
            if(category) link =  `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
            const {data} = await axios.get(link);
            console.log(data);
            dispatch({
                type: ALL_PRODUCT_SUCCESS,
                payload : data,
            });

        }
        catch(error){
            console.log(error);
            dispatch({
                type : ALL_PRODUCT_FAIL,
                payload : error.response.data.message
            })
        }

    }
}

// ALL PRODUCTS -- ADMIN
export const getAdminProducts = ()=>{
    return async (dispatch)=>{
        try{
            dispatch({
                type : ADMIN_PRODUCT_REQUEST,
            })
           
            const {data} = await axios.get("/api/v1/admin/products")
            console.log(data);
            dispatch({
                type: ADMIN_PRODUCT_SUCCESS,
                payload : data,
            });

        }
        catch(error){
            console.log(error);
            dispatch({
                type : ADMIN_PRODUCT_FAIL,
                payload : error.response.data.message
            })
        }

    }
}


// clearing errors
export const clearErrors = ()=>{
    
    console.log("clear Errors");
    return (dispatch)=>{
        dispatch({
            type : CLEAR_ERRORS
        })
    }

    
}

// check this is working or not

// export const clearErrorCheck = ()=>{
//     return {
//         type : CLEAR_ERRORS,
//     }
// }


// get single product
export const getProductDetails = (id)=>{
    return async (dispatch)=>{
        try{
            dispatch({
                type : PRODUCT_DETAILS_REQUEST,
            })
            const {data} = await axios.get(`/api/v1/product/${id}`);
            dispatch({
                type: PRODUCT_DETAILS_SUCCESS,
                payload : data.product,
            });

        }
        catch(error){
            console.log(error);
            dispatch({
                type : PRODUCT_DETAILS_FAIL,
                payload : error.response.data.message
            })
        }

    }
}



// CREATE PRODUCT
export const createProduct = (productData)=>{
    return async (dispatch)=>{
        try{
            dispatch({
                type : NEW_PRODUCT_REQUEST,
            })

            const config = {
                headers : {
                    "Content-Type" : "multipart/form-data",
                }
            }
            const {data} = await axios.post(`/api/v1/admin/product/new`,productData,config);
            dispatch({
                type:  NEW_PRODUCT_SUCCESS,
                payload : data,
            });

        }
        catch(error){
            console.log(error);
            dispatch({
                type : NEW_PRODUCT_FAIL,
                payload : error.response.data.message
            })
        }

    }
}

// DELETE PRODUCT 

export const deleteProduct = (id)=>async(dispatch)=>{

    try{
        console.log(id);
        dispatch({type : DELETE_PRODUCT_REQUEST});
        const {data} = await axios.delete(`/api/v1/admin/product/${id}`);
        console.log(data);
        dispatch({
            type : DELETE_PRODUCT_SUCCESS,
            payload : data.success
        })
    }
    catch(error){
        dispatch({type: DELETE_PRODUCT_FAIL,error : error.response.data.message})
    }
}


// UPDATE PRODUCT ACTION

export const updateProduct = (id,proudctData)=>async(dispatch)=>{

    try{
        console.log(id);
        dispatch({type : UPDATE_PRODUCT_REQUEST});

        const config = {
            headers : {
                "Content-Type": "multipart/form-data",
            }
        }
        const {data} = await axios.put(`/api/v1/admin/product/${id}`,proudctData,config);

        console.log(data);
        dispatch({
            type : UPDATE_PRODUCT_SUCCESS,
            payload : data.success
        })
    }
    catch(error){
        dispatch({type: UPDATE_PRODUCT_FAIL,error : error.response.data.message})
    }
}


// get single product
export const newReview = (reviewData)=>{
    return async (dispatch)=>{
        try{
            dispatch({
                type : NEW_REVIEW_REQUEST,
            })

            const config = {
                headers : {
                    "Content-Type" : "application/json"
                }
            }
            const {data} = await axios.put(`/api/v1/review`,reviewData,config);
            dispatch({
                type: NEW_REVIEW_SUCCESS,
                payload : data.success,
            });

        }
        catch(error){
            console.log(error);
            dispatch({
                type : NEW_REVIEW_FAIL,
                payload : error.response.data.message
            })
        }

    }
}



// Get All Reviews of a Product
export const getAllReviews = (id) => async (dispatch) => {
    try {
      dispatch({ type: ALL_REVIEW_REQUEST });
  
      const { data } = await axios.get(`/api/v1/reviews?id=${id}`);
  
      dispatch({
        type: ALL_REVIEW_SUCCESS,
        payload: data.reviews,
      });
    } catch (error) {
      dispatch({
        type: ALL_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  



// Delete Review of a Product
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_REVIEW_REQUEST });
    console.log(reviewId, productId)
      const { data } = await axios.delete(`/api/v1/reviews?id=${reviewId}&productId=${productId}`);
  
      dispatch({
        type: DELETE_REVIEW_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: DELETE_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }

}