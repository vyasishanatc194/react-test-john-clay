import axios from 'axios'
import {APP_CONFIG} from '../constants/config'

export function getContacts(params) {
    
    try {
      return axios.get(APP_CONFIG.API_URL, {
        headers:{
          'Content-Type': 'application/json',
          'authorization': 'Bearer '+APP_CONFIG.AUTHORIZATION_TOKEN,
        },
        params: params
    }).then(response => {
            return response.data;
        }).catch(error => {
           
        });
    } catch (err) { console.log('Err::: ', err); return err }
}