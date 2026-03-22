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
import React, {useRef} from 'react'
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
      viewport={{once: true, amount: 0.2}}
      transition={{duration: 0.7, ease: 'easeOut'}}
      sx={{...sx}}
      {...props}>
      {children}
    </Box>
  ),
)

export const App = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  })

  // Обработчик изменений для текстовых полей
  // const handleInputChange = (
  //   e: React.ChangeEvent<HTMLInputElement | {name?: string; value: unknown}>,
  // ) => {
  //   const {name, value} = e.target
  //   setFormData((prev) => ({...prev, [name as string]: value}))
  // }

  // Функция формирования ссылки для WhatsApp
  const getWhatsAppLink = () => {
    // Если базовые данные не заполнены, возвращаем пустую строку или заглушку
    if (!formData.name || !formData.phone) return '#'

    const phone = '77472037826'
    const text =
      `Здравствуйте!%0A%0A` +
      `*Имя:* ${formData.name}%0A` +
      `*Телефон:* ${formData.phone}%0A` +
      `*Email:* ${formData.email || 'не указан'}%0A` +
      `*Сообщение:* ${formData.message}`

    return `https://wa.me/${phone}?text=${text}`
  }

  const homeRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const techRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  const isAboutActive = useInView(aboutRef, {amount: 0.7})
  const isTechActive = useInView(techRef, {amount: 0.7})
  const isProjectsActive = useInView(projectsRef, {amount: 0.5})
  const isContactActive = useInView(contactRef, {amount: 0.5})
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
    px: 2,
    boxShadow: isActive ? '0 0 15px rgba(56, 189, 248, 0.3)' : 'none',
    '&:hover': {
      borderColor: '#38bdf8',
      color: '#38bdf8',
      backgroundColor: 'rgba(56, 189, 248, 0.1)',
      boxShadow: '0 0 20px rgba(56, 189, 248, 0.4)',
    },
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | {name?: string; value: unknown}>,
  ) => {
    const {name, value} = e.target
    let finalValue = value

    // Логика маски для телефона
    if (name === 'phone') {
      // Оставляем только цифры
      const onlyNums = String(value).replace(/[^0-9]/g, '')

      // Ограничиваем длину (например, 11 цифр для 7XXXXXXXXXX)
      finalValue = onlyNums.slice(0, 11)
      // Если пользователь стер всё, не даем полю быть пустым, если хочешь сразу +7
      // Но лучше оставить просто цифры, а в WhatsApp ссылке мы их склеим
    }

    setFormData((prev) => ({...prev, [name as string]: finalValue}))
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
        style={
          {
            backgroundColor: navBg,
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
          } as any
        }
        sx={{height: '70px', justifyContent: 'center'}}>
        <Container maxWidth='lg'>
          <Toolbar sx={{justifyContent: 'space-between', px: '0 !important'}}>
            <Button
              onClick={() => scrollToSection(homeRef)}
              component={motion.button}
              whileTap={{scale: 0.95}}
              variant='outlined'
              sx={getBtnStyle(isHomeActive)}>
              Начало
            </Button>

            <Stack direction='row' spacing={1}>
              <Button
                onClick={() => scrollToSection(aboutRef)}
                variant='outlined'
                sx={getBtnStyle(isAboutActive && !isTechActive)}>
                Обо мне
              </Button>
              <Button
                onClick={() => scrollToSection(techRef)}
                variant='outlined'
                sx={getBtnStyle(isTechActive && !isProjectsActive)}>
                Стек
              </Button>
              <Button
                onClick={() => scrollToSection(projectsRef)}
                variant='outlined'
                sx={getBtnStyle(isProjectsActive && !isContactActive)}>
                Проекты
              </Button>
              <Button
                onClick={() => scrollToSection(contactRef)}
                variant='outlined'
                sx={getBtnStyle(isContactActive)}>
                Контакты
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Box sx={{pt: '70px'}}>
        <Container maxWidth='lg'>
          {/* HERO */}
          <AnimatedSection
            ref={homeRef}
            sx={{
              minHeight: 'calc(100vh - 70px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: {xs: 'center', md: 'left'},
              py: {xs: 5, md: 0},
              position: 'relative', // КРИТИЧНО для ::after
              '&::after': {
                content: '""', // Пустая строка для создания элемента
                position: 'absolute',
                bottom: 0, // Прижимаем к низу секции
                left: '50%', // Центрируем
                transform: 'translateX(-50%)', // Центрируем
                width: '80%', // Полоса будет не на весь экран
                height: '1px', // Тонкая полоса
                bgcolor: 'rgba(56, 189, 248, 0.2)', // Базовый цвет полосы
                boxShadow: `
        0 0 10px rgba(56, 189, 248, 0.4), // Основное свечение
        0 0 20px rgba(56, 189, 248, 0.2), // Рассеянное свечение
        0 0 30px rgba(56, 189, 248, 0.1)  // Фоновое свечение
      `,
              },
            }}>
            <Grid
              container
              spacing={6}
              alignItems='center'
              justifyContent='center'>
              <Grid size={{xs: 12, md: 7}} order={{xs: 2, md: 1}}>
                <Typography
                  variant='h1'
                  sx={{
                    fontWeight: 900,
                    fontSize: {xs: '3rem', sm: '4rem', md: '5rem'},
                    lineHeight: 1.1,
                    mb: 2,
                  }}>
                  Hi, I'm{' '}
                  <Box
                    component='span'
                    sx={{color: 'primary.main', display: 'inline-block'}}>
                    {developerProfile.name}
                  </Box>
                </Typography>

                <Typography
                  variant='h4'
                  color='text.secondary'
                  sx={{
                    mb: 6,
                    maxWidth: {xs: '100%', md: '650px'},
                    mx: {xs: 'auto', md: 0},
                    fontSize: {xs: '1.5rem', md: '2.125rem'},
                  }}>
                  {developerProfile.title}
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: {xs: 'center', md: 'flex-start'},
                    mt: 4,
                  }}>
                  <Button
                    variant='outlined'
                    size='large'
                    onClick={() => scrollToSection(projectsRef)}
                    component={motion.button}
                    whileHover={{y: -5}}
                    whileTap={{scale: 0.95}}
                    sx={{
                      ...getBtnStyle(true),
                      py: 2,
                      px: 6,
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                    }}>
                    Посмотреть проекты
                  </Button>
                </Box>
              </Grid>

              <Grid
                size={{xs: 12, md: 5}}
                order={{xs: 1, md: 2}}
                sx={{display: 'flex', justifyContent: 'center'}}>
                <Box
                  component={motion.div}
                  initial={{scale: 0.8, opacity: 0}}
                  animate={{scale: 1, opacity: 1}}
                  transition={{duration: 1, delay: 0.5, ease: 'easeOut'}}
                  sx={{
                    width: {xs: '280px', sm: '350px', md: '400px'},
                    height: {xs: '350px', sm: '440px', md: '500px'},
                    position: 'relative',
                    borderRadius: '20px',
                    border: '2px solid rgba(56, 189, 248, 0.4)',
                    boxShadow: '0 0 25px 0 rgba(56, 189, 248, 0.5)',
                    background:
                      'linear-gradient(135deg, rgba(56, 189, 248, 0.05) 0%, rgba(17, 24, 39, 0) 100%)',
                    transition: 'all 0.4s ease',
                    '&:hover': {
                      borderColor: 'primary.main',
                      boxShadow: '0 0 40px 5px rgba(56, 189, 248, 0.7)',
                    },
                  }}>
                  <Box
                    component='img'
                    src={'https://i.ibb.co.com/tTCK8nGF/unnamed.jpg'}
                    alt={developerProfile.name}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '18px',
                      filter: 'grayscale(30%)',
                      transition: '0.4s',
                      '&:hover': {
                        filter: 'grayscale(0%)',
                      },
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </AnimatedSection>

          {/* ABOUT */}
          <AnimatedSection
            ref={aboutRef}
            sx={{
              py: 20,
              minHeight: '80vh', // Секция займет почти весь экран
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              scrollMarginTop: '70px',
              position: 'relative', // КРИТИЧНО для ::after
              '&::after': {
                content: '""', // Пустая строка для создания элемента
                position: 'absolute',
                bottom: 0, // Прижимаем к низу секции
                left: '50%', // Центрируем
                transform: 'translateX(-50%)', // Центрируем
                width: '80%', // Полоса будет не на весь экран
                height: '1px', // Тонкая полоса
                bgcolor: 'rgba(56, 189, 248, 0.2)', // Базовый цвет полосы
                boxShadow: `
        0 0 10px rgba(56, 189, 248, 0.4), // Основное свечение
        0 0 20px rgba(56, 189, 248, 0.2), // Рассеянное свечение
        0 0 30px rgba(56, 189, 248, 0.1)  // Фоновое свечение
      `,
              },
            }}>
            <Typography variant='h3' sx={{mb: 4, fontWeight: 700}}>
              Немного о себе
            </Typography>
            <Typography
              variant='body1'
              sx={{
                fontSize: '1.2rem',
                lineHeight: 1.8,
                color: 'text.secondary',
                maxWidth: '900px',
              }}>
              <Typography
                variant='body1'
                sx={{color: 'grey.300', mb: 3, lineHeight: 1.8}}>
                Мой бэкграунд в точных науках позволяет мне писать чистый,
                предсказуемый код на TypeScript и строить логику приложений,
                которая работает как часы.{' '}
              </Typography>
              <Typography
                variant='body1'
                sx={{color: 'grey.300', mb: 3, lineHeight: 1.8}}>
                Я специализируюсь на React 19, используя мощь Zustand для
                управления состоянием и MUI v6 для создания современных
                UI-систем.
              </Typography>
              <Typography
                variant='body1'
                sx={{color: 'grey.300', mb: 3, lineHeight: 1.8}}>
                От интерактивных 3D-фонов на Three.js до выверенных до пикселя
                неоновых разделителей — я создаю продукты с эффектом погружения.
              </Typography>
              <Typography
                variant='body1'
                sx={{color: 'grey.300', mb: 3, lineHeight: 1.8}}>
                Моя цель — превращать сложные идеи в работающие цифровые
                продукты, которыми приятно пользоваться.
              </Typography>
              {/* {developerProfile.about} */}
            </Typography>
          </AnimatedSection>

          {/* TECH STACK */}
          <AnimatedSection
            ref={techRef}
            sx={{
              py: 15,
              scrollMarginTop: '70px',
              borderColor: 'divider',
              position: 'relative', // КРИТИЧНО для ::after
              '&::after': {
                content: '""', // Пустая строка для создания элемента
                position: 'absolute',
                bottom: 0, // Прижимаем к низу секции
                left: '50%', // Центрируем
                transform: 'translateX(-50%)', // Центрируем
                width: '80%', // Полоса будет не на весь экран
                height: '1px', // Тонкая полоса
                bgcolor: 'rgba(56, 189, 248, 0.2)', // Базовый цвет полосы
                boxShadow: `
        0 0 10px rgba(56, 189, 248, 0.4), // Основное свечение
        0 0 20px rgba(56, 189, 248, 0.2), // Рассеянное свечение
        0 0 30px rgba(56, 189, 248, 0.1)  // Фоновое свечение
      `,
              },
            }}>
            <Typography variant='h3' sx={{mb: 6, fontWeight: 700}}>
              Мой Стек
            </Typography>
            <Grid container spacing={4}>
              {techStack.map((cat, i) => (
                <Grid size={{xs: 12, md: 4}} key={i}>
                  <Box
                    sx={{
                      p: 4,
                      bgcolor: 'background.paper',
                      borderRadius: '20px',
                      // border: '1px solid',
                      borderColor: 'divider',
                      height: '100%',
                      transition: '0.3s',
                      '&:hover': {
                        borderColor: 'primary.main',
                        transform: 'translateY(-5px)',
                        boxShadow: '0 10px 30px rgba(56, 189, 248, 0.15)',
                      },
                    }}>
                    <Typography
                      variant='h5'
                      sx={{mb: 3, fontWeight: 700, color: 'primary.main'}}>
                      {cat.category}
                    </Typography>
                    <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 1}}>
                      {cat.technologies.map((t) => (
                        <Chip
                          key={t}
                          label={t}
                          variant='outlined'
                          sx={{borderRadius: '8px'}}
                        />
                      ))}
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </AnimatedSection>

          {/* PROJECTS */}
          <AnimatedSection
            ref={projectsRef}
            sx={{
              py: 15,
              scrollMarginTop: '70px',
              // borderColor: 'divider',
            }}>
            <Typography variant='h3' sx={{mb: 6, fontWeight: 700}}>
              Проекты
            </Typography>
            <Grid container spacing={4}>
              {projects.map((p, i) => (
                <Grid size={{xs: 12, sm: 6}} key={i} sx={{display: 'flex'}}>
                  <ProjectCard {...p} />
                </Grid>
              ))}
            </Grid>
          </AnimatedSection>

          {/* CONTACT SECTION */}
          <AnimatedSection
            ref={contactRef}
            sx={{
              py: 20,
              textAlign: 'center',
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              borderTop: '1px solid',
              borderColor: 'divider',
              backgroundColor: '#030712',
            }}>
            <Container maxWidth='md'>
              <Box
                sx={{
                  p: {xs: 4, md: 6},
                  bgcolor: 'background.paper',
                  borderRadius: '24px',
                  border: '1px solid',
                  borderColor: 'primary.main',
                  boxShadow: '0 0 25px rgba(56, 189, 248, 0.2)',
                }}>
                <Typography
                  variant='h2'
                  gutterBottom
                  sx={{
                    mb: 6,
                    fontWeight: 800,
                    color: 'primary.main',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    fontSize: {xs: '2rem', md: '3rem'},
                  }}>
                  Let's talk!
                </Typography>

                <form action='#' style={{textAlign: 'left'}}>
                  <Grid container spacing={3}>
                    <Grid size={{xs: 12, md: 6}}>
                      <TextField
                        fullWidth
                        label='Ваше имя'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        variant='outlined'
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            '&:hover fieldset': {borderColor: 'primary.main'},
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main',
                            },
                          },
                          '& label.Mui-focused': {color: 'primary.main'},
                        }}
                      />
                    </Grid>

                    <Grid size={{xs: 12, md: 6}}>
                      <TextField
                        fullWidth
                        label='Номер телефона'
                        name='phone'
                        value={formData.phone}
                        onChange={handleChange}
                        type='tel'
                        variant='outlined'
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            '&:hover fieldset': {borderColor: 'primary.main'},
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main',
                            },
                          },
                          '& label.Mui-focused': {color: 'primary.main'},
                        }}
                      />
                    </Grid>

                    <Grid size={{xs: 12}}>
                      <TextField
                        fullWidth
                        label='E-mail (опционально)'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        variant='outlined'
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            '&:hover fieldset': {borderColor: 'primary.main'},
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main',
                            },
                          },
                          '& label.Mui-focused': {color: 'primary.main'},
                        }}
                      />
                    </Grid>

                    {/* НОВОЕ ПОЛЕ: СООБЩЕНИЕ ОТ РУКИ */}
                    <Grid size={{xs: 12}}>
                      <TextField
                        fullWidth
                        label='Ваше сообщение / Описание задачи'
                        name='message'
                        value={formData.message}
                        onChange={handleChange}
                        multiline // Делает поле многострочным
                        rows={4} // Высота в 4 строки
                        variant='outlined'
                        placeholder='Расскажите немного о вашем проекте...'
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            '&:hover fieldset': {borderColor: 'primary.main'},
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main',
                              boxShadow: '0 0 10px rgba(56, 189, 248, 0.2)',
                            },
                          },
                          '& label.Mui-focused': {color: 'primary.main'},
                        }}
                      />
                    </Grid>

                    <Grid
                      size={{xs: 12}}
                      sx={{display: 'flex', justifyContent: 'center', mt: 2}}>
                      <Button
                        variant='outlined'
                        size='large'
                        component={motion.a}
                        whileHover={
                          !(
                            !formData.name ||
                            !formData.phone ||
                            !formData.message
                          )
                            ? {y: -5}
                            : {}
                        }
                        whileTap={
                          !(
                            !formData.name ||
                            !formData.phone ||
                            !formData.message
                          )
                            ? {scale: 0.95}
                            : {}
                        }
                        // Кнопка отключена, если обязательные поля пустые
                        disabled={
                          !formData.name ||
                          formData.phone.length < 11 ||
                          !formData.message
                        }
                        href={getWhatsAppLink()}
                        target='_blank'
                        sx={{
                          width: {xs: '100%', md: 'auto'},
                          borderRadius: '12px',
                          px: 6,
                          py: 2,
                          fontSize: '1.1rem',
                          fontWeight: 'bold',
                          color: '#25D366',
                          borderColor: 'rgba(37, 211, 102, 0.4)',

                          // Стили для отключенного состояния
                          '&.Mui-disabled': {
                            borderColor: 'rgba(255, 255, 255, 0.12)',
                            color: 'rgba(255, 255, 255, 0.3)',
                          },

                          '&:hover': {
                            borderColor: '#25D366',
                            backgroundColor: 'rgba(37, 211, 102, 0.1)',
                            boxShadow: '0 0 20px rgba(37, 211, 102, 0.4)',
                          },
                        }}>
                        Отправить сообщение в WhatsApp
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </Container>
          </AnimatedSection>
        </Container>
      </Box>
    </ThemeProvider>
  )
}
