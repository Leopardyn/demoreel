// Live timecode readout in the header, styled like an NLE HUD.
(function tickTimecode() {
  const el = document.getElementById('tcReadout');
  if (!el) return;
  const start = performance.now();
  const fps = 24;

  function frame(now) {
    const elapsedMs = now - start;
    const totalFrames = Math.floor((elapsedMs / 1000) * fps);
    const hh = Math.floor(totalFrames / (3600 * fps));
    const mm = Math.floor((totalFrames / (60 * fps)) % 60);
    const ss = Math.floor((totalFrames / fps) % 60);
    const ff = totalFrames % fps;
    const pad = (n) => String(n).padStart(2, '0');
    el.textContent = `${pad(hh)}:${pad(mm)}:${pad(ss)}:${pad(ff)}`;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();

// Category filtering for the project "media bin"
(function projectFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  const clips = document.querySelectorAll('.clip');
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const filter = btn.dataset.filter;
      clips.forEach((clip) => {
        const match = filter === 'all' || clip.dataset.cat === filter;
        clip.classList.toggle('is-hidden', !match);
      });
    });
  });
})();
