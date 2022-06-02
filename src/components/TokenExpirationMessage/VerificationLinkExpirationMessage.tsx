/* eslint-disable */
import React from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import Grid from '@mui/material/Grid';
import clsx from 'clsx';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    anchor: {
      color: '#DA4453',
      '&:hover': {
        color: '#ED5565',
      },
    },
    root: {
      // flexGrow: 1,
      margin: 0,
      padding: 0,
      // backgroundImage: `url(${backgroundImage})`,
      // backgroundRepeat: 'no-repeat',
      // backgroundSize: 'cover',
      height: '100vh',
    },
    paper: {
      display: 'flex',
      padding: theme.spacing(0),
      textAlign: 'center',
      boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.6)',
      justifyContent: 'center',
      // width: '50%',
      // height: '75%',
      '&:MuiPaper-rounded': {
        borderRadius: '0.6875rem',
      },
    },
    grid: {
      // position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      top: '0.3125rem',
      padding: '80px 160px 60px 160px',
      width: '100%',
      left: 0,
      right: 0,
      bottom: 0,
    },

    warningIcon: {
      color: '#DA4453',
      fontWeight: 'lighter',
      fontFamily: 'Poppins',
      fontSize: '7rem',
      '@media only screen and (max-width: 575px)': {
        fontSize: '3rem',
      },
      '@media only screen and (max-width: 768px)': {
        fontSize: '3rem',
      },
    },

    forgotButton: {
      outline: 'none',
      borderWidth: '0px',
      backgroundColor: 'transparent',
      color: '#DA4453',
      '&:focus': {
        outline: 'none',
      },
    },

    container: {
      // display: 'flex',
    },
    paper2: {
      //   marginTop: 24,
      marginLeft: 30,
      marginRight: 30,
      boxShadow: 'none',
    },

    margin: {
      margin: theme.spacing(1),
      outline: 'none',
      backgroundColor: '#ED5565',
      borderRadius: 3,
      boxShadow: '0px 2px 4px #F4433624',
      display: 'flex',
      justifyContent: 'flexEnd',
      '&:hover': {
        backgroundColor: '#E25152',
      },
      '&:focus': {
        outline: 'none',
      },
    },
    closeButton: {
      display: 'flex',
      justifyContent: 'flex-end',
      textAlign: 'end',
    },
    paperModal: {
      backgroundColor: theme.palette.background.paper,
      border: 'none !important',
      height: '345px',
      outline: 'none',
      borderRadius: 6,
      boxShadow: theme.shadows[5],
      padding: '0px 0px 0px',
      // padding: theme.spacing(1, 4, 30),
    },
    backDrop: {
      background: 'rgba(0,0,0,0.2)',
    },
    headingText: {
      display: 'flex',
      textAlign: 'center',
      justifyContent: 'center',
      color: '#333333',
      fontWeight: 'bold',
      fontSize: 24,
      padding: '30px 10px 2px 10px',
      fontFamily: 'Poppins',
    },
    alert: {
      backgroundColor: 'none',
      color: '#333333',
      display: 'flex',
      justifyContent: 'center',
      textAlign: 'center',
      fontFamily: 'Poppins',
      fontSize: 15,
      borderRadius: 6,
      padding: '1px 200px',
      // border:'1px solid #707070'
    },

    subText: {
      fontSize: 15,
      color: '#ED5565',
      fontFamily: 'Poppins',
      fontWeight: 'bolder',
      paddingTop: 13,
      justifyContent: 'center',
      textAlign: 'center',
    },
    buttonMain: {
      display: 'flex',
      justifyContent: 'center',
      paddingTop: '1em',
      paddingBottom: '3em',
    },
    buttonMainfree: {
      display: 'flex',
      justifyContent: 'center',
      paddingTop: '1em',
      paddingBottom: '3em',
    },

    cardsWrapper: {
      display: 'flex',
      justifyContent: 'center',
    },
    hide: {
      display: 'none',
    },
    button: {
      margin: '40px 5px 10px 5px',
      border: '1px solid #f50057',
      borderRadius: 20,
      fontWeight: 600,
      backgroundColor: 'none',
      outline: 'none',
      '&:focus': {
        outline: 'none',
        backgroundColor: 'none',
      },
      '&:hover': {
        backgroundColor: 'none',
      },
      '&:selected': {
        outline: 'none',
      },
      '&.MuiButton-root': {
        minWidth: '115px',
      },
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&.MuiBackdrop-root': {
        backgroundColor: 'rgba(0,0,0,0.2) !important',
      },
    },
    UpgradeMessageWrapper: {
      padding: '1.5rem',
      margin: '1em 0 2em',
      // marginRight: '3rem',
      backgroundColor: '#ff00001f',
      color: '#3e3e3e',
      textAlign: 'center',
      borderRadius: 5,
      fontSize: '1.2em',
      // fontWeight: 600,
      display: 'flex',
      justifyContent: 'center',
    },
    supporLink: {
      textDecoration: 'underline',
      color: '#D75B53',
      paddingLeft: '8px',
      '&:hover': {
        color: '#D75B53',
        textDecoration: 'underline',
      },
    },
    signInLink: {
      textDecoration: 'none',
      color: '#DA4453',
      fontWeight: 'bold',
      '&:hover': {
        color: '#DA4453',
        textDecoration: 'none',
      },
      // paddingLeft:'8px',
    },
  })
);

const VerificationLinkExpirationMessage = () => {
  const classes = useStyles();
  return (
    <Modal
      className={classes.modal}
      open={true}
      // onClose={() => handleClose()}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        classes: {
          root: classes.backDrop,
        },
      }}
    >
      <Fade in={true}>
        <div className={classes.paperModal}>
          {/* <div className={classes.closeButton}>
            <IconButton
              aria-label="close"
              className={classes.margin}
              size="small"
              // onClick={() => handleClose()}
            >
              <CloseIcon fontSize="inherit" style={{ color: '#ffffff' }} />
            </IconButton>
          </div> */}
          <div className={classes.headingText}>Link has expired</div>
          <div className={classes.cardsWrapper}>
            <div
              className={clsx(
                classes.root
                // String(userPackage) !== 'FREE' ? classes.hide : ''
              )}
            >
              <div className={classes.container}>
                <Paper elevation={4} className={classes.paper2}>
                  <Grid container className={classes.UpgradeMessageWrapper}>
                    <div>
                      The verification link you have followed is already used or
                      expired.
                      <br />
                      please
                      <a href="signin" className={classes.signInLink}>
                        {' '}
                        sign in{' '}
                      </a>
                      or
                      <a href="forgotpassword" className={classes.signInLink}>
                        {' '}
                        reset{' '}
                      </a>
                      your credentials again
                    </div>
                  </Grid>
                </Paper>
              </div>
              <div className={classes.alert}>
                Need help ? Contact our{' '}
                <a
                  href="mailto:support@meetrix.io"
                  className={classes.supporLink}
                >
                  {' '}
                  support team{' '}
                </a>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};
export default VerificationLinkExpirationMessage;
