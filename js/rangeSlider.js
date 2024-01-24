const value = document.querySelector('#selected-rating');
const inputRating = document.querySelector('#rating-slider');
value.textContent = inputRating.value;

inputRating.addEventListener('input', (e) => {
    value.textContent = e.target.value;
})