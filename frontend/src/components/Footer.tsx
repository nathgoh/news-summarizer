import Box from '@mui/material/Box'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import Link from '@mui/material/Link'

import "../styles/Footer.css"

const IconLinks = () => {
    return (
        <>
            <Link className="link" color="#eeeeee"  href="https://github.com/nathgoh">
            <GitHubIcon fontSize="medium" />
            </Link>
            <Link className="link" color="#eeeeee" href="https://linkedin.com/in/nathgoh">
                <LinkedInIcon fontSize="medium" />
            </Link>
        </>
    );
  }

const Footer = () => {
    return(
        <Box
            id="footer-container" 
            sx={{
                textAlign: "center",
                position: "fixed", 
                left: 0, 
                bottom: 0, 
                right: 0,
                width: "100%",
                backgroundColor: "#1a1a1a",
                paddingTop: 1,
            }}
        >
            <Box sx={{p:0.5}}>
                <IconLinks />
            </Box>
        </Box>
    )
}

export default Footer