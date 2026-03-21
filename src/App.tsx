import {
  AppBar,
  Box,
  Button,
  Chip,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  Stack,
  TextField,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material'
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  type HTMLMotionProps,
} from 'framer-motion'
import React, {useRef, useState, type ChangeEvent} from 'react'
import {ProjectCard} from './components/ProjectCard/ProjectCard'
import {developerProfile, projects, techStack} from './data/data'

// 1. ТЕМА
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {main: '#38bdf8'},
    background: {default: '#030712', paper: '#111827'},
    divider: 'rgba(255, 255, 255, 0.1)',
  },
  typography: {fontFamily: '"Inter", "Roboto", sans-serif'},
})

// 2. АНИМИРОВАННАЯ СЕКЦИЯ
interface AnimatedSectionProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  sx?: any
}

const AnimatedSection = React.forwardRef<HTMLDivElement, AnimatedSectionProps>(
  ({children, sx, ...props}, ref) => (
    <Box
      ref={ref}
      component={motion.div}
      initial={{opacity: 0, y: 30}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.1}}
      transition={{duration: 0.7, ease: 'easeOut'}}
      sx={{...sx}}
      {...props}>
      {children}
    </Box>
  ),
)

export const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  })

  const homeRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const techRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  const isAboutActive = useInView(aboutRef, {amount: 0.5})
  const isTechActive = useInView(techRef, {amount: 0.5})
  const isProjectsActive = useInView(projectsRef, {amount: 0.3})
  const isContactActive = useInView(contactRef, {amount: 0.3})
  const isHomeActive = useInView(homeRef, {amount: 0.5})

  const {scrollY, scrollYProgress} = useScroll()
  const navBg = useTransform(
    scrollY,
    [0, 100],
    ['rgba(3, 7, 18, 0)', 'rgba(3, 7, 18, 0.9)'],
  )

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({behavior: 'smooth', block: 'start'})
  }

  const getBtnStyle = (isActive: boolean) => ({
    textTransform: 'none' as const,
    color: isActive ? '#38bdf8' : 'text.secondary',
    borderColor: isActive ? '#38bdf8' : 'rgba(56, 189, 248, 0.2)',
    transition: 'all 0.4s ease',
    fontWeight: isActive ? 700 : 400,
    borderRadius: '8px',
    px: {xs: 2, md: 2.5},
    minWidth: 'fit-content', // Важно для скролла: кнопка не сжимается
    boxShadow: isActive ? '0 0 15px rgba(56, 189, 248, 0.3)' : 'none',
    '&:hover': {
      borderColor: '#38bdf8',
      color: '#38bdf8',
      backgroundColor: 'rgba(56, 189, 248, 0.1)',
    },
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    let finalValue = value
    if (name === 'phone') {
      const onlyNums = String(value).replace(/[^0-9]/g, '')
      finalValue = onlyNums.slice(0, 11)
    }
    setFormData((prev) => ({...prev, [name]: finalValue}))
  }

  const handleFormReset = () => {
    setFormData({name: '', phone: '', email: '', message: ''})
  }

  const getWhatsAppLink = () => {
    const phone = '77472037826'
    const text = `Имя: ${formData.name}%0AТелефон: ${formData.phone}%0AСообщение: ${formData.message}`
    return `https://wa.me/${phone}?text=${text}`
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <motion.div
        style={{
          scaleX: scrollYProgress,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: '#38bdf8',
          zIndex: 3000,
          transformOrigin: '0%',
        }}
      />

      <AppBar
        position='fixed'
        elevation={0}
        style={{
          backgroundColor: navBg,
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        } as any}
        sx={{height: '70px', justifyContent: 'center'}}>
        <Container maxWidth='lg'>
          <Toolbar sx={{justifyContent: 'space-between', px: '0 !important'}}>
            <Button
              onClick={() => scrollToSection(homeRef)}
              variant='outlined'
              sx={getBtnStyle(isHomeActive)}>
              Начало
            </Button>

            {/* КОНТЕЙНЕР СО СКРОЛЛОМ ДЛЯ МЕНЮ */}
            <Stack 
              direction='row' 
              spacing={1} 
              sx={{ 
                overflowX: 'auto', 
                whiteSpace: 'nowrap',
                maxWidth: {xs: '75%', md: 'auto'},
                py: 1,
                /* Скрываем скроллбар для чистоты */
                '&::-webkit-scrollbar': { display: 'none' },
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
              }}
            >
              <Button onClick={() => scrollToSection(aboutRef)} variant='outlined' sx={getBtnStyle(isAboutActive && !isTechActive)}>Обо мне</Button>
              <Button onClick={() => scrollToSection(techRef)} variant='outlined' sx={getBtnStyle(isTechActive && !isProjectsActive)}>Стек</Button>
              <Button onClick={() => scrollToSection(projectsRef)} variant='outlined' sx={getBtnStyle(isProjectsActive && !isContactActive)}>Проекты</Button>
              <Button onClick={() => scrollToSection(contactRef)} variant='outlined' sx={getBtnStyle(isContactActive)}>Контакты</Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Box sx={{pt: '70px'}}>
        <Container maxWidth='lg'>
          
          {/* HERO SECTION */}
          <AnimatedSection
            ref={homeRef}
            sx={{
              minHeight: 'calc(100vh - 70px)',
              display: 'flex',
              alignItems: 'center',
              py: {xs: 4, md: 0},
            }}>
            <Grid container spacing={4} alignItems='center' justifyContent='center'>
              <Grid size={{xs: 12, md: 7}} order={{xs: 2, md: 1}} sx={{textAlign: {xs: 'center', md: 'left'}}}>
                <Typography variant='h1' sx={{ fontWeight: 900, fontSize: {xs: '2.5rem', md: '5rem'}, mb: 2 }}>
                  Hi, I'm <Box component='span' sx={{color: 'primary.main'}}>{developerProfile.name}</Box>
                </Typography>
                <Typography variant='h4' color='text.secondary' sx={{ mb: 4, fontSize: {xs: '1.2rem', md: '2rem'} }}>
                  {developerProfile.title}
                </Typography>
                <Button variant='outlined' size='large' onClick={() => scrollToSection(projectsRef)} sx={{ ...getBtnStyle(true), py: 2, px: 4 }}>
                  Посмотреть проекты
                </Button>
              </Grid>

              <Grid size={{xs: 12, md: 5}} order={{xs: 1, md: 2}} sx={{display: 'flex', justifyContent: 'center'}}>
                <Box sx={{
                  width: {xs: '260px', md: '400px'},
                  height: {xs: '320px', md: '500px'},
                  borderRadius: '20px',
                  border: '2px solid rgba(56, 189, 248, 0.4)',
                  overflow: 'hidden'
                }}>
                  <Box component='img' src={'https://i.ibb.co.com/tTCK8nGF/unnamed.jpg'} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Box>
              </Grid>
            </Grid>
          </AnimatedSection>

          {/* TECH STACK С ВНУТРЕННИМ СКРОЛЛОМ КАРТОЧЕК ПРИ НЕОБХОДИМОСТИ */}
          <AnimatedSection ref={techRef} sx={{ py: {xs: 8, md: 15} }}>
            <Typography variant='h3' sx={{mb: 6, fontWeight: 700, fontSize: {xs: '2rem', md: '3rem'}}}>Мой Стек</Typography>
            <Grid container spacing={3}>
              {techStack.map((cat, i) => (
                <Grid size={{xs: 12, sm: 6, md: 4}} key={i}>
                  <Box sx={{
                    p: 3,
                    bgcolor: 'background.paper',
                    borderRadius: '20px',
                    height: '100%',
                    border: '1px solid rgba(255,255,255,0.05)',
                    /* Если технологий очень много в одной категории */
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <Typography variant='h5' sx={{mb: 2, fontWeight: 700, color: 'primary.main'}}>{cat.category}</Typography>
                    <Box sx={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', // На мобилках они будут переноситься
                      gap: 1 
                    }}>
                      {cat.technologies.map((t) => (
                        <Chip key={t} label={t} variant='outlined' size="small" sx={{borderRadius: '8px'}} />
                      ))}
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </AnimatedSection>

          {/* PROJECTS */}
          <AnimatedSection ref={projectsRef} sx={{ py: {xs: 8, md: 15} }}>
            <Typography variant='h3' sx={{mb: 6, fontWeight: 700, fontSize: {xs: '2rem', md: '3rem'}}}>Проекты</Typography>
            <Grid container spacing={3}>
              {projects.map((p, i) => (
                <Grid size={{xs: 12, sm: 6}} key={i}>
                  <ProjectCard {...p} />
                </Grid>
              ))}
            </Grid>
          </AnimatedSection>

          {/* CONTACT FORM */}
          <AnimatedSection ref={contactRef} sx={{ py: {xs: 8, md: 20} }}>
            <Container maxWidth='md' sx={{ px: {xs: 1, sm: 2} }}>
              <Box sx={{
                p: {xs: 3, md: 6},
                bgcolor: 'background.paper',
                borderRadius: '24px',
                border: '1px solid #38bdf8',
              }}>
                <Typography variant='h2' sx={{ mb: 4, fontWeight: 800, color: 'primary.main', fontSize: {xs: '1.8rem', md: '3rem'} }}>
                  Let's talk!
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{xs: 12, md: 6}}><TextField fullWidth label='Имя' name='name' value={formData.name} onChange={handleChange} variant='outlined' /></Grid>
                  <Grid size={{xs: 12, md: 6}}><TextField fullWidth label='Телефон' name='phone' value={formData.phone} onChange={handleChange} variant='outlined' /></Grid>
                  <Grid size={{xs: 12}}><TextField fullWidth label='Сообщение' name='message' value={formData.message} onChange={handleChange} multiline rows={4} variant='outlined' /></Grid>
                  <Grid size={12}>
                    <Button 
                      fullWidth 
                      variant='outlined' 
                      href={getWhatsAppLink()} 
                      target='_blank'
                      disabled={!formData.name || formData.phone.length < 11}
                      sx={{ py: 2, borderColor: '#25D366', color: '#25D366', fontWeight: 'bold' }}
                    >
                      WhatsApp
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Container>
          </AnimatedSection>

        </Container>
      </Box>
    </ThemeProvider>
  )
}