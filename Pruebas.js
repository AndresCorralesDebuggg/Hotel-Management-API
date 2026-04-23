fetch('http://localhost:3000/habitaciones/1', {
  method: 'DELETE'
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));
