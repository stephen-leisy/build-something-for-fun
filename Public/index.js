const h2 = document.createElement('h2');
h2.textContent = 'sup';
document.body.appendChild(h2);

const form = document.getElementById('submit-form');
const ul = document.getElementById('moods');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const fd = new FormData(form);
  const name = fd.get('name');
  console.log(name);

  fetch('http://localhost:7890/api/v1/profiles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      const li = document.createElement('li');
      const img = document.createElement('img');

      img.src = `${res.image}`;
      li.textContent = `${res.name} - ${res.quote} - ${res.character}`;
      ul.append(li, img);
    });
});
