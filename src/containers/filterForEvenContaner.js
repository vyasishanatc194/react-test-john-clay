import { createSelector } from 'reselect'
Object.filter = (obj, predicate) => 
    Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          // eslint-disable-next-line no-sequences
          .reduce( (res, key) => (res[key] = obj[key], res), {} );

const getBar = (state, props) => {
    let contactsList = props.contactsList
    let onlyEven = props.onlyEven
    let barById
    if(onlyEven){
        
        barById = Object.filter(contactsList, score => score.id%2 === 0);
    }else{
        barById = contactsList;
    }
    return barById
}

export const makeGetBarState = () => createSelector(
  getBar,
  (contacts) => ({contacts})
)