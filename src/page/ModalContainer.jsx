import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { details } from '../assets/details';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '70%', sm: '80%', md: '700px', lg: '800px' },
  bgcolor: 'background.paper',
  border: '2px solid rgba(150, 150, 150, 0.277)',
  borderRadius: '3px',
  boxShadow: 24,
  p: 4,
  overflow: 'visible'
};

const typographyStyle = {
  mt: { sm: 0, md: 2 },
  fontSize: { sx: '4px', sm: '15px', md: '20px' }
};

const ModalContainer = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={modalStyle}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{
            fontSize: { sx: '15px', sm: '30px', md: '40px' },
            fontWeight: 'bold'
          }}>
          Details
        </Typography>
        {details.map((detail, index) => (
          <Typography id="modal-modal-description" sx={typographyStyle} key={`detail-${index}`}>
            {detail}
          </Typography>
        ))}
      </Box>
    </Modal>
  );
};

export default ModalContainer;
