import _ from 'lodash';
import { 
    CREATE_STREAM,
    FETCH_STREAM,
    FETCH_STREAMS,
    DELETE_STREAM,
    EDIT_STREAM
 } from '../actions/types'
 
const streamReducers = (state={}, action) => {
    switch (action.type) {
        case FETCH_STREAMS://the lodash function mapKeys takes an arr and return an obj
            return { ...state, ..._.mapKeys( action.payload, 'id')}

        case FETCH_STREAM:
            return { ...state, [action.payload.id]: action.payload }

        case CREATE_STREAM:
            return { ...state, [action.payload.id]: action.payload }
            
        case EDIT_STREAM:
            return { ...state, [action.payload.id]: action.payload }

        case DELETE_STREAM: //here the payload is the id it self
            return _.omit(state, action.payload)

        default:
             return state
     }
 }

 export default streamReducers