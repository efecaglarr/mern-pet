import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  hero: {
    position: 'relative', // Relative positioning for text overlay
    width: '100%',
    height: '90vh',
    marginBottom: '20px'
  },
  hero__image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover', // Ensure the image covers the entire container
    
  },
  textOverlay: {
    position: 'absolute', // Absolute positioning for overlay
    top: '65%', // Position the text at the top 20% of the image
    left: '5%', // Slight left margin for alignment
    zIndex: 1, // Ensure the text is above the image
    color: '#fff', // White text color
    background: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for readability
    padding: '10px', // Padding around the text
    borderRadius: '5px', // Optional: rounded corners
  },
  hero__title: {
    fontSize: '45px',
    fontWeight: 800,
  },
  hero__subtitle: {
    fontSize: '27px',
    fontWeight: 300,
  },
}));
