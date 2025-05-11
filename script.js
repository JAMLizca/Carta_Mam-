// read custom message from query strings
// Tutorial -> https://youtu.be/6ojp1iWUKw8

const urlSearchParams = new URLSearchParams(window.location.search)

const messageCustom = urlSearchParams.get('message')

if (messageCustom) {

  const mainMessageElement = document.querySelector('#mainMessage')
  mainMessageElement.innerHTML = decodeURI(messageCustom)
}

// the tutorial starts here

// Configuración de partículas
particlesJS('particles-js', {
  particles: {
    number: {
      value: window.innerWidth < 768 ? 40 : 80,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: ['#ff6b6b', '#ff8e8e', '#ffb6b6']
    },
    shape: {
      type: ['circle', 'heart'],
      stroke: {
        width: 0,
        color: '#000000'
      }
    },
    opacity: {
      value: 0.5,
      random: true,
      animation: {
        enable: true,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: window.innerWidth < 768 ? 2 : 3,
      random: true,
      animation: {
        enable: true,
        speed: 2,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#ff6b6b',
      opacity: 0.2,
      width: 1
    },
    move: {
      enable: true,
      speed: window.innerWidth < 768 ? 1 : 2,
      direction: 'none',
      random: true,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: true,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'grab'
      },
      onclick: {
        enable: true,
        mode: 'push'
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 0.5
        }
      },
      push: {
        particles_nb: window.innerWidth < 768 ? 2 : 4
      }
    }
  },
  retina_detect: true
});

// Funcionalidad de la carta
const btnOpenElement = document.querySelector('#open')
const btnCloseElement = document.querySelector('#close')
const coverElement = document.querySelector('.cover')
const paperElement = document.querySelector('.paper')
const heartElement = document.querySelector('.heart')
const titleElement = document.querySelector('.title')
const messageContent = document.querySelector('.message-content')

btnCloseElement.disabled = true

// Ajustar altura del contenedor de la carta según el contenido
function adjustLetterHeight() {
  const contentHeight = messageContent.scrollHeight;
  const minHeight = window.innerWidth < 480 ? 300 : 200;
  const container = document.querySelector('.container-letter');
  container.style.height = `${Math.max(contentHeight + 100, minHeight)}px`;
}

// Crear corazones flotantes
function createFloatingHeart() {
  const heart = document.createElement('div')
  heart.className = 'floating-heart'
  heart.innerHTML = '♥'
  heart.style.left = Math.random() * 100 + 'vw'
  heart.style.animationDuration = Math.random() * 3 + 2 + 's'
  heart.style.opacity = Math.random() * 0.5 + 0.2
  document.querySelector('.floating-hearts').appendChild(heart)
  
  setTimeout(() => {
    heart.remove()
  }, 5000)
}

// Crear corazones periódicamente
setInterval(createFloatingHeart, 3000)

function showHeart() {
  heartElement.style.display = 'block'
  setTimeout(() => {
    heartElement.style.display = 'none'
  }, 2000)
}

function animateTitle() {
  titleElement.style.animation = 'none'
  titleElement.offsetHeight // Trigger reflow
  titleElement.style.animation = 'float 3s ease-in-out infinite'
}

// Manejar el mensaje personalizado
function handleCustomMessage() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const messageCustom = urlSearchParams.get('message');
  
  if (messageCustom) {
    try {
      const decodedMessage = decodeURI(messageCustom);
      messageContent.innerHTML = decodedMessage;
      adjustLetterHeight();
    } catch (error) {
      console.error('Error al decodificar el mensaje:', error);
    }
  }
}

// Inicializar
handleCustomMessage();
adjustLetterHeight();

// Ajustar altura en cambios de tamaño de ventana
window.addEventListener('resize', adjustLetterHeight);

btnOpenElement.addEventListener('click', ()=> {
  btnOpenElement.disabled = true
  btnCloseElement.disabled = false
  
  coverElement.classList.add('open-cover')
  animateTitle()
  
  setTimeout(()=>{
    coverElement.style.zIndex = -1
    paperElement.classList.remove('close-paper')
    paperElement.classList.add('open-paper')
    showHeart()
    
    // Crear varios corazones al abrir
    for(let i = 0; i < 5; i++) {
      setTimeout(createFloatingHeart, i * 200)
    }
  }, 500)
})
btnCloseElement.addEventListener('click', ()=> {
  btnOpenElement.disabled = false
  btnCloseElement.disabled = true
  
  paperElement.classList.remove('open-paper')
  paperElement.classList.add('close-paper')
  
  setTimeout(()=>{
    coverElement.style.zIndex = 2
    coverElement.classList.remove('open-cover')
  },500)
})


