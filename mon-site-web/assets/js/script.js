const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('header nav');
const links = document.querySelectorAll('header nav a');
const isMobile = () => window.innerWidth < 820;

hamburger.addEventListener('click', () => {
  if (!isMobile()) return;

  hamburger.classList.toggle('isactive');
  menu.classList.toggle('active');
});

links.forEach(link => {
  link.addEventListener('click', () => {
    if (!isMobile()) return;

    hamburger.classList.remove('isactive');
    menu.classList.remove('active');
  });
});

document.addEventListener('click', (e) => {
  if (!isMobile()) return;

  const clickedInsideMenu = menu.contains(e.target);
  const clickedHamburger = hamburger.contains(e.target);

  if (!clickedInsideMenu && !clickedHamburger) {
    hamburger.classList.remove('isactive');
    menu.classList.remove('active');
  }
});

window.addEventListener('resize', () => {
  if (!isMobile()) {
    hamburger.classList.remove('isactive');
    menu.classList.remove('active');
  }
});

// Carousel Accueil 
const cards = document.querySelectorAll(".carousel-section:not(.modeles-carousel) .card");
let currentCard = 0;

const getVisibleCount = () => {
  const w = window.innerWidth;
  if (w >= 1200) return 3;
  if (w >= 820)  return 2;
  return 1;
};

const updateCards = () => {
  const visibleCount = getVisibleCount();
  cards.forEach((card, i) => {
    const isVisible = [...Array(visibleCount)]
      .some((_, j) => (currentCard + j) % cards.length === i);
    card.classList.toggle("active", isVisible);
  });
};

if (cards.length > 0) {
  updateCards();
  window.addEventListener("resize", updateCards);

  const move = (dir) => {
    currentCard = (currentCard + dir + cards.length) % cards.length;
    updateCards();
  };

  document.querySelector(".carousel-button.prev:not(.modeles-prev)")
    .addEventListener("click", () => move(-1));
  document.querySelector(".carousel-button.next:not(.modeles-next)")
    .addEventListener("click", () => move(1));
}

// Carousels Modèles 
document.querySelectorAll(".modeles-carousel").forEach((carousel) => {
  const carouselCards = carousel.querySelectorAll(".card");
  let current = 0;

  const update = () => {
    carouselCards.forEach((card, i) => card.classList.toggle("active", i === current));
  };

  update();

  carousel.querySelector(".modeles-prev").addEventListener("click", () => {
    current = (current - 1 + carouselCards.length) % carouselCards.length;
    update();
  });

  carousel.querySelector(".modeles-next").addEventListener("click", () => {
    current = (current + 1) % carouselCards.length;
    update();
  });
});

// Information véhicule
const carData = {
  'classe-c': {
    title: 'Classe C',
    desc: `La Mercedes-Benz Classe C est la berline compacte premium par excellence. 
           Avec son design élégant et ses technologies héritées de la Classe S, elle 
           offre un équilibre parfait entre sportivité et raffinement au quotidien.`,
    specs: [
      { label: 'Moteur', value: '2.0L 4 cylindres' },
      { label: 'Puissance', value: '204 ch' },
      { label: '0 à 100 km/h', value: '7.3 secondes' },
      { label: 'Transmission', value: 'Automatique 9G-Tronic' },
    ]
  },
  'classe-e': {
    title: 'Classe E',
    desc: `La Classe E représente l'équilibre parfait entre la sportivité de la Classe C 
           et le luxe de la Classe S. Technologie MBUX avancée, confort exceptionnel 
           et motorisations hybrides rechargeables en font la référence du segment.`,
    specs: [
      { label: 'Moteur', value: '2.0L hybride rechargeable' },
      { label: 'Puissance', value: '313 ch' },
      { label: '0 à 100 km/h', value: '5.7 secondes' },
      { label: 'Autonomie électrique', value: '~60 km' },
    ]
  },
  'classe-s': {
    title: 'Classe S',
    desc: `Vitrine technologique de Mercedes-Benz, la Classe S définit le luxe automobile 
           mondial. Suspension pneumatique, Hyperscreen MBUX et conduite semi-autonome 
           de niveau 3 en font l'expérience ultime sur quatre roues.`,
    specs: [
      { label: 'Moteur', value: '3.0L 6 cylindres biturbo' },
      { label: 'Puissance', value: '435 ch' },
      { label: '0 à 100 km/h', value: '4.9 secondes' },
      { label: 'Écran', value: 'Hyperscreen 56"' },
    ]
  },
  'eqs': {
    title: 'EQS',
    desc: `L'EQS est la limousine électrique ultime de Mercedes-Benz. Avec jusqu'à 800 km 
           d'autonomie WLTP, un coefficient aérodynamique de 0.20 et l'Hyperscreen MBUX 
           en série, elle redéfinit les standards du luxe électrique.`,
    specs: [
      { label: 'Autonomie', value: 'Jusqu\'à 800 km (WLTP)' },
      { label: 'Puissance', value: '333 ch' },
      { label: '0 à 100 km/h', value: '6.2 secondes' },
      { label: 'Recharge rapide', value: '200 kW DC' },
    ]
  },
  'eqe': {
    title: 'EQE',
    desc: `L'EQE est la berline électrique sport de la gamme EQ. Alliant dynamisme et 
           efficience, elle propose entre 549 et 693 km d'autonomie WLTP avec une 
           recharge jusqu'à 170 kW.`,
    specs: [
      { label: 'Autonomie', value: '549 – 693 km (WLTP)' },
      { label: 'Puissance', value: '292 ch' },
      { label: '0 à 100 km/h', value: '6.4 secondes' },
      { label: 'Recharge rapide', value: '170 kW DC' },
    ]
  },
  'cla': {
    title: 'CLA',
    desc: `Le CLA électrique nouvelle génération repousse les limites de l'efficience 
           avec plus de 750 km d'autonomie annoncés. Son design coupé aérodynamique 
           et ses technologies de pointe en font le choix de la nouvelle génération.`,
    specs: [
      { label: 'Autonomie', value: 'Plus de 750 km (annoncé)' },
      { label: 'Puissance', value: '272 ch' },
      { label: '0 à 100 km/h', value: '5.9 secondes' },
      { label: 'Design', value: 'Coupé 4 portes' },
    ]
  }
};

document.querySelectorAll('.btn-outline[data-car]').forEach(function(el) {
  el.onclick = (e) => {
    e.preventDefault();
    const car = carData[e.target.dataset.car];
    if (!car) return;

    const section = e.target.closest('.content-section');
    let div = section.querySelector('.section-text');

    const originalContent = div.cloneNode(true);

    const specsHTML = car.specs.map(s => `
      <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #333;">
        <span style="color:#888; font-size:14px;">${s.label}</span>
        <span style="color:#888; font-size:14px; font-weight:600;">${s.value}</span>
      </div>
    `).join('');

    div.innerHTML = `
      <button class="btn-retour">← Retour</button>
      <h2>${car.title}</h2>
      <p>${car.desc}</p>
      <div class="car-specs">${specsHTML}</div>
    `;

    div.querySelector('.btn-retour').onclick = () => {
      div.replaceWith(originalContent);
      div = originalContent;
    };
  };
});