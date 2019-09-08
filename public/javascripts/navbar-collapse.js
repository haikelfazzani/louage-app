let btnCollapse = document.querySelector('.navbar-toggler');

btnCollapse.onclick = () => {
  let dropDown = document.getElementById('navbarNav');
  dropDown.style.display = dropDown.style.display === 'none' ? 'block' : 'none';
}


let profileIcon = document.getElementById('navbarDropdown')

profileIcon.onclick = () => {
  let dropDown = document.querySelector('.dropdown-menu')
  dropDown.style.display = dropDown.style.display === 'none' ? 'block' : 'none';
}