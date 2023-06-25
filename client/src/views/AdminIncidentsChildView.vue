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
                    :pagination-options="{ enabled: true, mode: 'records' }">
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
                                <select class="form-control" id="addType" v-model="addForm.type">
                                    <option v-for="option in incidentTypes" :key="option._id" :value="option._id">
                                        {{ option.name }}
                                    </option>
                                </select>
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
                                    :options="vehicles"
                                    :custom-label="({ plate, model, number }) => `${number} - ${plate} (${model})`" />
                            </div>
                            <div class="mb-3">
                                <label for="addShifts" class="form-label">Shifts:</label>
                                <multiselect :multiple="true" id="addShifts" v-model="addForm.shifts" :options="shifts"
                                    track-by="_id" :custom-label="shiftsLabel" />
                            </div>
                            <div class="mb-3">
                                <label for="addStatus" class="form-label">Status:</label>
                                <select class="form-control" id="addStatus" v-model="addForm.status">
                                    <option v-for="option in incidentStatuses" :key="option._id" :value="option._id">
                                        {{ option.name }}
                                    </option>
                                </select>
                            </div>
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-primary btn-sm me-1"
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
                            @click="toggleEditModal(null)">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <Map @PickedLocation="mapOutput" style="height: 500px;"></Map>
                            <br>
                            <div class="mb-3">
                                <label for="editType" class="form-label">Type:</label>
                                <select class="form-control" id="editType" v-model="editForm.type">
                                    <option v-for="option in incidentTypes" :key="option._id" :value="option._id">
                                        {{ option.name }}
                                    </option>
                                </select>
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
                                    :options="vehicles" track-by="_id"
                                    :custom-label="({ plate, model, number }) => `${number} - ${plate} (${model})`" />

                            </div>
                            <div class="mb-3">
                                <label for="editEmployees" class="form-label">Shifts:</label>
                                <multiselect :multiple="true" id="editEmployees" v-model="editForm.shifts" :options="shifts"
                                :custom-label="shiftsLabel" track-by="_id" />
                            </div>
                            <div class="mb-3">
                                <label for="editStatus" class="form-label">Type:</label>

                                <select class="form-control" id="editStatus" v-model="editForm.status">
                                    <option v-for="option in incidentStatuses" :key="option._id" :value="option._id">
                                        {{ option.name }}
                                    </option>
                                </select>
                            </div>
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-primary btn-sm me-1"
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
            vehicles: [],
            shifts: [],
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
                    field: 'shifts',
                    filterable: true,
                    placeholder: 'Shifts',
                    formatFn: this.shiftsFn,
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
                shifts: [],
                status: ''
            },
            incidents: [],
            editForm: {
                id: '',
                type: '',
                description: '',
                city: '',
                address: '',
                latitude: 0,
                longitude: 0,
                vehicles: [],
                shifts: [],
                status: ''
            },
            alertMessage: '',
            alertMessageType: 1,
            showMessage: false,
            incidentTypes: [
            ],
            incidentStatuses: [
            ]
        };
    },
    components: {
        alert: MessageAlert,
        Map
    },
    methods: {
        shiftsLabel({started_at, ends_at, employees}) {
            var out = "";

            out += `${started_at} -> ${ends_at}`;
         
            out += " ("

            var first = true;

            for (const item in employees) {
                if (!first) out += ", "

                out += employees[item].name + ' ' + employees[item].name;

                first = false;
            }
            
            out += ")"

            return out;
        },
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
        shiftsFn(value) {
            var out = "";

            var first = true;

            for (const item in value) {
                for (const item1 in value[item].employees) {
                    if (!first) out += ", "

                    out += value[item].employees[item1].name + ' ';
                    out += value[item].employees[item1].surname + ' ';
                    out += ' (' + value[item].employees[item1].type.name + ')';

                    first = false;
                }
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
                    this.incidentTypes = response.data.incidentTypes
                    this.incidentStatuses = response.data.incidentStatuses;

                    this.shifts = response.data.shifts;
                    this.vehicles = response.data.vehicles;
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
            this.updateItem(this.editForm, this.editForm.id);
        },
        initForm() {
            this.addForm.type = '',
                this.addForm.description = '',
                this.addForm.city = '',
                this.addForm.address = '',
                this.addForm.latitude = 0,
                this.addForm.longitude = 0,
                this.addForm.vehicles = [],
                this.addForm.shifts = [],
                this.addForm.status = ''
            this.editForm.id = '';
            this.editForm.type = '',
                this.editForm.description = '',
                this.editForm.city = '',
                this.editForm.address = '',
                this.editForm.latitude = 0,
                this.editForm.longitude = 0,
                this.editForm.vehicles = [],
                this.editForm.shifts = [],
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
                this.editForm.id = item._id;
                this.editForm.type = item.type._id;
                this.editForm.description = item.description;
                this.editForm.city = item.city;
                this.editForm.address = item.address;
                this.editForm.latitude = item.latitude;
                this.editForm.longitude = item.longitude;
                this.editForm.vehicles = item.vehicles;
                this.editForm.shifts = item.shifts;
                this.editForm.status = item.status._id;
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