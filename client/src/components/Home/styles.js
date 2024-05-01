import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    display: 'flex',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  gridPosts: {
    alignContent: 'center',
    display: 'flex',
    marginTop: '1rem',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  searchButton: {
    marginTop: '0.5rem',
    marginLeft: '0.5rem',
    marginBottom: '1rem',
    width: '100px',
    height: '40px',
    borderRadius: '4px',
    backgroundColor: '#000000',
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: '16px',
    '&:hover': {
      backgroundColor: '#ffffff',
      color: '#000000',
    },  
  },
}));