let profileIcon = document.getElementById('navbarDropdown')

if(profileIcon) {
  profileIcon.onclick = () => {
    let dropDown = document.querySelector('.dropdown-menu')
    dropDown.style.display = dropDown.style.display === 'none' ? 'block' : 'none';
  }
}