import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Link } from 'react-router-dom';
import './newscard.css'

// the cards used to link around the website
export default function Cards({ image, title, link }) {
  return (
    <Card sx={{ minWidth: 150,flexShrink: 1,maxWidth:345,flex:1,transition: 'all 0.3s ease' }} className='card'>
      <Link className="link" to={link} >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={image ? image : "/VictoryLogo.png"}
          alt={title}
        />
        <CardContent>
          <Typography className="typography" gutterBottom variant="h5" component="div" style={{ fontFamily: 'Arial, sans-serif' }}>
        {title}
          </Typography>
        </CardContent>  
      </CardActionArea>
      </Link>
    </Card>
  );
}