import GitHubIcon from '@mui/icons-material/GitHub'
import LaunchIcon from '@mui/icons-material/Launch'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from '@mui/material'

interface ProjectProps {
  title: string
  description: string
  tech: string[]
  liveUrl?: string
  repoUrl: string
  image?: string
}

export const ProjectCard = ({
  title,
  description,
  tech,
  liveUrl,
  repoUrl,
  image = 'https://via.placeholder.com/600x400?text=No+Image',
}: ProjectProps) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'grey.900', // Использование палитры MUI
        border: '1px solid',
        borderColor: 'grey.800',
        borderRadius: 3,
        transition: 'all 0.3s ease-in-out',
        overflow: 'hidden',
        '&:hover': {
          borderColor: 'primary.main',
          transform: 'translateY(-8px)',
          boxShadow:
            '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(56, 189, 248, 0.2)',
          '& img': {
            transform: 'scale(1.05)',
          },
        },
      }}>
      {/* Контейнер для изображения */}
      <Box sx={{overflow: 'hidden', height: 200, position: 'relative'}}>
        <CardMedia
          component='img'
          image={image}
          alt={`Скриншот проекта ${title}`}
          sx={{
            height: '100%',
            width: '100%', // Добавлено
            objectFit: 'cover', // Гарантирует, что фото заполнит 200px без искажений
            transition: 'transform 0.3s ease-in-out',
          }}
          loading='lazy'
        />
      </Box>

      {/* Контентная часть */}
      <CardContent
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          p: 3,
          gap: 2,
        }}>
        <Typography
          variant='h5'
          component='h3'
          sx={{
            fontWeight: 600,
            color: 'grey.100',
            transition: 'color 0.3s',
            '.MuiCard-root:hover &': {color: 'primary.main'},
          }}>
          {title}
        </Typography>

        <Typography
          variant='body2'
          sx={{
            color: 'grey.400',
            lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            flexGrow: 1,
          }}>
          {description}
        </Typography>

        {/* Технологии */}
        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 1, pt: 1}}>
          {tech.map((t) => (
            <Chip
              key={t}
              label={t}
              size='small'
              variant='outlined'
              sx={{
                fontSize: '0.7rem',
                color: 'grey.300',
                borderColor: 'grey.700',
                bgcolor: 'grey.800',
              }}
            />
          ))}
        </Box>

        {/* Ссылки */}
        <Stack
          direction='row'
          spacing={2}
          sx={{
            pt: 2,
            mt: 'auto',
            borderTop: '1px solid',
            borderColor: 'grey.800',
          }}>
          {liveUrl && (
            <Button
              href={liveUrl}
              target='_blank'
              rel='noopener noreferrer'
              size='small'
              variant='text'
              endIcon={<LaunchIcon sx={{fontSize: 14}} />}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                color: 'primary.main',
                '&:hover': {color: 'primary.light'},
              }}>
              Live Demo
            </Button>
          )}
          <Button
            href={repoUrl}
            target='_blank'
            rel='noopener noreferrer'
            size='small'
            variant='text'
            startIcon={<GitHubIcon sx={{fontSize: 14}} />}
            sx={{
              textTransform: 'none',
              color: 'grey.400',
              '&:hover': {color: 'grey.100'},
            }}>
            Code
          </Button>
        </Stack>
      </CardContent>
    </Card>
  )
}
