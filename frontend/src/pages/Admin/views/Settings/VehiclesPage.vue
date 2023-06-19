<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>Vehicles</h1>
        <hr><br><br>
        <alert :message=alertMessage :type=alertMessageType v-if="showMessage"></alert>
        <button type="button" class="btn btn-success btn-sm" @click="toggleAddModal">
          Add vehicle
        </button>
        <br><br>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Plate</th>
              <th scope="col">Model</th>
              <th scope="col">Number</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td>{{ item.plate }}</td>
              <td>{{ item.model }}</td>
              <td>{{ item.number }}</td>
              <td class="text-end">
                <div class="btn-group mt-2" role="group">
                  <button type="button" class="btn btn-warning btn-sm" @click="toggleEditModal(item)">Update</button>
                  <button type="button" class="btn btn-danger btn-sm" @click="handleDeleteItem(item)">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
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
                <label for="addPlate" class="form-label">Plate:</label>
                <input type="text" class="form-control" id="addPlate" v-model="addForm.plate" placeholder="Enter plate">
              </div>
              <div class="mb-3">
                <label for="addModel" class="form-label">Model:</label>
                <input type="text" class="form-control" id="addModel" v-model="addForm.model" placeholder="Enter model">
              </div>
              <div class="mb-3">
                <label for="addNumber" class="form-label">Number:</label>
                <input type="text" class="form-control" id="addNumber" v-model="addForm.number"
                  placeholder="Enter number">
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
import VehiclesDataService from "@/services/Admin/Settings/VehiclesDataService";

export default {
  data() {
    return {
      activeAddModal: false,
      activeEditModal: false,
      addForm: {
        plate: '',
        model: '',
        number: ''
      },
      items: [],
      editForm: {
        id: '',
        plate: '',
        model: '',
        number: ''
      },
      alertMessage: '',
      alertMessageType: 1,
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
          this.items = response.data;
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
      this.removeItem(item.id);
    },
    handleEditCancel() {
      this.toggleEditModal(null);
      this.initForm();
      this.getData(); // why?
    },
    handleEditSubmit() {
      this.toggleEditModal(null);
      this.updateItem(this.editForm, this.editForm.id);
    },
    initForm() {
      this.addForm.plate = '';
      this.addForm.model = '';
      this.addForm.number = [];
      this.editForm.id = '';
      this.editForm.plate = '';
      this.editForm.model = '';
      this.editForm.number = [];
    },
    removeItem(itemID) {
      VehiclesDataService.delete(itemID)
        .then(() => {
          this.getData();
          this.alertMessage = 'Vehicle removed!';
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