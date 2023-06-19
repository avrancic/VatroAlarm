<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>Accounts</h1>
        <hr><br><br>
        <alert :message=alertMessage :type=alertMessageType v-if="showMessage"></alert>
        <button type="button" class="btn btn-success btn-sm" @click="toggleAddModal">
          Add employee
        </button>
        <br><br>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Permissions</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td>{{ item.name }}</td>
              <td>{{ item.username }}</td>
              <td>{{ item.permisisons }}</td>
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
            <h5 class="modal-title">Add a new user</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="toggleAddModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="addName" class="form-label">Name:</label>
                <input type="text" class="form-control" id="addName" v-model="addForm.name" placeholder="Enter name">
              </div>
              <div class="mb-3">
                <label for="addSurname" class="form-label">Username:</label>
                <input type="text" class="form-control" id="addSurname" v-model="addForm.username"
                  placeholder="Enter USERNAME">
              </div>
              <div class="mb-3">
                <label for="addSurname" class="form-label">Password:</label>
                <input type="text" class="form-control" id="addSurname" v-model="addForm.password"
                  placeholder="Enter USERNAME">
              </div>
              <div class="mb-3">
                <label for="addSurname" class="form-label">Permisisons:</label>
                <select class="form-control" id="addSurname" v-model="addForm.permisisons" multiple>
                  <option>A</option>
                  <option>B</option>
                  <option>C</option>
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
                <label for="editName" class="form-label">Name:</label>
                <input type="text" class="form-control" id="editName" v-model="editForm.name" placeholder="Enter name">
              </div>
              <div class="mb-3">
                <label for="editSurname" class="form-label">Surname:</label>
                <input type="text" class="form-control" id="editSurname" v-model="editForm.surname"
                  placeholder="Enter surname">
              </div>
              <div class="mb-3">
                <label for="editType" class="form-label">Type</label>
                <input type="text" class="form-control" id="editType" v-model="editForm.type" placeholder="Enter type">
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
import UsersDataService from "@/services/Admin/Settings/UsersDataService";

export default {
  data() {
    return {
      activeAddModal: false,
      activeEditModal: false,
      addForm: {
        name: '',
        username: '',
        password: '',
        permisisons: []
      },
      items: [],
      editForm: {
        id: '',
        name: '',
        password: '',
        permisisons: []
      },
      alertMessage: '',
      alertMessageType: 1,
      showMessage: false
    };
  },
  components: {
    alert: MessageAlert
  },
  methods: {
    addItem(payload) {
      UsersDataService.create(payload)
        .then(() => {
          this.getData();
          this.alertMessage = 'Employee added!';
          this.alertMessageType = 0;
          this.showMessage = true;
        })
        .catch(error => {
          console.log(error);
          this.alertMessage = 'Employee cannot be added!';
          this.alertMessageType = 1;
          this.showMessage = true;
          this.getData();
        });
    },
    getData() {
      UsersDataService.getAll()
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
      this.addForm.name = '';
      this.addForm.username = '';
      this.addForm.password = '';
      this.addForm.permisisons = [];
      this.editForm.id = '';
      this.editForm.name = '';
      this.editForm.username = '';
      this.editForm.permisisons = [];
    },
    removeItem(itemID) {
      UsersDataService.delete(itemID)
        .then(() => {
          this.getData();
          this.alertMessage = 'Employee removed!';
          this.alertMessageType = 0;
          this.showMessage = true;
        })
        .catch(error => {
          console.log(error);
          this.alertMessage = 'Employee cannot be removed!';
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
      UsersDataService.update(itemID, payload)
        .then(() => {
          this.getData();
          this.alertMessage = 'Employee updated!';
          this.alertMessageType = 0;
          this.showMessage = true;
        })
        .catch(error => {
          console.log(error);
          this.alertMessage = 'Employee cannot be updated!';
          this.alertMessageType = 1;
          this.showMessage = true;
          this.getData();
        });
    }
  },
  created() {
    this.getData();
  },
};
</script>