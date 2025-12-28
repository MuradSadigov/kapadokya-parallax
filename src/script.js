document.addEventListener('DOMContentLoaded', () => {
  const skyLayer = document.querySelector('.sky-layer');
  const mountains = document.querySelector('.mountains-layer');
  const clouds = document.querySelectorAll('.cloud');
  const birds = document.querySelectorAll('.birds');
  const balloon1 = document.querySelector('.balloon-1');
  const balloon2 = document.querySelector('.balloon-2');
  const balloon3 = document.querySelector('.balloon-3');
  const planesLayer = document.querySelector('.planes-layer');
  const planes = document.querySelectorAll('.plane');

  const kapadokyaText = document.querySelector('.kapadokya-text');
  const letters = document.querySelectorAll('.letter');
  const subtitle = document.querySelector('.kapadokya-subtitle');

  const scrollSpace = document.querySelector('.scroll-space');
  const totalScroll = scrollSpace.offsetHeight - window.innerHeight;

  const PHASE1_END = 0.25;
  const PHASE2_END = 0.50;
  const PHASE3_END = 0.75;
  const PHASE4_END = 1.0;

  function parallaxScroll() {
    const scrolled = window.scrollY;
    const progress = Math.min(scrolled / totalScroll, 1);

    if (progress <= PHASE1_END) {
      const p = progress / PHASE1_END;

      if (balloon1) {
        const flyUp = p * 500;
        const flyLeft = p * 250;
        const opacity = 1 - (p * 1.5);
        balloon1.style.transform = `translate(${-flyLeft}px, ${-flyUp}px) scale(${1 - p * 0.3})`;
        balloon1.style.opacity = Math.max(0, opacity);
      }

      if (balloon2) {
        const flyUp = p * 450;
        const flyRight = p * 280;
        const opacity = 1 - (p * 1.4);
        balloon2.style.transform = `translate(${flyRight}px, ${-flyUp}px) scale(${1 - p * 0.4})`;
        balloon2.style.opacity = Math.max(0, opacity);
      }

      if (balloon3) {
        const scale = 1 + (p * 8);
        balloon3.style.transform = `translateX(-50%) scale(${scale})`;
        balloon3.style.opacity = 1;
      }

      if (mountains) {
        mountains.style.transform = 'translateY(0)';
      }

      birds.forEach((bird, i) => {
        const x = (i === 0 ? -1 : 1) * p * 100;
        bird.style.transform = `translateX(${x}px)`;
        bird.style.opacity = 1 - p;
      });

      clouds.forEach(cloud => {
        cloud.style.transform = 'translateY(0) scale(1)';
        cloud.style.opacity = 0.9;
      });

      if (planesLayer) planesLayer.style.opacity = 0;
    }

    else if (progress <= PHASE2_END) {
      const p = (progress - PHASE1_END) / (PHASE2_END - PHASE1_END);

      if (balloon3) {
        const startScale = 9;
        const endScale = 0.3;
        const scale = startScale - (p * (startScale - endScale));
        const moveDown = p * window.innerHeight * 1.5;
        balloon3.style.transform = `translateX(-50%) translateY(${moveDown}px) scale(${scale})`;
        balloon3.style.opacity = 1 - (p * 0.8);
      }

      if (mountains) {
        const moveDown = p * window.innerHeight;
        mountains.style.transform = `translateY(${moveDown}px)`;
      }

      birds.forEach(bird => {
        bird.style.opacity = 0;
      });

      clouds.forEach((cloud, i) => {
        const riseSpeed = 0.3 + (i * 0.1);
        const comeUp = -p * 200 * riseSpeed;
        const grow = 1 + (p * (0.5 + i * 0.2));
        cloud.style.transform = `translateY(${comeUp}px) scale(${grow})`;
        cloud.style.opacity = 0.9 + (p * 0.1);
      });

      if (planesLayer) planesLayer.style.opacity = 0;
    }

    else if (progress <= PHASE3_END) {
      const p = (progress - PHASE2_END) / (PHASE3_END - PHASE2_END);

      if (balloon3) {
        balloon3.style.opacity = 0;
      }

      if (mountains) {
        mountains.style.transform = `translateY(${window.innerHeight * 1.5}px)`;
        mountains.style.opacity = 1 - p;
      }

      clouds.forEach((cloud, i) => {
        const baseOffset = -200 * (0.3 + i * 0.1);
        const rushDown = p * window.innerHeight * (1.2 + i * 0.15);
        const scale = 1.5 + i * 0.2 + (p * 2);
        const x = (i % 2 === 0 ? -1 : 1) * p * (100 + i * 50);
        cloud.style.transform = `translate(${x}px, ${baseOffset + rushDown}px) scale(${scale})`;
        cloud.style.opacity = 1 - (p * 0.7);
      });

      if (planesLayer) {
        planesLayer.style.opacity = p * 0.5;
      }

      if (skyLayer) {
        skyLayer.style.background = `linear-gradient(to bottom, 
          rgb(${30 - p * 10}, ${60 - p * 20}, ${114 + p * 20}), 
          rgb(${74 + p * 50}, ${144 + p * 50}, ${226})
        )`;
      }

    }

    else {
      const p = (progress - PHASE3_END) / (PHASE4_END - PHASE3_END);

      if (balloon3) balloon3.style.opacity = 0;
      if (mountains) mountains.style.opacity = 0;

      clouds.forEach((cloud, i) => {
        const farDown = window.innerHeight * 1.5;
        cloud.style.transform = `translateY(${farDown}px) scale(3)`;
        cloud.style.opacity = 0.2 - (p * 0.2);
      });

      if (planesLayer) {
        planesLayer.style.opacity = 1;
      }

      planes.forEach((plane, i) => {
        let startX, endX, baseY;

        if (i === 0) {
          startX = -30; endX = 100; baseY = 0;
        } else if (i === 1) {
          startX = 130; endX = 0; baseY = 0;
        } else {
          startX = -20; endX = 90; baseY = 0;
        }

        const xPos = startX + (p * (endX - startX));
        const wave = Math.sin(p * Math.PI * 2 + i) * 15;

        if (i === 1) {
          plane.style.transform = `scaleX(-1) translateX(${-xPos}vw) translateY(${wave}px)`;
        } else {
          plane.style.transform = `translateX(${xPos}vw) translateY(${wave}px)`;
        }
      });

      if (skyLayer) {
        skyLayer.style.background = `linear-gradient(to bottom, 
          rgb(20, 40, 134), 
          rgb(${124 + p * 10}, ${194 + p * 10}, 226)
        )`;
      }

      if (kapadokyaText) {
        kapadokyaText.style.opacity = 1;
      }

      letters.forEach((letter, i) => {
        const letterStartProgress = i * 0.05;
        const letterProgress = Math.max(0, Math.min(1, (p - letterStartProgress) / 0.5));

        const translateY = 100 - (letterProgress * 100);
        const scale = 0.5 + (letterProgress * 0.5);
        const opacity = letterProgress;

        letter.style.opacity = opacity;
        letter.style.transform = `translateY(${translateY}px) scale(${scale})`;
      });

      if (subtitle) {
        const subtitleProgress = Math.max(0, (p - 0.7) / 0.3);
        subtitle.style.opacity = subtitleProgress;
      }
    }
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        parallaxScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  parallaxScroll();

});
