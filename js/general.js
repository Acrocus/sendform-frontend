
(function () {
  const API_KEY = 'AIzaSyAzvTpcIy3ZVMobBp89H2L5VjY6IxDMsks';
  const CHANNEL_ID = 'UCutmDUzBhJizZCdqqO_8vTw';
  const MAX_RESULTS = 6;

  const videoContainer = document.getElementById('videoContainer');

  if (!videoContainer) {
    console.warn("⚠️ Елемент #videoContainer не знайдено. Завантаження відео скасовано.");
    return;
  }

  fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`)
    .then(response => response.json())
    .then(data => {
      videoContainer.innerHTML = '';
      data.items.forEach(item => {
        if (item.id.kind === 'youtube#video') {
          const videoId = item.id.videoId;
          const title = item.snippet.title;
          const thumbnail = item.snippet.thumbnails.high.url;

          const videoEl = document.createElement('div');
          videoEl.classList.add('video');
          videoEl.onclick = () => {
            window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
          };
          videoEl.innerHTML = `
            <img src="${thumbnail}" alt="${title}">
            <div class="video-title">${title}</div>
          `;
          videoContainer.appendChild(videoEl);
        }
      });
    })
    .catch(err => {
      console.error('❌ Помилка при завантаженні відео:', err);
      if (videoContainer) {
        videoContainer.innerHTML = 'Не вдалося завантажити відео 😢';
      }
    });
})();
