<template>
    <div class="container">
      <div class="row">
        <div class="col-sm-10">
          <h1>Vehicles</h1>
          <hr><br><br>
          <alert :message=message v-if="showMessage"></alert>
          <button
            type="button"
            class="btn btn-success btn-sm"
            @click="toggleAddModal">
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
                <td>
                  <div class="btn-group" role="group">
                    <button
                      type="button"
                      class="btn btn-warning btn-sm"
                      @click="toggleEditModal(item)">
                      Update
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger btn-sm"
                      @click="handleDeleteItem(item)">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <!-- add new modal -->
      <div
        ref="addModal"
        class="modal fade"
        :class="{ show: activeAddModal, 'd-block': activeAddModal }"
        tabindex="-1"
        role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add a new vehicle</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                @click="toggleAddModal">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="addPlate" class="form-label">Plate:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="addPlate"
                    v-model="addForm.plate"
                    placeholder="Enter plate">
                </div>
                <div class="mb-3">
                  <label for="addModel" class="form-label">Model:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="addModel"
                    v-model="addForm.model"
                    placeholder="Enter model">
                </div>
                <div class="mb-3">
                  <label for="addNumber" class="form-label">Number:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="addNumber"
                    v-model="addForm.number"
                    placeholder="Enter number">
                </div>
                <div class="btn-group" role="group">
                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    @click="handleAddSubmit">
                    Submit
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger btn-sm"
                    @click="handleAddReset">
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div v-if="activeAddModal" class="modal-backdrop fade show"></div>
  
      <!-- edit modal -->
      <div
        ref="editModal"
        class="modal fade"
        :class="{ show: activeEditModal, 'd-block': activeEditModal }"
        tabindex="-1"
        role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Update</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                @click="toggleEditModal">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="editPlate" class="form-label">Plate:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="editPlate"
                    v-model="editForm.plate"
                    placeholder="Enter title">
                </div>
                <div class="mb-3">
                  <label for="editModel" class="form-label">Model:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="editModel"
                    v-model="editForm.model"
                    placeholder="Enter author">
                </div>
                <div class="mb-3">
                  <label for="editNumber" class="form-label">Number</label>
                  <input
                    type="text"
                    class="form-control"
                    id="editNumber"
                    v-model="editForm.number"
                    placeholder="Enter author">
                </div>
                <div class="btn-group" role="group">
                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    @click="handleEditSubmit">
                    Submit
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger btn-sm"
                    @click="handleEditCancel">
                    Cancel
                  </button>
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
import axios from 'axios';
import AlertView from './AlertView.vue';
import VehiclesDataService from "../services/VehiclesDataService";

export default {
  data() {
    return {
      activeAddModal: false,
      activeEditModal: false,
      addForm: {
        title: '',
        author: '',
        read: [],
      },
      items: [],
      editForm: {
        id: '',
        title: '',
        author: '',
        read: [],
      },
      message: '',
      showMessage: false,
    };
  },
  components: {
    alert: AlertView,
  },
  methods: {
    addItem(payload) {
      const path = 'http://localhost:5001/books';
      axios.post(path, payload)
        .then(() => {
          this.getData();
          this.message = 'Vehicle added!';
          this.showMessage = true;
        })
        .catch((error) => {
          console.log(error);
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
      let read = false;
      if (this.addForm.read[0]) {
        read = true;
      }
      const payload = {
        title: this.addForm.title,
        author: this.addForm.author,
        read, // property shorthand
      };
      this.addItem(payload);
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
      let read = false;
      if (this.editForm.read) read = true;
      const payload = {
        title: this.editForm.title,
        author: this.editForm.author,
        read,
      };
      this.updateItem(payload, this.editForm.id);
    },
    initForm() {
      this.addForm.title = '';
      this.addForm.author = '';
      this.addForm.read = [];
      this.editForm.id = '';
      this.editForm.title = '';
      this.editForm.author = '';
      this.editForm.read = [];
    },
    removeItem(itemID) {
      const path = `http://localhost:5001/books/${itemID}`;
      axios.delete(path)
        .then(() => {
          this.getData();
          this.message = 'Vehicle removed!';
          this.showMessage = true;
        })
        .catch((error) => {
          console.error(error);
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
      } else{
        body.classList.remove('modal-open');
      }
    },
    updateItem(payload, itemID) {
      const path = `http://localhost:5001/books/${itemID}`;
      axios.put(path, payload)
        .then(() => {
          this.getData();
          this.message = 'Vehicle updated!';
          this.showMessage = true;
        })
        .catch((error) => {
          console.error(error);
          this.getData();
        });
    },
  },
  created() {
    this.getData();
  },
};
</script>