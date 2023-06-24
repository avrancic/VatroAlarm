<template>
    <div class="container">
        <div class="row">
            <div>
                <h1>Incidents</h1>
                <hr><br><br>
                <alert :message=alertMessage :type=alertMessageType v-if="showMessage"></alert>
                <button type="button" class="btn btn-success btn-sm" @click="toggleAddModal">Add incident</button>
                <br><br>
                <vue-good-table :rows="incidents" :columns="columns"
                    :pagination-options="{ enabled: true, mode: 'records' }">>
                    <template #table-row="props">
                        <span v-if="props.column.field == 'after'">
                            <button type="button" class="btn btn-warning btn-sm me-1"
                                @click="toggleEditModal(props.row)">E</button>
                                
                            <button type="button" class="btn btn-danger btn-sm"
                                @click="handleDeleteItem(props.row)">D</button>
                        </span>
                        <span v-else>
                            {{ props.formattedRow[props.column.field] }}
                        </span>
                    </template>
                </vue-good-table>
            </div>
        </div>

        <!-- add new modal -->
        <div ref="addModal" class="modal modal-xl fade" :class="{ show: activeAddModal, 'd-block': activeAddModal }"
            tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Add a new incident</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="toggleAddModal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <Map @PickedLocation="mapOutput" style="height: 500px;"></Map>
                            <br>
                            <div class="mb-3">
                                <label for="addType" class="form-label">Type:</label>
                                <multiselect id="addType" v-model="addForm.type" :options="incidentTypeList"
                                    :custom-label="({ name }) => `${name}`" />
                            </div>
                            <div class="mb-3">
                                <label for="addDescription" class="form-label">Description:</label>
                                <textarea type="text" class="form-control" id="addDescription" v-model="addForm.description"
                                    rows="3" placeholder="Enter incident description"></textarea>
                            </div>
                            <div class="mb-3">
                                <label for="addCity" class="form-label">City:</label>
                                <input type="text" class="form-control" id="addCity" v-model="addForm.city"
                                    placeholder="Enter city">
                            </div>
                            <div class="mb-3">
                                <label for="addAddress" class="form-label">Address:</label>
                                <input type="text" class="form-control" id="addAddress" v-model="addForm.address"
                                    placeholder="Enter address">
                            </div>
                            <div class="mb-3">
                                <label for="addVehicles" class="form-label">Vehicles:</label>
                                <multiselect :multiple="true" id="addVehicles" v-model="addForm.vehicles"
                                    :options="vehicleList"
                                    :custom-label="({ plate, model, number }) => `${number} - ${plate} (${model})`" />
                            </div>
                            <div class="mb-3">
                                <label for="addEmployees" class="form-label">Employees:</label>
                                <multiselect :multiple="true" id="addEmployees" v-model="addForm.employees"
                                    :options="employeesList"
                                    :custom-label="({ name, surname, type }) => `${name} ${surname} (${type.name})`" />
                            </div>
                            <div class="mb-3">
                                <label for="addStatus" class="form-label">Type:</label>
                                <multiselect id="addStatus" v-model="addForm.status" :options="incidentStatusList"
                                    :custom-label="({ name }) => `${name}`" />
                            </div>
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-primary btn-sm"
                                    @click="handleAddSubmit">Submit</button>
                                <button type="button" class="btn btn-danger btn-sm" @click="handleAddReset">Reset</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="activeAddModal" class="modal-backdrop fade show"></div>

        <!-- edit modal -->
        <div ref="editModal" class="modal modal-xl fade" :class="{ show: activeEditModal, 'd-block': activeEditModal }"
            tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Update</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"
                            @click="toggleEditModal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <Map @PickedLocation="mapOutput" style="height: 500px;"></Map>
                            <br>
                            <div class="mb-3">
                                <label for="editType" class="form-label">Type:</label>
                                <multiselect id="editType" v-model="editForm.type" :options="incidentTypeList"
                                    :custom-label="({ name }) => `${name}`" />
                            </div>
                            <div class="mb-3">
                                <label for="addDescription" class="form-label">Description:</label>
                                <textarea type="text" class="form-control" id="addDescription"
                                    v-model="editForm.description" rows="3"
                                    placeholder="Enter incident description"></textarea>
                            </div>
                            <div class="mb-3">
                                <label for="editCity" class="form-label">City:</label>
                                <input type="text" class="form-control" id="editCity" v-model="editForm.city"
                                    placeholder="Enter city">
                            </div>
                            <div class="mb-3">
                                <label for="editAddress" class="form-label">Address:</label>
                                <input type="text" class="form-control" id="editAddress" v-model="editForm.address"
                                    placeholder="Enter address">
                            </div>
                            <div class="mb-3">
                                <label for="editVehicles" class="form-label">Vehicles:</label>
                                <multiselect :multiple="true" id="editVehicles" v-model="editForm.vehicles"
                                    :options="vehicleList"
                                    :custom-label="({ plate, model, number }) => `${number} - ${plate} (${model})`" />

                            </div>
                            <div class="mb-3">
                                <label for="editEmployees" class="form-label">Employees:</label>
                                <multiselect :multiple="true" id="editEmployees" v-model="editForm.employees"
                                    :options="employeesList"
                                    :custom-label="({ name, surname, type }) => `${name} ${surname} (${type.name})`" />
                            </div>
                            <div class="mb-3">
                                <label for="editStatus" class="form-label">Type:</label>
                                <multiselect id="editStatus" v-model="editForm.status" :options="incidentStatusList"
                                    :custom-label="({ name }) => `${name}`" />
                            </div>
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-primary btn-sm"
                                    @click="handleEditSubmit">Submit</button>
                                <button type="button" class="btn btn-danger btn-sm"
                                    @click="handleEditCancel">Cancel</button>
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
import IncidentsDataService from "@/services/AdminSettingsIncidentsDataService";
import Map from '@/components/AdminIncidentMap.vue';

