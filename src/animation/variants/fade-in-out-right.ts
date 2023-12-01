import fadeInOut from './fade-in-out'

const fadeInOutRight = {
  initial: {
    ...fadeInOut.initial,
    x: 100,
  },
  animate: {
    ...fadeInOut.animate,
    x: 0,
  },
  exit: {
    ...fadeInOut.exit,
    x: 100,
  },
} as const

export default fadeInOutRight
