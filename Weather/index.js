const apiKey = "57d97ca9ff9d860bf41660ffe0c23aec";
const url = `https://api.openweathermap.org/data/2.5/forecast?lat=21.0285&lon=105.8542&units=metric&lang=vi&appid=${apiKey}`;

fetch(url)
  .then(res => res.json())
  .then(data => {
    const days = {};

    data.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dayLabel = date.toLocaleDateString('vi-VN', {
        weekday: 'long',
        day: '2-digit',
        month: '2-digit'
      });

      // Chọn bản ghi lúc 12:00 hoặc lần đầu tiên thấy
      if (!days[dayLabel] && date.getHours() === 12) {
        days[dayLabel] = item;
      }
    });

    const container = document.getElementById("forecast");
    Object.keys(days).slice(0, 5).forEach(day => {
      const item = days[day];
      const icon = item.weather[0].icon;
      const desc = item.weather[0].description;
      const tempMax = item.main.temp_max.toFixed(0);
      const tempMin = item.main.temp_min.toFixed(0);
      const humidity = item.main.humidity;

      const div = document.createElement("div");
      div.className = "weather-card";
      div.innerHTML = `
        <h3>${day}</h3>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}">
        <p>${desc}</p>
        <p>🌡️ ${tempMax}° / ${tempMin}°</p>
        <p>💧 ${humidity}%</p>
      `;
      container.appendChild(div);
    });
  })
  .catch(err => {
    document.getElementById("forecast").innerHTML = `<p style="color: red;">Lỗi tải dữ liệu: ${err.message}</p>`;
  });
