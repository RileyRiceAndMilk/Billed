import VerticalLayout from './VerticalLayout.js';

export default () => {
  console.log("NewBillsUI is being rendered");
  return (`
    <div class='layout'>
      ${VerticalLayout(120)}
      <div class='content'>
        <div class='content-header'>
          <div class='content-title'>Envoyer une note de frais</div>
        </div>
        <div class="form-newbill-container content-inner">
          <form id="form-new-bill" data-testid="form-new-bill">
            <div class="row">
              <div class="col-md-6">
                <div class="col-half">
                  <label for="expense-type" class="bold-label">Type de dépense</label>
                  <select id="expense-type" required class="form-control blue-border" data-testid="expense-type">
                    <option>Transports</option>
                    <option>Restaurants et bars</option>
                    <option>Hôtel et logement</option>
                    <option>Services en ligne</option>
                    <option>IT et électronique</option>
                    <option>Equipement et matériel</option>
                    <option>Fournitures de bureau</option>
                  </select>
                </div>
                <div class="col-half">
                  <label for="expense-name" class="bold-label">Nom de la dépense</label>
                  <input type="text" id="expense-name" class="form-control blue-border" data-testid="expense-name" placeholder="Vol Paris Londres" />
                </div>
                <div class="col-half">
                  <label for="datepicker" class="bold-label">Date</label>
                  <input required type="date" id="datepicker" class="form-control blue-border" data-testid="datepicker" />
                </div>
                <div class="col-half">
                  <label for="amount" class="bold-label">Montant TTC</label>
                  <input required type="number" id="amount" class="form-control blue-border input-icon input-icon-right" data-testid="amount" placeholder="348" />
                </div>
                <div class="col-half-row">
                  <div class="flex-col"> 
                   <label for="vat" class="bold-label">TVA</label>
                   <input type="number" id="vat" class="form-control blue-border" data-testid="vat" placeholder="70" />
                  </div>
                  <div class="flex-col">
                    <label for="pct" class="white-text">%</label>
                    <input required type="number" id="pct" class="form-control blue-border" data-testid="pct" placeholder="20" />
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="col-half">
                  <label for="commentary" class="bold-label">Commentaire</label>
                  <textarea id="commentary" class="form-control blue-border" data-testid="commentary" rows="3"></textarea>
                </div>
                <div class="col-half">
                    <label for="file" class="bold-label">Justificatif</label>
                    <input required type="file" id="file" class="form-control blue-border" data-testid="file" />
                    <div class="error-message" style="color: red;"></div> <!-- Zone pour afficher l'erreur -->
                    <div class="file-name" style="font-size: 0.9em; margin-top: 5px;"></div> <!-- Zone pour afficher le nom du fichier sélectionné -->
                </div>

              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="col-half">
                  <button type="submit" id='btn-send-bill' class="btn btn-primary">Envoyer</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  `);
}