export default {
    data() {
        return {
            vehicleList: [
            ],
            employeesList: [
            ],
            columns: [
                {
                    label: 'Created',
                    field: 'created_at',
                    type: 'date',
                    dateInputFormat: 'yyyy-MM-dd\'T\'HH:mm:ss.SSSSSSXXX',
                    dateOutputFormat: 'dd-MM-yyyy HH:mm',
                    tdClass: 'vgt-left-align',
                    thClass: 'vgt-left-align'
                },
                {
                    label: 'type',
                    field: 'type.name'
                },
                {
                    label: 'Description',
                    field: 'description',
                },
                {
                    label: 'City',
                    field: 'city',
                },
                {
                    label: 'Address',
                    field: 'address',
                },
                {
                    label: 'Vehicles',
                    field: 'vehicles',
                    type: 'String',
                    filterable: true,
                    placeholder: 'Vehicles',
                    formatFn: this.vehicleFn,

                },
                {
                    label: 'Employees',
                    type: 'String',
                    field: 'employees',
                    filterable: true,
                    placeholder: 'Employees',
                    formatFn: this.employeesFn,

                },
                {
                    label: 'Status',
                    field: 'status.name',
                },
                {
                    field: 'after',
                    width: '85px'
                },
            ],
            activeAddModal: false,
            activeEditModal: false,
            addForm: {
                type: '',
                description: '',
                city: '',
                address: '',
                latitude: 0,
                longitude: 0,
                vehicles: [],
                employees: [],
                status: ''
            },
            incidents: [],
            editForm: {
                _id: '',
                type: '',
                description: '',
                city: '',
                address: '',
                latitude: 0,
                longitude: 0,
                vehicles: [],
                employees: [],
                status: ''
            },
            alertMessage: '',
            alertMessageType: 1,
            showMessage: false,
            incidentTypeList: [
            ],
            incidentStatusList: [
            ]
        };
    },
    components: {
        alert: MessageAlert,
        Map
    },
    methods: {
        vehicleFn(value) {
            var out = "";
            var first = true;

            for (const item in value) {
                if (!first) out += ", "

                out += value[item].plate;

                first = false;
            }

            return out;
        },
        employeesFn(value) {
            var out = "";
            var first = true;
            
            for (const item in value) {
                if (!first) out += ", "

                out += value[item].name + ' ' + value[item].surname;

                first = false;
            }

            return out;
        },
        vehiclesFn(rowObj) {
            console.log(rowObj);
        },
        addItem(payload) {
            IncidentsDataService.create(payload)
                .then(() => {
                    this.getData();
                    this.alertMessage = 'Added!';
                    this.alertMessageType = 0;
                    this.showMessage = true;
                })
                .catch(error => {
                    console.log(error);
                    this.alertMessage = 'Cannot be added!';
                    this.alertMessageType = 1;
                    this.showMessage = true;
                    this.getData();
                });
        },
        getData() {
            IncidentsDataService.getAll()
                .then(response => {
                    this.incidents = response.data.incidents;
                    this.incidentTypeList = response.data.incidentTypeList;
                    this.incidentStatusList = response.data.incidentStatusList;

                    this.employeesList = response.data.employeesList;
                    this.vehicleList = response.data.vehicleList;
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
            this.getData();
        },
        handleEditSubmit() {
            this.toggleEditModal(null);
            this.updateItem(this.editForm, this.editForm._id);
        },
        initForm() {
            this.addForm.type = '',
                this.addForm.description = '',
                this.addForm.city = '',
                this.addForm.address = '',
                this.addForm.latitude = 0,
                this.addForm.longitude = 0,
                this.addForm.vehicles = [],
                this.addForm.employees = [],
                this.addForm.status = ''

            this.editForm._id = '';
            this.editForm.type = '',
                this.editForm.description = '',
                this.editForm.city = '',
                this.editForm.address = '',
                this.editForm.latitude = 0,
                this.editForm.longitude = 0,
                this.editForm.vehicles = [],
                this.editForm.employees = [],
                this.editForm.status = ''
        },
        removeItem(itemID) {
            IncidentsDataService.delete(itemID)
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
            IncidentsDataService.update(itemID, payload)
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
        },
        mapOutput(value) {
            this.addForm.latitude = value.latitude;
            this.addForm.longitude = value.longitude;
            this.addForm.city = value.cityName;
            this.addForm.address = value.streetName;
        }
    },
    created() {
        this.getData();
    },
};
</script>