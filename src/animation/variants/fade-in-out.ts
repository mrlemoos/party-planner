import fadeIn from './fade-in'

const fadeInOut = {
  ...fadeIn,
  exit: {
    opacity: 0,
  },
} as const

export default fadeInOut
