<template>
    <SideBar :leftNavIsOpen="leftNavIsOpen" />

    <div id="body">
        <NavBar @clicked="leftNavIsOpen = !leftNavIsOpen" />

        <div class="content">
            <router-view />
        </div>
    </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import SideBar from './components/SideBar.vue'

export default {
    name: 'App',
    components: {
        NavBar,
        SideBar
    },
    data: () => ({
        leftNavIsOpen: false
    }),
} 
</script>

<style>
#app {
    font-family: sans-serif;
    display: flex;
    width: 100%;
    align-items: stretch;
    overflow-x: hidden
}

.container {
    margin-top: 40px
}

body {
    width: 100%;
    height: 100%;
    background: #f4f6fa;
    font-family: "Lato", "Helvetica Neue", Arial, Helvetica, sans-serif;
    font-size: 1rem;
    color: #444;
}

.wrapper {
    display: flex;
    width: 100%;
    align-items: stretch;
    overflow-x: hidden
}

#body {
    width: 100%;
    padding: 0;
    min-height: 100vh;
    transition: all 0.3s;
}

#body>.navbar {
    padding: 0 1.5rem;
    min-height: 54px;
    box-shadow: none;
    border-bottom: 1px solid rgba(101, 109, 119, .16);
}

a,
a:hover,
a:focus {
    color: inherit;
    text-decoration: none;
    transition: all 0.3s;
}

.btn.focus,
.btn:focus {
    box-shadow: none;
}

.btn.btn-square {
    border-radius: 0;
}

.table td,
.table th {
    vertical-align: middle;
}

.nav-tabs {
    border-bottom: 2px solid #dee2e6;
}

.nav-tabs .nav-item {
    margin-bottom: -2px;
}

.nav-tabs .nav-link {
    border: none;
    -webkit-transition: color .1s ease;
    transition: color .1s ease;
    color: inherit;
}

.nav-tabs .nav-item.show .nav-link,
.nav-tabs .nav-link.active {
    color: #007bff;
    background-color: #fff;
    border-bottom: 2px solid #22a1f9;

}

@media (max-width: 768px) {
    .display-absolute {
        position: relative;
    }
}

@media (max-width: 680px) {
    #body.active .navbar-collapse {
        display: -ms-flexbox !important;
        display: flex !important;
        -ms-flex-preferred-size: auto;
        flex-basis: auto;
    }

    .nav-dropdown .nav-link-menu {
        position: fixed !important;
        top: 52px !important;
        width: 100% !important;
        margin-top: 0;
    }

    .nav-dropdown .nav-link {
        padding: 10px;
    }

    .nav-dropdown .nav-link-menu::before {
        right: 50%;
    }

    #body .navbar-collapse {
        display: none !important;
    }

    #body .nav-dropdown .nav-item span {
        display: none !important;
    }

    .btn-header {
        display: none;
    }
}

@media (min-width: 200px) {
    .navbar-expand-lg .navbar-collapse {
        display: -ms-flexbox !important;
        display: flex !important;
        -ms-flex-preferred-size: auto;
        flex-basis: auto;
    }

    .navbar-expand-lg .navbar-nav {
        -ms-flex-direction: row;
        flex-direction: row;
    }
}
</style>