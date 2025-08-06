/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        navy: '#1a237e',
        accent: '#1976d2',
      },
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'fade-in-down': 'fadeInDown 0.8s ease-out',
        'slide-in-left': 'slideInLeft 0.8s ease-out',
        'slide-in-right': 'slideInRight 0.8s ease-out',
        'scale-in': 'scaleIn 0.6s ease-out',
        'bounce-in': 'bounceIn 0.8s ease-out',
        'pulse-slow': 'pulse 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 1.5s infinite',
        'slide-in-up': 'slideInUp 0.8s ease-out',
        'slide-x': 'slideX 8s linear infinite',
        'slide-y': 'slideY 6s linear infinite reverse',
        'rotate-3d': 'rotate3D 4s ease-in-out infinite',
        'particle-float': 'particleFloat 3s ease-out infinite',
        'rotate-3d-reverse': 'rotate3DReverse 6s ease-in-out infinite',
        'slide-loop-x': 'slideLoopX 12s linear infinite',
        'slide-loop-y': 'slideLoopY 10s linear infinite',
        'slide-loop-diagonal': 'slideLoopDiagonal 15s linear infinite',
        'slide-loop-reverse': 'slideLoopReverse 18s linear infinite',
        'orbit': 'orbit 8s linear infinite',
        'orbit-reverse': 'orbitReverse 6s linear infinite',
        'circle-pulse': 'circlePulse 3s ease-in-out infinite',
        'circle-rotate': 'circleRotate 20s linear infinite',
        'infinite-slide': 'infiniteSlide 30s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200px 0' },
          '100%': { backgroundPosition: 'calc(200px + 100%) 0' },
        },
        slideInUp: {
          '0%': { opacity: '0', transform: 'translateY(50px) translateZ(-50px) rotateX(20deg)' },
          '100%': { opacity: '1', transform: 'translateY(0) translateZ(0) rotateX(0deg)' },
        },
        slideX: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        slideY: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        rotate3D: {
          '0%': { transform: 'rotateY(0deg) rotateX(0deg)' },
          '25%': { transform: 'rotateY(90deg) rotateX(10deg)' },
          '50%': { transform: 'rotateY(180deg) rotateX(0deg)' },
          '75%': { transform: 'rotateY(270deg) rotateX(-10deg)' },
          '100%': { transform: 'rotateY(360deg) rotateX(0deg)' },
        },
        particleFloat: {
          '0%': { transform: 'translateY(0px) translateX(0px) scale(1)', opacity: '1' },
          '50%': { transform: 'translateY(-20px) translateX(10px) scale(1.2)', opacity: '0.8' },
          '100%': { transform: 'translateY(-40px) translateX(20px) scale(0.8)', opacity: '0' },
        },
        rotate3DReverse: {
          '0%': { transform: 'rotateY(0deg) rotateX(0deg) scale(1)' },
          '25%': { transform: 'rotateY(-90deg) rotateX(-10deg) scale(1.1)' },
          '50%': { transform: 'rotateY(-180deg) rotateX(0deg) scale(1)' },
          '75%': { transform: 'rotateY(-270deg) rotateX(10deg) scale(0.9)' },
          '100%': { transform: 'rotateY(-360deg) rotateX(0deg) scale(1)' },
        },
        slideLoopX: {
          '0%': { transform: 'translateX(-100vw) scale(0.5)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateX(100vw) scale(1.5)', opacity: '0' },
        },
        slideLoopY: {
          '0%': { transform: 'translateY(-100vh) scale(0.5)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(100vh) scale(1.5)', opacity: '0' },
        },
        slideLoopDiagonal: {
          '0%': { transform: 'translateX(-100vw) translateY(-100vh) scale(0.5)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateX(100vw) translateY(100vh) scale(1.5)', opacity: '0' },
        },
        slideLoopReverse: {
          '0%': { transform: 'translateX(100vw) translateY(100vh) scale(0.5)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateX(-100vw) translateY(-100vh) scale(1.5)', opacity: '0' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(80px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(80px) rotate(-360deg)' },
        },
        orbitReverse: {
          '0%': { transform: 'rotate(0deg) translateX(60px) rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg) translateX(60px) rotate(360deg)' },
        },
        circlePulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.3' },
          '50%': { transform: 'scale(1.2)', opacity: '0.8' },
        },
        circleRotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        infiniteSlide: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
      backfaceVisibility: {
        'hidden': 'hidden',
        'visible': 'visible',
      },
      perspective: {
        '1000': '1000px',
        '2000': '2000px',
      },
      rotate: {
        'y-0': 'rotateY(0deg)',
        'y-6': 'rotateY(6deg)',
        'y-12': 'rotateY(12deg)',
        'y-45': 'rotateY(45deg)',
        'y-90': 'rotateY(90deg)',
        'x-0': 'rotateX(0deg)',
        'x-6': 'rotateX(6deg)',
        'x-12': 'rotateX(12deg)',
      },
      translate: {
        'z-0': 'translateZ(0px)',
        'z-8': 'translateZ(8px)',
        'z-16': 'translateZ(16px)',
        'z-32': 'translateZ(32px)',
      },
    },
  },
  plugins: [],
}

