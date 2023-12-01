import fadeInOut from './fade-in-out'

const fadeInOutTop = {
  initial: {
    ...fadeInOut.initial,
    y: 100,
  },
  animate: {
    ...fadeInOut.animate,
    y: 0,
  },
  exit: {
    ...fadeInOut.exit,
    y: 100,
  },
} as const

export default fadeInOutTop
