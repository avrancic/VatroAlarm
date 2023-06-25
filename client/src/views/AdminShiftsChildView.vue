<template>
    <div class="container">
        <div class="row">
            <div>
                <h1>Shifts</h1>
                <hr><br><br>
                <alert :message=alertMessage :type=alertMessageType v-if="showMessage"></alert>
                <button type="button" class="btn btn-success btn-sm" @click="toggleAddModal">Add shift</button>
                <br><br>
                <vue-good-table :rows="shifts" :columns="columns" :pagination-options="{ enabled: true, mode: 'records' }">
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
        <div ref="addModal" class="modal fade" :class="{ show: activeAddModal, 'd-block': activeAddModal }" tabindex="-1"
            role="dialog">
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
                            <div class="mb-3">
                                <label class="form-label">Ends at:</label>

                                <VueDatePicker text-input v-model="addForm.ends_at" />
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Employees:</label>
                                <multiselect :multiple="true" v-model="addForm.employees" :options="employees"
                                    :custom-label="({ name, surname, type }) => `${name} ${surname} (${type.name})`" />
                            </div>
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-primary btn-sm"
                                    @click="handleAddSubmit">Submit</button>
                                <button type="button" class="btn btn-danger btn-sm" @click="handleAddCancel">Cancel</button>
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
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"
                            @click="toggleEditModal(null)">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label class="form-label">Shift ends at:</label>

                                <VueDatePicker text-input v-model="editForm.ends_at" />
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Employees:</label>
                                <multiselect :multiple="true" v-model="editForm.employees" :options="employees"
                                    track-by="_id"
                                    :custom-label="({ name, surname, type }) => `${name} ${surname} (${type.name})`" />
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
import ShiftsDataService from "@/services/AdminShiftsDataService";

export default {
    data() {
        return {
            columns: [
                {
                    label: 'Starting',
                    field: 'started_at',
                    type: 'date',
                    dateInputFormat: 'yyyy-MM-dd\'T\'HH:mm:ss.SSSSSSXXX',
                    dateOutputFormat: 'dd-MM-yyyy HH:mm',
                    tdClass: 'vgt-left-align',
                    thClass: 'vgt-left-align'
                },
                {
                    label: 'Ending',
                    field: 'ends_at',
                    type: 'date',
                    dateInputFormat: 'yyyy-MM-dd\'T\'HH:mm:ss.SSSSSSXXX',
                    dateOutputFormat: 'dd-MM-yyyy HH:mm',
                    tdClass: 'vgt-left-align',
                    thClass: 'vgt-left-align'
                },
                {
                    label: 'Employees',
                    type: 'String',
                    field: 'employees',
                    placeholder: 'Employees',
                    formatFn: this.employeesFn
                },
                {
                    field: 'after',
                    width: '85px'
                }
            ],
            activeAddModal: false,
            activeEditModal: false,
            addForm: {
                type: '',
                ends_at: Date.now(),
                employees: [],
            },
            shifts: [],
            employees: [],
            editForm: {
                id: '',
                ends_at: '',
                employees: [],
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
        employeesFn(value) {
            var out = "";
            var first = true;

            for (const item in value) {
                if (!first) out += ", "

                out += value[item].name + ' ';
                out += value[item].surname + ' ';
                out += ' (' + value[item].type.name + ')';

                first = false;
            }

            return out;
        },
        addItem(payload) {
            ShiftsDataService.create(payload)
                .then(() => {
                    this.getData();
                    this.alertMessage = 'Shift added!';
                    this.alertMessageType = 0;
                    this.showMessage = true;
                })
                .catch(error => {
                    console.log(error);
                    this.alertMessage = 'Shift cannot be added!';
                    this.alertMessageType = 1;
                    this.showMessage = true;
                    this.getData();
                });
        },
        getData() {
            ShiftsDataService.getAll()
                .then(response => {
                    this.shifts = response.data.shifts;
                    this.employees = response.data.employees;
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
            this.addForm.ends_at = Date.now();
            this.addForm.employees = [];
            this.editForm.id = '';
            this.editForm.ends_at = '';
            this.editForm.employees = [];
        },
        removeItem(itemID) {
            ShiftsDataService.delete(itemID)
                .then(() => {
                    this.getData();
                    this.alertMessage = 'Shift removed!';
                    this.alertMessageType = 0;
                    this.showMessage = true;
                })
                .catch(error => {
                    console.log(error);
                    this.alertMessage = 'Shift cannot be removed!';
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
                this.editForm.ends_at = item.ends_at;
                this.editForm.employees = item.employees;
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
            ShiftsDataService.update(itemID, payload)
                .then(() => {
                    this.getData();
                    this.alertMessage = 'Shift updated!';
                    this.alertMessageType = 0;
                    this.showMessage = true;
                })
                .catch(error => {
                    console.log(error);
                    this.alertMessage = 'Shift cannot be updated!';
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