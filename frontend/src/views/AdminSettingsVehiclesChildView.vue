<template>
  <div class="container">
    <div class="row">
      <div>
        <h1>Vehicles</h1>
        <hr><br><br>
        <alert :message=alertMessage :type=alertMessageType v-if="showMessage"></alert>
        <button type="button" class="btn btn-success btn-sm" @click="toggleAddModal">
          Add vehicle
        </button>
        <br><br>
        <vue-good-table :rows="rows" :columns="columns">
          <template #table-row="props">
            <span v-if="props.column.field == 'after'">
              <button type="button" class="btn btn-warning btn-sm" @click="toggleEditModal(props.row)">Update</button>
              <button type="button" class="btn btn-danger btn-sm" @click="handleDeleteItem(props.row)">Delete</button>
            </span>
            <span v-else>
              {{ props.formattedRow[props.column.field] }}
            </span>
          </template>
        </vue-good-table>
      </div>
    </div>

    <!-- add new modal -->
    <div ref="addModal" class="modal fade" :class="{ show: activeAddModal, 'd-block': activeAddModal }" tabindex="-1"
      role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add a new vehicle</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="toggleAddModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="addNumber" class="form-label">Vehicle number:</label>
                <input type="text" class="form-control" id="addNumber" v-model="addForm.number"
                  placeholder="Enter number">
              </div>
              <div class="mb-3">
                <label for="addPlate" class="form-label">Vehicle plate:</label>
                <input type="text" class="form-control" id="addPlate" v-model="addForm.plate" placeholder="Enter plate">
              </div>
              <div class="mb-3">
                <label for="addModel" class="form-label">Vehicle model:</label>
                <input type="text" class="form-control" id="addModel" v-model="addForm.model" placeholder="Enter model">
              </div>
              <div class="mb-3">
                <label for="addSurname" class="form-label">Vehicle type:</label>
                <select class="form-control" id="addSurname" v-model="addForm.type">
                  <option>Navalno vozilo</option>
                  <option>Autocisterna</option>
                  <option>Šumsko vozilo</option>
                  <option>Tehničko vozilo</option>
                  <option>Kombi za putnike</option>
                  <option>Zapovjedno vozilo</option>
                  <option>Autoljestve</option>
                  <option>Teretni kombi</option>
                </select>
              </div>
              <div class="btn-group" role="group">
                <button type="button" class="btn btn-primary btn-sm" @click="handleAddSubmit">Submit</button>
                <button type="button" class="btn btn-danger btn-sm" @click="handleAddReset">Reset</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div v-if="activeAddModal" class="modal-backdrop fade show"></div>

    <!-- edit modal -->
    <div ref="editModal" class="modal fade" :class="{ show: activeEditModal, 'd-block': activeEditModal }" tabindex="-1"
      role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Update</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="toggleEditModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="editPlate" class="form-label">Plate:</label>
                <input type="text" class="form-control" id="editPlate" v-model="editForm.plate" placeholder="Enter title">
              </div>
              <div class="mb-3">
                <label for="editModel" class="form-label">Model:</label>
                <input type="text" class="form-control" id="editModel" v-model="editForm.model"
                  placeholder="Enter author">
              </div>
              <div class="mb-3">
                <label for="editNumber" class="form-label">Number</label>
                <input type="text" class="form-control" id="editNumber" v-model="editForm.number"
                  placeholder="Enter author">
              </div>
              <div class="btn-group" role="group">
                <button type="button" class="btn btn-primary btn-sm" @click="handleEditSubmit">Submit</button>
                <button type="button" class="btn btn-danger btn-sm" @click="handleEditCancel">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div v-if="activeEditModal" class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
import MessageAlert from '@/components/AdminMessage.vue';
import VehiclesDataService from "@/services/AdminSettingsVehiclesDataService";

export default {
  data() {
    return {
      columns: [
        {
          label: 'Number',
          field: 'number'
        },
        {
          label: 'Plate',
          field: 'plate'
        },
        {
          label: 'Model',
          field: 'model',
        },
        {
          label: 'Type',
          field: 'type.name',
        },
        {
          field: 'after',
        },
      ],
      activeAddModal: false,
      activeEditModal: false,
      addForm: {
        plate: '',
        model: '',
        number: ''
      },
      rows: [],
      editForm: {
        id: '',
        plate: '',
        model: '',
        number: ''
      },
      alertMessage: '',
      alertMessageType: 0,
      showMessage: false,
    };
  },
  components: {
    alert: MessageAlert,
  },
  methods: {
    addItem(payload) {
      VehiclesDataService.create(payload)
        .then(() => {
          this.getData();
          this.alertMessage = 'Vehicle added!';
          this.alertMessageType = 0;
          this.showMessage = true;
        })
        .catch(error => {
          console.log(error);
          this.alertMessage = 'Vehicle cannot be added!';
          this.alertMessageType = 1;
          this.showMessage = true;
          this.getData();
        });
    },
    getData() {
      VehiclesDataService.getAll()
        .then(response => {
          this.rows = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    handleAddReset() {
      this.initForm();
    },
    handleAddSubmit() {
      this.toggleAddModal();
      this.addItem(this.addForm);
      this.initForm();
    },
    handleDeleteItem(item) {
      this.removeItem(item._id);
    },
    handleEditCancel() {
      this.toggleEditModal(null);
      this.initForm();
      this.getData(); // why?
    },
    handleEditSubmit() {
      this.toggleEditModal(null);
      this.updateItem(this.editForm, this.editForm._id);
    },
    initForm() {
      this.addForm.number = '';
      this.addForm.plate = '';
      this.addForm.model = '';
      this.editForm._id = '';
      this.editForm.number = '';
      this.editForm.plate = '';
      this.editForm.model = '';
    },
    removeItem(itemID) {
      VehiclesDataService.delete(itemID)
        .then(() => {
          this.getData();
          this.alertMessage = 'Vehicle removed!';
          this.alertMessageType = 0;
          this.showMessage = true;
        })
        .catch(error => {
          console.log(error);
          this.alertMessage = 'Vehicle cannot be removed!';
          this.alertMessageType = 1;
          this.showMessage = true;
          this.getData();
        });
    },
    toggleAddModal() {
      const body = document.querySelector('body');
      this.activeAddModal = !this.activeAddModal;
      if (this.activeAddModal) {
        body.classList.add('modal-open');
      } else {
        body.classList.remove('modal-open');
      }
    },
    toggleEditModal(item) {
      if (item) {
        this.editForm = item;
      }
      const body = document.querySelector('body');
      this.activeEditModal = !this.activeEditModal;
      if (this.activeEditModal) {
        body.classList.add('modal-open');
      } else {
        body.classList.remove('modal-open');
      }
    },
    updateItem(payload, itemID) {
      VehiclesDataService.update(itemID, payload)
        .then(() => {
          this.getData();
          this.alertMessage = 'Vehicle updated!';
          this.alertMessageType = 0;
          this.showMessage = true;
        })
        .catch(error => {
          console.log(error);
          this.alertMessage = 'Vehicle cannot be updated!';
          this.alertMessageType = 1;
          this.showMessage = true;
          this.getData();
        });
    },
  },
  created() {
    this.getData();
  },
};
</script>