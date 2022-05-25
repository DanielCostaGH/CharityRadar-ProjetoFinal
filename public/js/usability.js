const logadoounao = document.getElementById('nav-linkblue').innerText;
if(logadoounao == '' || logadoounao == "Acesse sua conta"){
const container = document.querySelector(".container"),
      pwShowHide = document.querySelectorAll(".showHidePw"),
      pwFields = document.querySelectorAll(".password"),
      signUp = document.querySelector(".signup-link"),
      login = document.querySelector(".login-link");

    pwShowHide.forEach(eyeIcon =>{
        eyeIcon.addEventListener("click", ()=>{
            pwFields.forEach(pwField =>{
                if(pwField.type ==="password"){
                    pwField.type = "text";

                    pwShowHide.forEach(icon =>{
                        icon.classList.replace("uil-eye-slash", "uil-eye");
                    })
                }else{
                    pwField.type = "password";

                    pwShowHide.forEach(icon =>{
                        icon.classList.replace("uil-eye", "uil-eye-slash");
                    })
                }
            }) 
        })
    })

    signUp.addEventListener("click", ( )=>{
        container.classList.add("active");
    });
    login.addEventListener("click", ( )=>{
        container.classList.remove("active");
    });
// ================================================= PUXAR MODAL FUNCTIONS =====================================

   
        function iniciaModal(modalID){
        const modal = document.getElementById(modalID);
        modal.classList.add('mostrar');
        modal.addEventListener('click', (e)=> {
            if(e.target.id == modalID || e.target.className == 'uil uil-multiply'){
                modal.classList.remove('mostrar')
            }
        })
        }

        const accAcess = document.querySelector('.accAcess');
        accAcess.addEventListener('click', () => 
        iniciaModal('modal-popup'));
        
// ================================================= PUXAR BARRA LATERAL =====================================

}else {
    function iniciaModal(modalID){
        const modal = document.getElementById(modalID);
        modal.classList.add('mostrar');
        modal.classList.add('option-show');
        modal.addEventListener('click', (e)=> {
            if(e.target.id == modalID){
                modal.classList.remove('mostrar')
            }
        })
        }

        const accAcess = document.querySelector('.accAcess');
        accAcess.addEventListener('click', () => 
        iniciaModal('modal-barId'));
}
