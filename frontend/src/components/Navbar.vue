<template>
    <nav class="navbar navbar-expand-lg navbar-white bg-white">
        <button type="button" id="sidebarCollapse" class="btn btn-light" @click="childMethod">| | |</button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="nav navbar-nav ms-auto">
                <li class="nav-item dropdown">
                    <div class="nav-dropdown">
                        <a href="#" id="nav2" class="nav-item nav-link dropdown-toggle text-secondary"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <span>Arian test</span>
                        </a>
                        <div class="dropdown-menu dropdown-menu-end nav-link-menu">
                            <ul class="nav-list">
                                <li><a href="" class="dropdown-item">test</a></li>
                                <div class="dropdown-divider"></div>
                                <li><a href="" class="dropdown-item">Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    methods: {
        childMethod() {
            this.$emit('clicked', 'true')
        }
    }
}
</script>

<style></style>