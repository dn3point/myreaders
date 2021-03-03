import { Box, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

const NoMatchPage = () => {
  return (
    <Box display='flex' justifyContent='center'>
      <Typography gutterBottom variant='h5' component='h2' align='center'>
        404 Page Not Found <Link to='/'>Home</Link>
      </Typography>
    </Box>
  )
}

export default NoMatchPage
