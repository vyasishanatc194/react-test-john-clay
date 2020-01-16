import * as types from '../actions/contactActions';

export const openModal = () => ({
  type: types.OPEN_MODAL
});

export const closeModal = () => ({
  type: types.CLOSE_MODAL
});
export const setContact = (contact) => ({
  type: types.GET_CONTACT,
  payload : contact
});