import { CircularProgress, Typography } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'

export const Loader = ({isFinished}: {isFinished: boolean}) => {
  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 0.8, ease: 'easeInOut'}}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#050505', // Цвет фона как у твоего сайта
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{repeat: Infinity, duration: 2}}>
            <CircularProgress size={60} sx={{color: 'primary.main', mb: 2}} />
          </motion.div>

          <Typography
            variant='h6'
            sx={{
              color: 'white',
              fontWeight: 300,
              letterSpacing: '2px',
              fontFamily: 'monospace',
            }}>
            LOADING PORTFOLIO...
          </Typography>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
