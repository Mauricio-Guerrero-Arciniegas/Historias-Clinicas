import {configureStore} from '@reduxjs/toolkit';
import isLoading from './slices/isLoading.slice';
import histories from './slices/histories.slice';


export default configureStore({

     reducer: {
        isLoading,
        histories,
        
     }

    })