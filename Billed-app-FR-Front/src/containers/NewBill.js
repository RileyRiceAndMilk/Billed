import { ROUTES_PATH } from '../constants/routes.js'
import Logout from "./Logout.js"

export default class NewBill {
  constructor({ document, onNavigate, store, localStorage }) {
    this.document = document
    this.onNavigate = onNavigate
    this.store = store
    const formNewBill = this.document.querySelector('form[data-testid="form-new-bill"]')
    formNewBill.addEventListener("submit", this.handleSubmit)
    const file = this.document.querySelector('input[data-testid="file"]')
    file.addEventListener("change", this.handleChangeFile)
    this.fileUrl = null
    this.fileName = null
    this.billId = null
    new Logout({ document, localStorage, onNavigate })
  }

  handleChangeFile = e => {
    const inputFile = document.querySelector('input[data-testid="file"]');
    const file = inputFile.files[0]; 
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
  
    const fileNameElement = document.querySelector('.file-name'); 
    const errorElement = document.querySelector('.error-message'); 
  
    if (!allowedExtensions.test(file.name)) {
      if (fileNameElement) {
        fileNameElement.textContent = "";
      }
      if (errorElement) {
        errorElement.textContent = "Seuls les fichiers JPG, JPEG et PNG sont autorisés."; 
      }
      inputFile.value = ""; 
      return;
    }
  
    if (errorElement) {
      errorElement.textContent = ""; 
    }
    if (fileNameElement) {
      fileNameElement.textContent = `Nom du fichier : ${file.name}`; 
    }
  
    const formData = new FormData();
    const user = JSON.parse(localStorage.getItem("user"));
    
    // Vérifie si l'utilisateur est bien récupéré avant d'essayer d'accéder à son email
    if (user && user.email) {
      formData.append('file', file);
      formData.append('email', user.email);
  
      this.store
        .bills()
        .create({
          data: formData,
          headers: {
            noContentType: true
          }
        })
        .then(({ fileUrl, key }) => {
          this.billId = key; 
          this.fileUrl = fileUrl; 
          this.fileName = file.name; 
        })
        .catch(error => console.error(error)); 
    } else {
      console.error("Utilisateur non trouvé dans le localStorage.");
    }
  };

  handleSubmit = e => {
    e.preventDefault()
    const dateValue = e.target.querySelector('input[data-testid="datepicker"]').value
    console.log('Date sélectionnée:', dateValue)
    
    // Vérifie à nouveau si l'utilisateur existe et a un email valide
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email) {
      const bill = {
        email: user.email,
        type: e.target.querySelector('select[data-testid="expense-type"]').value,
        name: e.target.querySelector('input[data-testid="expense-name"]').value,
        amount: parseInt(e.target.querySelector('input[data-testid="amount"]').value),
        date: dateValue,
        vat: e.target.querySelector('input[data-testid="vat"]').value,
        pct: parseInt(e.target.querySelector('input[data-testid="pct"]').value) || 20,
        commentary: e.target.querySelector('textarea[data-testid="commentary"]').value,
        fileUrl: this.fileUrl,
        fileName: this.fileName,
        status: 'pending'
      }
      this.updateBill(bill)
      this.onNavigate(ROUTES_PATH['Bills'])
    } else {
      console.error("Utilisateur non trouvé dans le localStorage lors de la soumission du formulaire.");
    }
  }

  updateBill = (bill) => {
    if (this.store) {
      this.store
        .bills()
        .update({ data: JSON.stringify(bill), selector: this.billId })
        .then(() => {
          this.onNavigate(ROUTES_PATH['Bills'])
        })
        .catch(error => console.error(error))
    }
  }
}



