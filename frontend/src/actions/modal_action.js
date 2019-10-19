export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

/*
  modal is an object as follows: 
  {
    type:, 
    ...otherProps
  }
*/ 
export const openModal = modalData => ({
  type: OPEN_MODAL,
  modalData
})

export const closeModal = () => ({
  type: CLOSE_MODAL
})