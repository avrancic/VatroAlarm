<template>
    <nav id="sidebar" v-bind:class = "(leftNavIsOpen)?'active':''">
        <div class="sidebar-header">
            <h1>VatroAlarm</h1>
        </div>
        <ul class="text-secondary">
            <li>
                <RouterLink to="/vehicles">Vehicles</RouterLink>
            </li>
            <li>
                <RouterLink to="/employees">Employees</RouterLink>
            </li>
            <li>
                <a href="/test">test</a>
            </li>
            <li>
                <a href="/test">test</a>
            </li>
            <li>
                <a href="/test">test</a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
  props: {
    leftNavIsOpen: {
      type: Boolean
    }
  }}
  </script>

<style>
#sidebar h1 {
    color: black;
    text-align: center;
}

#sidebar {
    min-width: 250px;
    max-width: 250px;
    background: #fff;
    color: #fff;
    transition: all 0.3s;
    border-right: 1px solid #e6ecf5;
}

#sidebar.active {
    margin-left: -250px;
}

#sidebar .sidebar-header {
    padding: .4rem 1rem;
    border-bottom: 1px solid rgba(101, 109, 119, .16);
    max-height: 55px;
}

#sidebar ul {
    padding: 0 0;
}

#sidebar ul p {
    color: #fff;
    padding: 10px;
}

#sidebar ul li a {
    padding: .8rem 1.5rem;
    font-size: 1rem;
    display: block;
}

#sidebar ul li a .fas {
    min-width: 20px;
    margin-right: 5px;
    text-align: center;
}

#sidebar ul li a:hover,
#sidebar ul li a.active {
    color: #fff;
    background: #2196F3;
}

#sidebar ul li.active>a,
a[aria-expanded="true"] {
    color: inherit;
}

#sidebar ul ul a {
    font-size: 1rem;
    background: #EEEEEE;
}

#sidebar a[data-toggle="collapse"] {
    position: relative;
}

#sidebar .dropdown-toggle::after {
    display: block;
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    display: none;
}

@media (max-width: 768px) {
    #sidebarCollapse span {
        display: none;
    }
}
</style>